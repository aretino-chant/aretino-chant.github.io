<script setup>
import { ref, computed, onMounted, onBeforeUnmount, useSlots } from 'vue'
import { parseAretino, renderAretino } from '@aretino-chant/core'

const props = defineProps({
  // base64-encoded source, supplied by the ```aretino fence transform
  source: { type: String, default: null },
})

const slots = useSlots()

function decode(b64) {
  if (typeof atob === 'function') {
    const bin = atob(b64)
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  }
  // Build-time (Node) fallback
  return Buffer.from(b64, 'base64').toString('utf-8')
}

// For manual <AretinoEditor>...</AretinoEditor> embeds: recover the raw text
// from the default slot's vnodes.
function slotText() {
  let out = ''
  const walk = (n) => {
    if (n == null || n === false) return
    if (typeof n === 'string' || typeof n === 'number') {
      out += n
      return
    }
    if (Array.isArray(n)) {
      n.forEach(walk)
      return
    }
    if (typeof n.children === 'string') {
      out += n.children
      return
    }
    if (Array.isArray(n.children)) n.children.forEach(walk)
  }
  if (slots.default) slots.default().forEach(walk)
  return out
}

const initial = (props.source != null ? decode(props.source) : slotText())
  .replace(/^\n+|\n+$/g, '')

const source = ref(initial)
const error = ref(null)

// Render only after mount. The core renderer measures text width with canvas
// in the browser but falls back to estimation under SSR, so rendering during
// SSR would produce a different SVG and trigger a hydration mismatch.
const mounted = ref(false)
const containerWidth = ref(1920)
const outputEl = ref(null)
let resizeObserver = null

onMounted(() => {
  mounted.value = true
  if (outputEl.value) {
    const w = outputEl.value.getBoundingClientRect().width
    if (w > 0) containerWidth.value = w
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width
        if (w > 0) containerWidth.value = w
      }
    })
    resizeObserver.observe(outputEl.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect()
})

const rows = computed(() => Math.max(3, source.value.split('\n').length))

const svg = computed(() => {
  if (!mounted.value) return ''
  try {
    error.value = null
    const cw = containerWidth.value
    // The renderer inflates lyricSize by max(0.75, cw/750) for large virtual
    // canvases that are then scaled down via CSS. Since we pass the actual
    // container width and the SVG is displayed 1:1, we counter-act that factor
    // to keep the visual font size constant across different page widths.
    const lyricScale = Math.max(0.5, cw / 750)
    return renderAretino(parseAretino(source.value), {
      lyricSize: 13 / lyricScale,
      canvasWidth: cw*1.5,
    })
  } catch (e) {
    error.value = e.message
    return ''
  }
})
</script>

<template>
  <div class="aretino-editor">
    <textarea
      v-model="source"
      :rows="rows"
      spellcheck="false"
      autocapitalize="off"
      autocomplete="off"
    ></textarea>
    <div ref="outputEl" class="output" v-html="svg"></div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style scoped>
.aretino-editor {
  display: grid;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}
.aretino-editor textarea {
  width: 100%;
  resize: vertical;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85em;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.aretino-editor textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}
.aretino-editor .output {
  overflow-x: auto;
  min-height: 80px;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  background: #fff;
  border-radius: 6px;
}
.aretino-editor .output :deep(svg) {
  max-width: 100%;
  height: auto;
}
.aretino-editor .error {
  color: var(--vp-c-danger-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.8em;
  white-space: pre-wrap;
}
</style>
