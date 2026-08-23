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
npm run dev      # local dev server
npm run build    # static build into .vitepress/dist
npm run preview  # preview the built site
```

## Deploy

Pushing to `main` (or `master`) triggers `.github/workflows/deploy.yml`, which
builds the site and publishes it to GitHub Pages. A one-time repo setting is
required: **Settings → Pages → Source: GitHub Actions**.

## Content

- `index.md` — introduction and home page.
- `user-guide.md`, `cheatsheet.md` — the format documentation.
- `editor.md`, `gabc-transcription.md`, `guido-transcription.md` — the online
  tools.

The guide and the cheatsheet track the format reference kept upstream in
[`packages/core/docs/syntax-reference.md`](https://github.com/aretino-chant/aretino-chant/blob/main/packages/core/docs/syntax-reference.md);
they are written in this repo's own voice rather than copied verbatim, so when
`@aretino-chant/core` is upgraded, diff that file between the two versions and
fold any new syntax into both pages.

## License

- Code: MPL-2.0
- Documentation: CC-BY-4.0
