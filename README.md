# aretino-chant.github.io

Documentation site for [Aretino](https://github.com/aretino-chant/aretino-chant) —
a text format for Gregorian chant. Built with [VitePress](https://vitepress.dev/).

Every ` ```aretino ` fenced code block in the docs is rendered as a live,
editable mini-editor in the browser, powered by
[`@aretino-chant/core`](https://www.npmjs.com/package/@aretino-chant/core).

## Develop

Requires Node 18+ (CI uses Node 22).

```bash
npm ci
npm run docs:dev      # local dev server
npm run docs:build    # static build into .vitepress/dist
npm run docs:preview  # preview the built site
```

## Deploy

Pushing to `main` (or `master`) triggers `.github/workflows/deploy.yml`, which
builds the site and publishes it to GitHub Pages. A one-time repo setting is
required: **Settings → Pages → Source: GitHub Actions**.

## Content

- English pages (`/`) — `index.md`, `user-guide.md`, `cheatsheet.md`.
- Hungarian pages (`/hu/`) — `hu/index.md`, `hu/user-guide.md`, `hu/cheatsheet.md`.

The guides and the HU cheatsheet are copied from the upstream `aretino-chant`
repo's `docs/` directory; keep them in sync when the source changes.

## License

- Code: MPL-2.0
- Documentation: CC-BY-4.0
