# Cheatsheet

| Clefs ||
|---|---|
| `(g2)` `(f4)` `(c3)` | G, F, C clef (letter + staff line) |

| Pitch ||
|---|---|
| `A B c d e f g a b C D E F G` | the 14 staff positions, low to high |
| `c d e f g a b` | middle octave (lowercase) |
| `A B` `C D E F G` | outside the middle octave (uppercase) |
| `^a ^b ^C` | above `G`: octave-shift prefix, +7 positions; stacks (`^^c`) |
| `vg vf ve` | below `A`: octave-shift prefix, −7 positions |

| Notehead ||
|---|---|
| `d`, `d'` | punctum, virga |
| `dw`, `dt` | quilisma, tenor note |

| Suffix ||
|---|---|
| `d.`, `d_`, `d-`, `d~` | mora, episema, ictus, plica |
| `ds` | small (cue-sized) note; a modifier, so it combines with any shape |
| `dfd/gab`, `dfd / gab` | `/` = visual neume separator |

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
| `(b)` `(n)` `(#)` | flat, natural, sharp at the default reciting position `b` |
| `(f#)` `(cn)` `(eb)` | prefix the target pitch letter to place it elsewhere |
| `(f#) f` | directive before a note applies to that note |
| `(K:f# C#)` | key signature (repeats at the start of every line) |
| `(Kb)` `(Kbb)` `(K#)` `(K##)` | shortcuts: one/two flats, one/two sharps |
| `(K:)` `(K)` | clear key signature |

| Decorations | |
|---|---|
| `[a]` `[ag]` `[a b C]` | typographical parentheses around note(s) or neume |
| `{ g a b }` `\arc{ g a b }` `\line{ g a b }` | overbrace, arc, line above a span |
| `\slur{ f A }` `\slurSolid{ A g }` | dashed / solid slur between noteheads |
| `{ g a b }"1."` | spanning mark label |
| `ag"Label"` | label above the note or neume |

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
| `n: g a b` | continue the previous music line |
| unprefixed line after `w:` | continue the lyric line |
| unprefixed line after `W:` | same block: a break in `psalm` / `stanza`, reflowed in `prose` / `rubric` |
| `~` | non-breaking space inside one syllable |
| `~~` | in `w:`: split display text from alignment text (e.g. `1.~~Ky-ri-e`) |
| `~~` | in `W:`: split a marker (verse number, `\R.`, role label) from the block body |
| `*` | flex mark — a verse division, kept as a literal `*` |
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
| `%option: textMarkerAlign=right` | markers flush against the text column instead of the left margin |

| Header | Meaning |
|---|---|
| `%title: Title` | title; other drawn headers: subtitle, caption, rubric, indent |
| `%transpose: 2` | render transposed by a signed number of semitones |
| `%option: lyricDistance=0.5` | renderer option; repeat one option per line |
| `%%` | end of header |

| Markdown | Meaning |
|---|---|
| `` ```aretino `` | fenced Aretino block |
| `` ```aretino fixed width=18cm `` | fixed-width embedded block |
