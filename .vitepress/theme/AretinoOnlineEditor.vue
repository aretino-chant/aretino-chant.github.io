<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { renderAretino } from '@aretino-chant/core'

const DEFAULT_SOURCE = `(g2) g A B g. AB A g e_d_ , g AB Ag g. ||
w: Al-le-lu-ia, al-le-lu-ia, al-le-lu-ia.`
const EDITOR_ZOOM = 1.2
const DEFAULT_PREVIEW_WIDTH = 760

// Layout widths per paper size in mm (210mm/148mm/215.9mm minus typical margins)
const PAPER_WIDTH_MM = {
  a4: 170,    // 210mm − 40mm margins
  a5: 118,    // 148mm − 30mm margins
  letter: 176, // 215.9mm − 40mm margins
}
const PAPER_SIZES = [
  { value: 'a4', label: 'A4' },
  { value: 'a5', label: 'A5' },
  { value: 'letter', label: 'Letter' },
  { value: 'responsive', label: 'Responsive' },
]

const source = ref(DEFAULT_SOURCE)
const editorReady = ref(false)
const editorEl = ref(null)
const previewEl = ref(null)
const previewSvg = ref('')
const previewError = ref('')
const previewWidth = ref(DEFAULT_PREVIEW_WIDTH)
const saveError = ref('')
const mounted = ref(false)
const editorFocused = ref(false)
const fullscreen = ref(false)
const paperSize = ref('responsive')
const splitEditorHeight = ref(400)
const isDragging = ref(false)

const snippetEl = ref(null)
const snippetVisible = ref(false)
let resizeObserver = null
let highlightAtCaret = null
let sourceSpanFromPreviewClick = null
let caretAnchorInfo = null
let highlightRequestId = 0
let snippetShadow = null
let snippetInner = null
let focusEventsHost = null
let focusOutTimer = null

onMounted(async () => {
  const editorModule = await import('@aretino-chant/editor')
  highlightAtCaret = editorModule.highlightAtCaret
  sourceSpanFromPreviewClick = editorModule.sourceSpanFromPreviewClick
  caretAnchorInfo = editorModule.caretAnchorInfo
  await customElements.whenDefined('aretino-editor')

  mounted.value = true
  editorReady.value = true
  await nextTick()

  syncEditorElement()
  observePreview()
  renderPreview()

  if (snippetEl.value) {
    snippetShadow = snippetEl.value.attachShadow({ mode: 'open' })
    snippetInner = document.createElement('div')
    snippetShadow.appendChild(snippetInner)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  unbindEditorFocusEvents()
  if (focusOutTimer != null) {
    window.clearTimeout(focusOutTimer)
    focusOutTimer = null
  }
  if (fullscreen.value) document.body.style.overflow = ''
})

function handleEditorChange(event) {
  source.value = event.detail?.value ?? event.target?.value ?? ''
}

function handleEditorSelectionChange(event) {
  highlightPreview(event.detail?.caret ?? event.target?.caret ?? 0)
}

function currentSource() {
  return editorHost()?.value ?? source.value
}

function currentCaret() {
  return editorHost()?.caret ?? 0
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
  bindEditorFocusEvents(host)
}

function bindEditorFocusEvents(host) {
  if (focusEventsHost === host) return
  unbindEditorFocusEvents()
  focusEventsHost = host
  const target = host.shadowRoot ?? host
  target.addEventListener('focusin', handleEditorFocusIn)
  target.addEventListener('focusout', handleEditorFocusOut)
  editorFocused.value = editorHasDomFocus(host)
}

function unbindEditorFocusEvents() {
  if (!focusEventsHost) return
  const target = focusEventsHost.shadowRoot ?? focusEventsHost
  target.removeEventListener('focusin', handleEditorFocusIn)
  target.removeEventListener('focusout', handleEditorFocusOut)
  focusEventsHost = null
}

function editorHasDomFocus(host = editorHost()) {
  return !!host && (document.activeElement === host || !!host.shadowRoot?.activeElement)
}

function editorHasFocus() {
  return editorFocused.value || editorHasDomFocus()
}

function handleEditorFocusIn() {
  if (focusOutTimer != null) {
    window.clearTimeout(focusOutTimer)
    focusOutTimer = null
  }
  editorFocused.value = true
  highlightPreview()
}

function handleEditorFocusOut() {
  if (focusOutTimer != null) window.clearTimeout(focusOutTimer)
  focusOutTimer = window.setTimeout(() => {
    focusOutTimer = null
    if (editorHasDomFocus()) return
    editorFocused.value = false
    snippetVisible.value = false
  }, 0)
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
    let renderOptions
    if (paperSize.value === 'responsive') {
      const width = Math.round((previewWidth.value || DEFAULT_PREVIEW_WIDTH) / EDITOR_ZOOM)
      renderOptions = { width, zoom: EDITOR_ZOOM }
    } else {
      renderOptions = { widthMm: PAPER_WIDTH_MM[paperSize.value], zoom: EDITOR_ZOOM }
    }
    previewSvg.value = renderAretino(currentSource(), renderOptions)
    previewError.value = ''
    highlightPreview()
  } catch (error) {
    previewSvg.value = ''
    previewError.value = error?.message ?? 'The preview could not be rendered.'
  }
}

function highlightPreview(caret = currentCaret()) {
  const requestId = ++highlightRequestId
  const position = Number(caret)

  void nextTick(() => {
    if (requestId !== highlightRequestId || !mounted.value || !previewEl.value || !highlightAtCaret) return
    highlightAtCaret(previewEl.value, Number.isFinite(position) ? position : 0)
    updateSnippet()
  })
}

function handlePreviewClick(event) {
  if (!sourceSpanFromPreviewClick || !previewEl.value) return
  const span = sourceSpanFromPreviewClick(event, previewEl.value)
  if (span) {
    const host = editorHost()
    if (host) {
      host.caret = span.srcEnd
      host.focus()
    }
  }
}

function updateSnippet() {
  const host = editorHost()
  if (!host || !editorHasFocus() || !snippetEl.value || !snippetShadow || !snippetInner || !caretAnchorInfo) {
    snippetVisible.value = false
    return
  }

  const head = host.selection?.head ?? host.caret ?? 0
  const len = (host.value ?? '').length
  const html =
    host.getSourceHtml(Math.max(0, head - 10), head) +
    '<b class="cur" style="display:inline-block;transform:scaleY(2);color:rgba(234,88,12,.85)">|</b>' +
    host.getSourceHtml(head, Math.min(len, head + 10))

  try {
    snippetShadow.adoptedStyleSheets = Array.from(host.shadowRoot.adoptedStyleSheets)
  } catch {}
  try {
    const editorPart = host.shadowRoot?.querySelector('[part~="editor"]') ?? host.shadowRoot?.firstElementChild
    if (editorPart) {
      const cs = getComputedStyle(editorPart)
      snippetEl.value.style.fontFamily = cs.fontFamily
      //snippetEl.value.style.fontSize = cs.fontSize
      snippetEl.value.style.color = cs.color
    }
  } catch {}
  snippetInner.innerHTML = html

  const info = caretAnchorInfo(previewEl.value)
  if (!info) { snippetVisible.value = false; return }

  const { rect, isLyric, staffTopPx } = info
  const el = snippetEl.value
  const tipH = el.getBoundingClientRect().height || 32

  let y
  if (isLyric) {
    const yBelow = rect.bottom + 8
    y = (yBelow + tipH <= window.innerHeight - 4) ? yBelow : Math.max(4, rect.top - tipH - 8)
  } else {
    const yAbove = staffTopPx - tipH - 8
    y = yAbove >= 4 ? yAbove : staffTopPx + 8
  }

  const cx = rect.left + rect.width / 2
  const tipW = el.getBoundingClientRect().width || 320
  const x = Math.max(4, Math.min(cx - tipW / 2, window.innerWidth - tipW - 8))

  el.style.left = x + 'px'
  el.style.top = y + 'px'
  snippetVisible.value = true
}

function toggleFullscreen() {
  fullscreen.value = !fullscreen.value
  if (fullscreen.value) {
    document.body.style.overflow = 'hidden'
    splitEditorHeight.value = Math.round(window.innerHeight * 0.45)
  } else {
    document.body.style.overflow = ''
  }
  nextTick(() => {
    observePreview()
    renderPreview()
  })
}

function startDrag(event) {
  isDragging.value = true
  const startY = event.type === 'touchstart' ? event.touches[0].clientY : event.clientY
  const startHeight = splitEditorHeight.value

  function onMove(e) {
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY
    const minH = 80
    const maxH = window.innerHeight - 120
    splitEditorHeight.value = Math.max(minH, Math.min(maxH, startHeight + (clientY - startY)))
  }

  function onUp() {
    isDragging.value = false
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
    document.removeEventListener('touchmove', onMove)
    document.removeEventListener('touchend', onUp)
    nextTick(() => { observePreview(); renderPreview() })
  }

  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
  document.addEventListener('touchmove', onMove)
  document.addEventListener('touchend', onUp)
}

function serializeSvg(svg) {
  const clone = svg.cloneNode(true)
  clone.querySelectorAll('.aretino-cursor-rect').forEach((el) => el.remove())
  if (!clone.getAttribute('xmlns')) clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
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
  const svg = previewEl.value?.querySelector('svg')
  if (!svg) return null
  const size = svgElementSize(svg)
  if (!size) return null
  return { markup: serializeSvg(svg), size }
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
  for (let i = 0; i < 3 && !previewEl.value?.querySelector('svg') && !previewError.value; i++) {
    await new Promise((resolve) => requestAnimationFrame(resolve))
  }
}

async function saveSvg() {
  saveError.value = ''
  await waitForPreviewPaint()
  let svgInfo
  try { svgInfo = currentSvgInfo() } catch {
    saveError.value = 'The preview SVG is not available yet.'
    return
  }
  if (!svgInfo) { saveError.value = 'The preview SVG is not available yet.'; return }
  downloadBlob(new Blob([svgInfo.markup], { type: 'image/svg+xml;charset=utf-8' }), 'score.svg')
}

async function savePng() {
  saveError.value = ''
  await waitForPreviewPaint()
  let svgInfo
  try { svgInfo = currentSvgInfo() } catch {
    saveError.value = 'The preview SVG is not available yet.'
    return
  }
  if (!svgInfo) { saveError.value = 'The preview SVG is not available yet.'; return }

  const svgBlob = new Blob([svgInfo.markup], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)
  const image = new Image()
  try {
    await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; image.src = url })
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(svgInfo.size.width * 2))
    canvas.height = Math.max(1, Math.round(svgInfo.size.height * 2))
    const ctx = canvas.getContext('2d')
    if (!ctx) { saveError.value = 'The PNG export could not be created.'; return }
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!pngBlob) { saveError.value = 'The PNG export could not be created.'; return }
    downloadBlob(pngBlob, 'score.png')
  } catch {
    saveError.value = 'The PNG export could not be created.'
  } finally {
    URL.revokeObjectURL(url)
  }
}

watch(source, () => renderPreview(), { flush: 'post' })
watch(previewWidth, () => renderPreview(), { flush: 'post' })
watch(paperSize, () => renderPreview(), { flush: 'post' })
</script>

<template>
  <div class="online-editor" :class="{ 'online-editor--fullscreen': fullscreen }">

    <!-- Fullscreen compact header -->
    <div v-if="fullscreen" class="online-editor__fs-header">
      <div class="online-editor__paper-controls">
        <button
          v-for="size in PAPER_SIZES"
          :key="size.value"
          type="button"
          class="online-editor__paper-btn"
          :class="{ 'online-editor__paper-btn--active': paperSize === size.value }"
          @click="paperSize = size.value"
        >{{ size.label }}</button>
      </div>
      <button type="button" class="online-editor__btn" @click="toggleFullscreen">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="online-editor__icon" aria-hidden="true">
          <path d="M3 6V3h3M10 3h3v3M13 10v3h-3M6 13H3v-3"/>
        </svg>
        Exit
      </button>
    </div>

    <!-- Workspace -->
    <ClientOnly>
      <div
        class="online-editor__workspace"
        :class="{ 'online-editor__workspace--fullscreen': fullscreen }"
        :style="isDragging ? 'user-select:none;cursor:row-resize' : ''"
      >

        <!-- Editor pane -->
        <div
          class="online-editor__editor-pane"
          :class="{ 'online-editor__editor-pane--fs': fullscreen }"
          :style="fullscreen ? `height:${splitEditorHeight}px` : ''"
        >
          <!-- Above editor: fullscreen toggle (normal mode only) -->
          <div v-if="!fullscreen" class="online-editor__col-header">
            <button type="button" class="online-editor__btn" @click="toggleFullscreen">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="online-editor__icon" aria-hidden="true">
                <path d="M6 2H2v4M14 6V2h-4M2 10v4h4M10 14h4v-4"/>
              </svg>
              Fullscreen
            </button>
          </div>

          <aretino-editor
            v-if="editorReady"
            ref="editorEl"
            class="online-editor__component"
            :class="{ 'online-editor__component--fs': fullscreen }"
            :zoom="EDITOR_ZOOM"
            :preview="false"
            @change="handleEditorChange"
            @selectionchange="handleEditorSelectionChange"
          />
        </div>

        <!-- Drag handle (fullscreen only) -->
        <div
          v-if="fullscreen"
          class="online-editor__drag-handle"
          @mousedown.prevent="startDrag"
          @touchstart.prevent="startDrag"
        >
          <div class="online-editor__drag-grip"></div>
        </div>

        <!-- Preview pane -->
        <div
          class="online-editor__preview-shell"
          :class="fullscreen ? 'online-editor__preview-shell--fs' : ''"
        >
          <!-- Above preview: paper size selector (normal mode only) -->
          <div v-if="!fullscreen" class="online-editor__preview-col-header">
            <div class="online-editor__paper-controls">
              <button
                v-for="size in PAPER_SIZES"
                :key="size.value"
                type="button"
                class="online-editor__paper-btn"
                :class="{ 'online-editor__paper-btn--active': paperSize === size.value }"
                @click="paperSize = size.value"
              >{{ size.label }}</button>
            </div>
          </div>

          <div
            ref="previewEl"
            class="online-editor__preview"
            :class="{ 'online-editor__preview--paper': paperSize !== 'responsive' }"
            v-html="previewSvg"
            @click="handlePreviewClick"
          />
          <p v-if="previewError" class="online-editor__preview-error" role="alert">{{ previewError }}</p>

          <!-- Below preview: save buttons -->
          <div class="online-editor__preview-footer">
            <button type="button" @click="saveAretino">Save Aretino</button>
            <button type="button" :disabled="!editorReady" @click="saveSvg">Save SVG</button>
            <button type="button" :disabled="!editorReady" @click="savePng">Save PNG</button>
            <span v-if="saveError" class="online-editor__save-error" role="status">{{ saveError }}</span>
          </div>
        </div>

      </div>
    </ClientOnly>

    <div
      v-if="mounted"
      ref="snippetEl"
      class="online-editor__snippet"
      :class="{ 'online-editor__snippet--visible': snippetVisible }"
      aria-hidden="true"
    ></div>
  </div>
</template>
