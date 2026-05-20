import DefaultTheme from 'vitepress/theme'
import AretinoEditor from './AretinoEditor.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AretinoEditor', AretinoEditor)
  },
}
