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
          { text: 'User guide', link: '/user-guide' },
          { text: 'Cheatsheet', link: '/cheatsheet' },
          { text: 'Magyar', link: '/hu/user-guide' },
        ],
        sidebar: [
          {
            text: 'Documentation',
            items: [
              { text: 'Introduction', link: '/' },
              { text: 'User guide', link: '/user-guide' },
              { text: 'Cheatsheet', link: '/cheatsheet' },
            ],
          },
        ],
      },
    },

    hu: {
      label: 'Magyar',
      lang: 'hu',
      link: '/hu/user-guide',
      themeConfig: {
        nav: [
          { text: 'Útmutató', link: '/hu/user-guide' },
          { text: 'Puska', link: '/hu/cheatsheet' },
        ],
        sidebar: [
          {
            text: 'Dokumentáció',
            items: [
              { text: 'Felhasználói útmutató', link: '/hu/user-guide' },
              { text: 'Puska (cheatsheet)', link: '/hu/cheatsheet' },
            ],
          },
        ],
        editLink: {
          pattern: `${DOCS_REPO}/edit/master/:path`,
          text: 'Oldal szerkesztése a GitHubon',
        },
      },
    },
  },
})
