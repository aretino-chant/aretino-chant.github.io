<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { renderAretino } from '@aretino-chant/core'

const DEFAULT_SOURCE = `(g2) g A B g. AB A g e_d_ , g AB Ag g. ||
w: Al-le-lu-ia, al-le-lu-ia, al-le-lu-ia.`
const EDITOR_ZOOM = 1.4
const DEFAULT_PREVIEW_WIDTH = 760

const source = ref(DEFAULT_SOURCE)
const editorReady = ref(false)
const editorEl = ref(null)
const previewEl = ref(null)
const previewSvg = ref('')
const previewError = ref('')
const previewWidth = ref(DEFAULT_PREVIEW_WIDTH)
const saveError = ref('')
const mounted = ref(false)
let resizeObserver = null

onMounted(async () => {
  await import('@aretino-chant/editor')
  await customElements.whenDefined('aretino-editor')

  mounted.value = true
  editorReady.value = true
  await nextTick()

  syncEditorElement()
  observePreview()
  renderPreview()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})

function handleEditorChange(event) {
  source.value = event.detail?.value ?? event.target?.value ?? ''
}

function currentSource() {
  return editorHost()?.value ?? source.value
}

function editorHost() {
  const refValue = editorEl.value?.$el ?? editorEl.value
  if (refValue?.localName === 'aretino-editor') return refValue
  return null
}

function syncEditorElement() {
  const host = editorHost()
  if (!host) return
  if (host.value !== source.value) host.value = source.value
  host.zoom = EDITOR_ZOOM
  host.preview = false
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

  try {
    const width = Math.max(120, Math.round((previewWidth.value || DEFAULT_PREVIEW_WIDTH) / EDITOR_ZOOM))
    previewSvg.value = renderAretino(currentSource(), { width, zoom: EDITOR_ZOOM })
    previewError.value = ''
  } catch (error) {
    previewSvg.value = ''
    previewError.value = error?.message ?? 'The preview could not be rendered.'
  }
}

function serializeSvg(svg) {
  const clone = svg.cloneNode(true)
  clone.querySelectorAll('.aretino-cursor-rect').forEach((el) => el.remove())
  if (!clone.getAttribute('xmlns')) {
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  }
  return new XMLSerializer().serializeToString(clone)
}

function svgElementSize(svg) {
  const viewBox = svg.viewBox?.baseVal
  const width = Number.parseFloat(svg.getAttribute('width')) || viewBox?.width || svg.getBoundingClientRect().width
  const height = Number.parseFloat(svg.getAttribute('height')) || viewBox?.height || svg.getBoundingClientRect().height

  if (!width || !height) return null
  return { width, height }
}

function currentSvgInfo() {
  const previewSvg = previewEl.value?.querySelector('svg')
  if (!previewSvg) return null
  const size = svgElementSize(previewSvg)
  if (!size) return null
  return { markup: serializeSvg(previewSvg), size }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

function saveAretino() {
  saveError.value = ''
  downloadBlob(new Blob([currentSource()], { type: 'text/plain;charset=utf-8' }), 'score.aretino')
}

async function waitForPreviewPaint() {
  renderPreview()
  await nextTick()
  for (let i = 0; i < 3 && !previewEl.value?.querySelector('svg') && !previewError.value; i += 1) {
    await new Promise((resolve) => requestAnimationFrame(resolve))
  }
}

async function saveSvg() {
  saveError.value = ''
  await waitForPreviewPaint()
  let svgInfo = null
  try {
    svgInfo = currentSvgInfo()
  } catch {
    saveError.value = 'The preview SVG is not available yet.'
    return
  }
  if (!svgInfo) {
    saveError.value = 'The preview SVG is not available yet.'
    return
  }
  downloadBlob(new Blob([svgInfo.markup], { type: 'image/svg+xml;charset=utf-8' }), 'score.svg')
}

async function savePng() {
  saveError.value = ''
  await waitForPreviewPaint()
  let svgInfo = null
  try {
    svgInfo = currentSvgInfo()
  } catch {
    saveError.value = 'The preview SVG is not available yet.'
    return
  }
  if (!svgInfo) {
    saveError.value = 'The preview SVG is not available yet.'
    return
  }

  const svgBlob = new Blob([svgInfo.markup], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)
  const image = new Image()

  try {
    await new Promise((resolve, reject) => {
      image.onload = resolve
      image.onerror = reject
      image.src = url
    })

    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(svgInfo.size.width * 2))
    canvas.height = Math.max(1, Math.round(svgInfo.size.height * 2))

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      saveError.value = 'The PNG export could not be created.'
      return
    }
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!pngBlob) {
      saveError.value = 'The PNG export could not be created.'
      return
    }
    downloadBlob(pngBlob, 'score.png')
  } catch {
    saveError.value = 'The PNG export could not be created.'
  } finally {
    URL.revokeObjectURL(url)
  }
}

watch(source, () => {
  renderPreview()
}, { flush: 'post' })

watch(previewWidth, () => {
  renderPreview()
}, { flush: 'post' })
</script>

<template>
  <div class="online-editor">
    <div class="online-editor__toolbar" aria-label="Save score">
      <button type="button" @click="saveAretino">Save Aretino</button>
      <button type="button" :disabled="!editorReady" @click="saveSvg">Save SVG</button>
      <button type="button" :disabled="!editorReady" @click="savePng">Save PNG</button>
    </div>
    <p v-if="saveError" class="online-editor__save-error" role="status">{{ saveError }}</p>

    <ClientOnly>
      <div class="online-editor__workspace">
        <aretino-editor
          v-if="editorReady"
          ref="editorEl"
          class="online-editor__component"
          :zoom="EDITOR_ZOOM"
          :preview="false"
          @change="handleEditorChange"
        />

        <div class="online-editor__preview-shell" aria-label="Score preview">
          <div
            ref="previewEl"
            class="online-editor__preview"
            v-html="previewSvg"
          ></div>
          <p v-if="previewError" class="online-editor__preview-error" role="alert">
            {{ previewError }}
          </p>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
