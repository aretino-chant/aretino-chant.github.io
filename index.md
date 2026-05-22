---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Aretino Chant"
  text: "A text format for Gregorian chant"
  tagline: Write chant in plain text, render it as notation in the browser.
  actions:
    - theme: brand
      text: User guide
      link: /user-guide
    - theme: alt
      text: Cheatsheet
      link: /cheatsheet

features:
  - title: Position is pitch
    details: A letter code names the staff line or space, so the source stays readable and diff-friendly.
  - title: Semantic markers
    details: Mora, episema, ictus, liquescence and ligatures are suffix characters — not magic glyph files.
  - title: Renders in the browser
    details: The parser and SVG renderer run client-side. Every example on this site is a live, editable editor.
---

## Try it

Edit the source below — the notation updates as you type.

```aretino
(g2) g A B g. AB A g e_d_ , g AB Ag g. ||
w: Al-le-lu-ia, al-le-lu-ia, al-le-lu-ia.
```

Aretino is a text format for notating Gregorian chant, following the Hungarian
Catholic practice of [László Dobszay](https://zti.hu/index.php/en/early-music/history-of-the-department/laszlo-dobszay) and Janka Szendrei. The reference parser and
renderer are published as [`@aretino-chant/core`](https://www.npmjs.com/package/@aretino-chant/core).
