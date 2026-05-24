import { defineConfig } from 'vitepress'

const CODE_REPO = 'https://github.com/aretino-chant/aretino-chant'
const DOCS_REPO = 'https://github.com/aretino-chant/aretino-chant.github.io'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Aretino Chant',
  description: 'A text format for Gregorian chant',
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['**/README.md'],

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ],

  markdown: {
    // Turn every ```aretino fenced block into an interactive <AretinoEditor>.
    // Source is base64-encoded so multi-line content and special characters
    // survive being placed in an HTML attribute and a Vue template.
    config(md) {
      const defaultFence = md.renderer.rules.fence!.bind(md.renderer.rules)
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const lang = token.info.trim().split(/\s+/)[0]
        if (lang === 'aretino') {
          const b64 = Buffer.from(token.content, 'utf-8').toString('base64')
          return `<AretinoEditor source="${b64}" />\n`
        }
        return defaultFence(tokens, idx, options, env, self)
      }
    },
  },

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'aretino-editor',
      },
    },
  },

  vite: {
    optimizeDeps: {
      exclude: ['@aretino-chant/editor'],
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: CODE_REPO }],
    editLink: {
      pattern: `${DOCS_REPO}/edit/master/:path`,
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under MPL-2.0 (code) and CC-BY-4.0 (docs).',
      copyright: 'Copyright © 2026 Bertalan Fodor and contributors',
    },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Editor', link: '/editor' },
          { text: 'User guide', link: '/user-guide' },
          { text: 'Cheatsheet', link: '/cheatsheet' },
        ],
        sidebar: [
          {
            text: 'Documentation',
            items: [
              { text: 'Introduction', link: '/' },
              { text: 'Online editor', link: '/editor' },
              { text: 'User guide', link: '/user-guide' },
              { text: 'Cheatsheet', link: '/cheatsheet' },
            ],
          },
        ],
      },
    },
    
  },
})
