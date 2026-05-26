<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { renderAretino } from '@aretino-chant/core'
import { gabcToAretino } from '@aretino-chant/gabc2aretino'

const DEFAULT_GABC = `annotation: 5
%%
(c3) KY(d)ri(gxfgh)e(h.ivHGh.) *~{~}(/[-2]kvIH'Ghih.) (,) e(gxhvFE'Dgf)lé(e')i(e)son.(d.) <i>iij.</i>(::)
Chri(f)ste(fvED'Cd.gxd!fg!hv.ivHGh.) (,) e(gxhvFE'Dgf)lé(e')i(e)son.(d.) <i>iij.</i>(::)
Ký(k')ri(j)e(kvJI'jkh.1gxkhiv./[-0.5]fg!hv.) (,) e(gxhvFE'Dgf)lé(e')i(e)son.(d.) <i>ij.</i>(::)
Ký(k')ri(j)e(kvJI'jkh.1) <clear>*(,) (kjkvJI'jkh.1gxkhiv./[-0.5]fg!hv.) <clear>**(,) e(gxhvFE'Dgf)lé(e')i(e)son.(d.) (::)
`
const ZOOM = 1.25
const DEFAULT_PREVIEW_WIDTH = 840

const gabcSource = ref(DEFAULT_GABC)
const aretinoSource = ref('')
const transcriptionError = ref('')
const previewEl = ref(null)
const previewSvg = ref('')
const previewError = ref('')
const previewWidth = ref(DEFAULT_PREVIEW_WIDTH)
const mounted = ref(false)
let resizeObserver = null

const gabcRows = computed(() => Math.min(24, Math.max(10, gabcSource.value.split('\n').length + 2)))
const aretinoRows = computed(() => Math.min(24, Math.max(10, aretinoSource.value.split('\n').length + 2)))

onMounted(() => {
  mounted.value = true
  transcribeGabc()
  observePreview()
  renderPreview()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})

function transcribeGabc() {
  try {
    aretinoSource.value = gabcToAretino(gabcSource.value)
    transcriptionError.value = ''
  } catch (error) {
    aretinoSource.value = ''
    transcriptionError.value = error?.message ?? 'The GABC source could not be transcribed.'
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
  gabcSource.value = DEFAULT_GABC
  void nextTick(transcribeGabc)
}

function clearAll() {
  gabcSource.value = ''
  aretinoSource.value = ''
  transcriptionError.value = ''
  previewError.value = ''
  previewSvg.value = ''
}

watch(gabcSource, () => {
  transcribeGabc()
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
    <div class="gabc-transcriber__toolbar" aria-label="GABC transcription controls">
      <button type="button" @click="resetSample">Load sample</button>
      <button type="button" @click="clearAll">Clear</button>
    </div>

    <ClientOnly>
      <div class="gabc-transcriber__workspace">
        <section class="gabc-transcriber__pane" aria-labelledby="gabc-source-label">
          <div id="gabc-source-label" class="gabc-transcriber__label">GABC input</div>
          <textarea
            v-model="gabcSource"
            class="gabc-transcriber__textarea"
            :rows="gabcRows"
            aria-labelledby="gabc-source-label"
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
