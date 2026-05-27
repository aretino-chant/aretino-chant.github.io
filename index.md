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
      text: Official editor
      link: /editor
    - theme: alt
      text: GABC transcription
      link: /gabc-transcription
    - theme: alt
      text: Cheatsheet
      link: /cheatsheet

features:
  - title: Transcription, not replacement
    details: Aretino does not try to cover everything GABC and Gregorio do. It is a target notation for practical chant transcription.
  - title: Modern staff, Gregorian logic
    details: The notation uses familiar staff reading without turning chant into ordinary modern rhythm or note-by-note melody.
  - title: Neumes remain units
    details: Melodic figures stay visibly grouped through stems, descending connections, spacing, text alignment, and Gregorian signs.

---

Aretino is a staff-based chant notation concept for transcribing Gregorian music in a form readable to modern musicians, without turning it into ordinary modern notation. It preserves the neumatic logic of chant by keeping the sung figure of each syllable as a musical unit, even while using modern staff orientation, round noteheads, and familiar notation symbols. It follows the Gregorian transcription method  promoted by [László Dobszay](https://zti.hu/index.php/en/early-music/history-of-the-department/laszlo-dobszay) and Janka Szendrei in Hungarian Catholic chant practice. 

## Try it

Edit the source below — the notation updates as you type.

```aretino
(g2) g A B g. AB A g e_d_ , g AB Ag g. ||
w: Al-le-lu-ia, al-le-lu-ia, al-le-lu-ia.
```
