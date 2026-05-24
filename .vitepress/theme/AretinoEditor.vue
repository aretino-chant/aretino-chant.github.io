<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount, useSlots, watch } from 'vue'
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
const textareaEl = ref(null)
const outputEl = ref(null)
const caret = ref(0)
let resizeObserver = null
let highlightAtCaret = null
let highlightRequestId = 0
let disposed = false

onMounted(async () => {
  const editorModulePromise = import('@aretino-chant/editor')
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

  const editorModule = await editorModulePromise
  if (disposed) return
  highlightAtCaret = editorModule.highlightAtCaret
  updateCaret()
})

onBeforeUnmount(() => {
  disposed = true
  if (resizeObserver) resizeObserver.disconnect()
})

const rows = computed(() => Math.max(3, source.value.split('\n').length))

const svg = computed(() => {
  if (!mounted.value) return ''
  try {
    error.value = null
    const cw = containerWidth.value
    // make the preview responsive
    const ZOOM = 1.3;
    const width = Math.max(120, Math.round(cw / ZOOM));

    return renderAretino(parseAretino(source.value), {
      width, zoom: ZOOM
    })
  } catch (e) {
    error.value = e.message
    return ''
  }
})

function highlightPreview(position = caret.value) {
  const requestId = ++highlightRequestId
  const caretPosition = Number(position)

  void nextTick(() => {
    if (requestId !== highlightRequestId || !mounted.value || !outputEl.value || !highlightAtCaret) return
    highlightAtCaret(outputEl.value, Number.isFinite(caretPosition) ? caretPosition : 0)
  })
}

function updateCaret(event) {
  const target = event?.target ?? textareaEl.value
  const position = typeof target?.selectionStart === 'number' ? target.selectionStart : caret.value
  caret.value = position
  highlightPreview(position)
}

watch(svg, () => {
  highlightPreview()
}, { flush: 'post' })
</script>

<template>
  <div class="aretino-editor">
    <textarea
      ref="textareaEl"
      v-model="source"
      :rows="rows"
      spellcheck="false"
      autocapitalize="off"
      autocomplete="off"
      @input="updateCaret"
      @keyup="updateCaret"
      @click="updateCaret"
      @select="updateCaret"
      @focus="updateCaret"
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
