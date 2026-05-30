<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { renderAretino } from '@aretino-chant/core'
import { guidoToAretino } from '@aretino-chant/guido2aretino'

const DEFAULT_GUIDO = `<-5--tT4-5¨uU6Z5T4tx-:-tT4R3d1wy-:-2rt²1í¨2rR3E2-3--1-1í-,,-5-5x¨4tT4R3y¨44tg3-¨4tG2W1í-:-2rR3E2-3--1-1í-,,-1t-tT4-5uU6h4¨zZ5¨7uj5x-:-5zZ5¨rR3E2-4--5-5x-,,-1t-tT4-5uU6h4¨zZ5¨7uj5x-:-1t¨tT4¨5uU6h4¨zZ5¨7uj5x-:-5zZ5¨rR3E2-4--5-5x-.`
const ZOOM = 1.25
const DEFAULT_PREVIEW_WIDTH = 840

const guidoSource = ref(DEFAULT_GUIDO)
const aretinoSource = ref('')
const transcriptionError = ref('')
const previewEl = ref(null)
const previewSvg = ref('')
const previewError = ref('')
const previewWidth = ref(DEFAULT_PREVIEW_WIDTH)
const mounted = ref(false)
let resizeObserver = null

const guidoRows = computed(() => Math.min(24, Math.max(10, guidoSource.value.split('\n').length + 2)))
const aretinoRows = computed(() => Math.min(24, Math.max(10, aretinoSource.value.split('\n').length + 2)))

onMounted(() => {
  mounted.value = true
  transcribeGuido()
  observePreview()
  renderPreview()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})

function transcribeGuido() {
  try {
    aretinoSource.value = guidoToAretino(guidoSource.value)
    transcriptionError.value = ''
  } catch (error) {
    aretinoSource.value = ''
    transcriptionError.value = error?.message ?? 'The Guido source could not be transcribed.'
  }
}

function updatePreviewWidth() {
  const width = previewEl.value?.getBoundingClientRect().width ?? 0
  if (width > 0) previewWidth.value = width
}

function observePreview() {
  resizeObserver?.disconnect()
  resizeObserver = null
  updatePreviewWidth()

  if (!previewEl.value || typeof ResizeObserver === 'undefined') return
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const width = entry.contentRect.width
      if (width > 0) previewWidth.value = width
    }
  })
  resizeObserver.observe(previewEl.value)
}

function renderPreview() {
  if (!mounted.value) return

  if (!aretinoSource.value.trim()) {
    previewSvg.value = ''
    previewError.value = ''
    return
  }

  try {
    const width = Math.max(120, Math.round((previewWidth.value || DEFAULT_PREVIEW_WIDTH) / ZOOM))
    previewSvg.value = renderAretino(aretinoSource.value, { width, zoom: ZOOM })
    previewError.value = ''
  } catch (error) {
    previewSvg.value = ''
    previewError.value = error?.message ?? 'The Aretino preview could not be rendered.'
  }
}

function resetSample() {
  guidoSource.value = DEFAULT_GUIDO
  void nextTick(transcribeGuido)
}

function clearAll() {
  guidoSource.value = ''
  aretinoSource.value = ''
  transcriptionError.value = ''
  previewError.value = ''
  previewSvg.value = ''
}

watch(guidoSource, () => {
  transcribeGuido()
}, { flush: 'post' })

watch(aretinoSource, () => {
  renderPreview()
}, { flush: 'post' })

watch(previewWidth, () => {
  renderPreview()
}, { flush: 'post' })
</script>

<template>
  <div class="gabc-transcriber">
    <div class="gabc-transcriber__toolbar" aria-label="Guido transcription controls">
      <button type="button" @click="resetSample">Load sample</button>
      <button type="button" @click="clearAll">Clear</button>
    </div>

    <ClientOnly>
      <div class="gabc-transcriber__workspace">
        <section class="gabc-transcriber__pane" aria-labelledby="guido-source-label">
          <div id="guido-source-label" class="gabc-transcriber__label">Guido TTF input</div>
          <textarea
            v-model="guidoSource"
            class="gabc-transcriber__textarea"
            :rows="guidoRows"
            aria-labelledby="guido-source-label"
            spellcheck="false"
            autocapitalize="off"
            autocomplete="off"
          ></textarea>
          <p v-if="transcriptionError" class="gabc-transcriber__error" role="alert">
            {{ transcriptionError }}
          </p>
        </section>

        <section class="gabc-transcriber__pane" aria-labelledby="aretino-output-label">
          <div id="aretino-output-label" class="gabc-transcriber__label">Aretino transcription</div>
          <textarea
            v-model="aretinoSource"
            class="gabc-transcriber__textarea"
            :rows="aretinoRows"
            aria-labelledby="aretino-output-label"
            spellcheck="false"
            autocapitalize="off"
            autocomplete="off"
          ></textarea>
        </section>
      </div>
        <section class="gabc-transcriber__preview-shell" aria-labelledby="score-preview-label">
          <div id="score-preview-label" class="gabc-transcriber__label gabc-transcriber__label--preview">
            Score preview
          </div>
          <div
            ref="previewEl"
            class="gabc-transcriber__preview"
            v-html="previewSvg"
          ></div>
          <p v-if="previewError" class="gabc-transcriber__error gabc-transcriber__error--preview" role="alert">
            {{ previewError }}
          </p>
        </section>

    </ClientOnly>
  </div>
</template>
