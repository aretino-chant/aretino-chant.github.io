# Cheatsheet

| Clefs ||
|---|---|
| `(g2)` `(f4)` `(c3)` | G, F, C clef |

| Pitch ||
|---|---|
| `a b c d e f g h i j k l m n` | 14 positions, low to high |
| `A B … N` | raised octave (uppercase) |

| Notehead ||
|---|---|
| `d`, `d'`, `dt` | punctum, virga, tenor |
| `dw`, `ds` | quilisma, liquescent/small note |

| Suffix ||
|---|---|
| `d.`, `d_`, `d-`, `d~` | mora, episema, ictus, plica |
| `ds` | liquescent/small note; combines with other shapes |
| `df/gh`, `df / gh` | `/` = visual neume separator |

| Dividers / bars | |
|---|---|
| `'` | tiny breath mark |
| `,` | quarter bar (small caesura) |
| `;` | half bar |
| `\|` | full bar |
| `\|0` | invisible full-bar spacer |
| `\|\|` | double bar (end of section) |
| `\|: :\| :\|:` | repeat start, repeat end, repeat both |
| `\|\|\|` | triple/final bar |
| `(\|)` `(\|\|)` `(:\|)` | parenthesized bar forms also work |

| Spacing / line break | |
|---|---|
| `(z)` `(Z)` | forced line break, justified / left-aligned |
| `= == === (sp) (sp2)` | fixed gap (scalable with count/multiplier) |
| `*` | flexible gap (for justification) |

| Accidentals & key signature | |
|---|---|
| `(b)` `(n)` `(#)` | flat, natural, sharp at default `i` height |
| `(ib)` `(in)` `(i#)` | flat, natural, sharp at explicit pitch |
| `(K:F# C#)` | key signature (repeats at the start of every line) |
| `(K:)` | clear key signature |

| Decorations | |
|---|---|
| `[h]` `[hg]` `[h i j]` | typographical parentheses around note(s) or neume |
| `{ g h i }` `\arc{ g h i }` `\line{ g h i }` | overbrace, arc, line above a span |
| `{ g h i }"1."` | spanning mark label |
| `hg"Label"` | label above the note or neume |

| Text | |
|---|---|
| `w: Ky-ri-e` | text line (hyphen = syllable boundary) |
| multiple `w:` lines | multiple stanzas |
| `W: Psalm verse text...` | verse line (free-flowing, not note-aligned) |
| multiple `W:` lines | multiple verse lines |
| `n: g h i` | continue the previous music line |
| unprefixed line after `w:` / `W:` | continue lyric / explicit verse line break |
| `~` | non-breaking space inside one syllable |
| `~~` | split display text from alignment text (e.g. `1.~~Ky-ri-e`) |
| `(text)` | lyric label under the next bar line |
| `[text]` `<text>` `{text}` | underline, italic, bold |
| `\red{text}` `\color:green{text}` | colored text |
| `\R` `\V` `+` `++` | responsory, versicle, dagger, double dagger |
| `\X` | escape any special character |

| Header | Meaning |
|---|---|
| `%title: Title` | title; other drawn headers: subtitle, caption, rubric, indent |
| `%option: lyricDistance=0.5` | renderer option; repeat one option per line |
| `%%` | end of header |

| Markdown | Meaning |
|---|---|
| `` ```aretino `` | fenced Aretino block |
| `` ```aretino fixed width=18cm `` | fixed-width embedded block |
