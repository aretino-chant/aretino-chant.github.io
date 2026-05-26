import DefaultTheme from 'vitepress/theme'
import AretinoEditor from './AretinoEditor.vue'
import AretinoOnlineEditor from './AretinoOnlineEditor.vue'
import GabcTranscriptionTool from './GabcTranscriptionTool.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AretinoEditor', AretinoEditor)
    app.component('AretinoOnlineEditor', AretinoOnlineEditor)
    app.component('GabcTranscriptionTool', GabcTranscriptionTool)
  },
}
