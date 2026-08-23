# Cheatsheet

| Clefs ||
|---|---|
| `(g2)` `(f4)` `(c3)` | G, F, C clef |

| Pitch ||
|---|---|
| `a b c d e f g h i j k l m n` | 14 positions, low to high |
| `A B … N` | raised octave (uppercase) |
| `^d` | octave shift up (prefix, +7 positions); stacks: `^^d` |
| `vd` | octave shift down (prefix); for notes beyond the letter range |

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
| `\slur{ g h }` `\slurSolid{ g h }` | dashed / solid slur between noteheads |
| `{ g h i }"1."` | spanning mark label |
| `hg"Label"` | label above the note or neume |

| Text | |
|---|---|
| `w: Ky-ri-e` | text line (hyphen = syllable boundary, drawn where there is room) |
| `w: Ky=ri-e` | mandatory syllable boundary — hyphen always drawn |
| `w: on-ly\-be-got-ten` | `\-` = literal hyphen inside one syllable |
| `w: ro___.` | `_` = extender line; each further `_` reaches one more neume |
| `w: some\_word` | `\_` = literal underscore inside one syllable |
| multiple `w:` lines | multiple stanzas |
| `W: Psalm verse text...` | text block (free-flowing, not note-aligned) |
| multiple `W:` lines | consecutive text blocks |
| `n: g h i` | continue the previous music line |
| unprefixed line after `w:` | continue the lyric line |
| unprefixed line after `W:` | same block: a break in `psalm` / `stanza`, reflowed in `prose` / `rubric` |
| `~` | non-breaking space inside one syllable |
| `~~` | in `w:`: split display text from alignment text (e.g. `1.~~Ky-ri-e`) |
| `~~` | in `W:`: split a marker (verse number, `\R.`, role label) from the block body |
| `(text)` | lyric label under the next bar line |
| `[text]` `<text>` `{text}` | underline, italic, bold |
| `\red{text}` `\color:green{text}` | colored text |
| `\R` `\V` `+` `++` | responsory, versicle, dagger, double dagger |
| `\X` | escape any special character |

| Text blocks (`W:`) | |
|---|---|
| `W(psalm):` | default; source line breaks kept, 2 em indent |
| `W(prose):` | reflowed as running text, no indent |
| `W(stanza):` | hymn strophe; breaks kept, 1.5 em indent on overflow only |
| `W(rubric):` | reflowed, 85% size, red |
| `\|` | manual line break inside a block (`\\|` = literal pipe) |
| `%option: textStyle=prose` | document-wide default style; `W(style):` overrides it |
| `%option: textMaxIndent=8` | widest marker column, in em (default 8) |

| Header | Meaning |
|---|---|
| `%title: Title` | title; other drawn headers: subtitle, caption, rubric, indent |
| `%option: lyricDistance=0.5` | renderer option; repeat one option per line |
| `%%` | end of header |

| Markdown | Meaning |
|---|---|
| `` ```aretino `` | fenced Aretino block |
| `` ```aretino fixed width=18cm `` | fixed-width embedded block |
