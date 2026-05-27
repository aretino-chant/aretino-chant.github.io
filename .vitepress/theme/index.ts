import DefaultTheme from 'vitepress/theme'
import AretinoEditor from './AretinoEditor.vue'
import AretinoOnlineEditor from './AretinoOnlineEditor.vue'
import GabcTranscriptionTool from './GabcTranscriptionTool.vue'
import './style.css'

function ignorePlainSlashSearchHotkey(event: KeyboardEvent) {
  if (
    event.key === '/' &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey
  ) {
    // VitePress local search hard-codes "/" as a global shortcut.
    event.stopImmediatePropagation()
  }
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', ignorePlainSlashSearchHotkey)
    }

    app.component('AretinoEditor', AretinoEditor)
    app.component('AretinoOnlineEditor', AretinoOnlineEditor)
    app.component('GabcTranscriptionTool', GabcTranscriptionTool)
  },
}
