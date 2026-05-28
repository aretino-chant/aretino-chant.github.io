# Aretino — User Guide

> Gregorian notation in text format with modern staff and symbols

```aretino
(g2) g A B g. AB A g e_d_ , g AB Ag g. ||
w: Al-le-lu-ia, al-le-lu-ia, al-le-lu-ia.
```

This guide introduces the **Aretino** notation format step by step, with examples.
The format/layout algorithm may still change; we welcome your feedback!

We also provide an [official online editor](/editor) with syntax highlighting, image export etc.

The Aretino notation format is freely usable; please link to our website in public materials: [aretino-chant.github.io](https://aretino-chant.github.io)

---

## 1. What is Aretino?

**Aretino** is a text-based format for notating Gregorian chants — following the conventions of László Dobszay and Janka Szendrei:

- **five-line** staff,
- **treble clef** by default,
- traditional **round** noteheads (not square),
- but **Gregorian rhythm** and notation system: mora, episema, plica, quilisma, liquescent neumes, ligatures.

The name alludes to Guido d'Arezzo (in Latin *Guido Aretinus*) — the spiritual successor of the old *Guido HU/EN* TTF font, but an independent, semantic format.

### Design Philosophy in Brief

| Principle | What it means in practice |
|---|---|
| **Position = pitch** | The letter code determines which line or space the note occupies. |
| **Semantic markers** | Episema, mora, etc. are suffix characters, not magic glyph files. |
| **Separate text/verse lines** | `w:` lyric lines and `W:` verse lines are independently meaningful. |

---

## 2. Theoretical Background — the "Modernized Metz-Gothic" Transcription

Aretino did not emerge from nothing: it is the heir to nearly four decades of Hungarian Gregorian transcription scholarship. The professional foundation was laid by László Dobszay's essay [On the Transcription of Gregorian Chant](https://egyhazzene.hu/wp-content/uploads/2018/12/gregorian_atiras.pdf) (in Hungarian) and the paleographic work of Janka Szendrei. Below we briefly summarize the principles from which Aretino's current form follows.

### The Core Problem of Transcription

In Dobszay's sharp formulation, the real difficulty of Gregorian transcription is **not** the number of staff lines or the choice of clef — these have changed through the centuries and can be changed today without touching the essence. The genuine question is one of **perspective**:

> "Most early neume notations did not aim to indicate a sequence of pitches…
> but rather what kind of melodic figure the syllables of the text should be sung on.
> The notation is the indication of this melodic figure, and as a unified sign expresses a figure of 3–4 notes."

In other words: a Gregorian melody is sung well by someone who **conceives and renders the melodic figure for a single syllable as a unit** — not building up the melisma note by note. A good modern transcription, therefore, is one that suggests this "neumatic" way of hearing to the reader.

### Two Classic Dead Ends

1. **Reproduction of square notation** — historically faithful, but demands careful reading from today's singer; the four lines and the C-/F-clef are the lesser problem, but the vertically written pes, the curved porrectus line, and the diamond-shaped noteheads mislead the modern reader.
2. **"Modern" transcription with eighth and quarter note values** — makes it obvious that this is a transcription, but the metric rhythmic values **attach false rhythmic conceptions** to the melody.

By the end of the 20th century, both solutions were superseded by a third — the method of **modern stemless round noteheads + slurs**. Dobszay also sharply criticizes this: such a notation presents the melody as a long sequence of individual notes, and plants the same mental image in the singer. Two reasons led to its spread: (1) the scribe does not strongly perceive hearing by melodic figures; (2) computer music notation trivially produces this primitive notation image.

### The Direction of the Solution — Metz-Gothic Notation

There is a medieval notational system that, in agreement with the "modern" perspective, interprets the two axes (horizontal = time, vertical = pitch), **while** preserving the visual cohesion of note groups: **Metz-Gothic notation**. The Budapest Gregorian researchers (above all Janka Szendrei) took this as a basis and, combined with modern round noteheads, developed the system known today as the "Budapest transcription" or "modernized Metz-Gothic."

### The Ten Points of the Modernized Metz-Gothic (Dobszay)

Chapter IV of the essay summarizes the principles in ten points. Aretino essentially encodes this system in text format:

1. **Horizontal = time, vertical = pitch.** (In agreement with the modern perspective.)
2. **Any notehead type** may be used; naturally, modern **round** ones are fine.
3. **Notes belonging to the same neume** are written as **close together** as legibility allows.
4. **The unity of the neume is expressed by a stem descending on the left side of the relatively highest note.** Such a stem is placed on:
   - the 2nd note of the pes, the 1st note of the clivis, the middle note of the torculus, the 1st and 3rd notes of the porrectus, the 3rd note of the scandicus, the 1st note of the climacus — **always the locally highest note**.
   - If the direction changes within the neume, the stem is repeated for each new peak.
5. **Descending groups of notes** (clivis, etc.) are connected by a **thin vertical or slightly oblique connecting line**. Optional for a second, **required for larger intervals**.
6. **Internal grouping of longer melismas** in two ways:
   - either with additional stems (indicating different articulations),
   - or by inserting a **one-notehead-width empty gap** between the small groups.
7. **Note repetitions** may be freely used; if the repeated note starts a descending motion, a stem may be added to the second note.
8. **Comma (plica)** in two ways: a small internal separator, or attached to a note to separate it within the group.
9. **Liquescence** is normally indicated with a reduced-size notehead — or, if such a sign is unavailable, with a note marked with a plica.
10. **The number of staff lines and the choice of clef are independent** of the essence of the system.

Points 4–5 are the heart of the system: the **stem descending from the peak** and the **curved/oblique line connecting descending notes**. This is what makes Gregorian notation both **modernly readable** and **neumatic**.

---

## 3. The Guido Font as Intellectual Predecessor

The first practically usable computer implementation of the modernized Metz-Gothic transcription was the work of **János Bali**: the **Guido** TTF font (the old *Guido HU/EN* font). The name pays homage to Guido d'Arezzo (*Guido Aretinus*) — the medieval father of the pitch system and four-line notation; Aretino inherits its name from this tradition.

### How Did the Guido Work?

The Guido was **not a program but a font** — the user set the font to Guido in a plain word processor (Word, OpenOffice, etc.) and typed the score character by character. The main principles:

- **It did not work on pre-drawn staff lines**: the noteheads brought their corresponding staff-line segments with them.
- **Number keys = punctum** (from one-line C up to two-line A); even number = note on a line, odd = note in a space.
- **Shift** on the same key = **plica** (small comma sign).
- **Letter below the number row** = **virga** (note with stem).
- **Descending second/third/fourth** = combinations of separate key rows.
- The **text was written in a separate line**, and the user **aligned it with spaces** under the notes — the syllable was not attached to the note.

A typical source line in Guido looked like this:

```
<-4--4t---tT4--t4--tg3--tG2--5zZ5--4uU6---7uU6Z5T4
```
![Guido example](/guido-pelda.png)

Every note at every position in every variant required a different keystroke:
`4 t` = pes, `t T 4` = second clivis with connecting line, `5 z Z 5` =
torculus, `4 u U 6` = another torculus, etc. Moreover, certain markings could not be achieved at all (simply not enough characters).

The same thing in Aretino — simply specify the note names and everything is automatic:

```aretino
(g2) g gh hg h'/g hf he hih gji jjihg
```

### What Did the Guido Bring?

Revolutionarily much:

- it **ran on anyone's computer**, installation practically zero,
- one could typeset a score within moments,
- it **preserved the principles of Metz-Gothic notation** — stems, curved connecting lines, plica were all accessible,
- and it was inexpensive: no specialist, no typographic engraving needed.

---

## 4. Why Does Aretino Go Further?

The Guido is **character-level, manual typography** — the user "draws" with the keyboard: places every sign manually, adjusts every spacing with spaces, and must know and position which stem belongs to which note. This is **the limitation of the font-based technique**, not a flaw — but the consequence is:

- the notation image is **static**: if syllables are rearranged or the score is resized, the alignment collapses;
- **there is no automation**: stems, connecting lines, neume spacing must all be set by hand;
- **there is no semantic connection between text and notes**: the syllables of "Ky-ri-e" only visually stand below the notes;
- **no line break, no justification**: every line is manually cut;
- **the source is not interpretable**: the character sequence `<-4--4t---tT4` is only a drawing of Guido font positions, not a semantic notation — very cumbersome to edit.

**Aretino** implements the same notational tradition — the modernized Metz-Gothic transcription — as a **semantic, text-based format**. What this entails:

| Aspect | Guido (TTF font) | Aretino (semantic format) |
|---|---|---|
| **Representation** | every variant of a notehead is a separate character | noteheads always mean the same thing; there are modifier characters |
| **Virga, stemming** | placed by the user, always manually | **automatic**: the renderer places a stem on every local maximum, but can also be set manually |
| **Descending connecting line** | separate key combination | **automatic**: the renderer draws it for every descent, adjusted by interval |
| **Neume spacing** | manual — with spaces and hyphens | **automatic**: the renderer positions the neumes |
| **Line-end justification** | none | **automatic** and manual line justification (`(z)` directives) |
| **Syllable–note alignment** | user aligns with spaces | **automatic**: syllable goes under the corresponding neume |
| **Multiple stanzas** | each stanza is a separate line, aligned manually | `w:` lines, each aligned automatically |
| **Scaling** | font point size changes it | arbitrary, with automatic re-layout, enabling different display sizes |
| **Layout/re-typesetting** | none — the line only fits as many characters as typed | **automatic line breaking** at the margin, with clef repetition |
| **Source portability** | TTF-font-dependent, meaningless without the font | plain UTF-8 text, readable and editable without the font |
| **Extensibility** | practically impossible | unlimited |

### Summary of the Concept

Guido specifies how the Gregorian score should look. Aretino tries to describe what the score means musically: where the syllables, neumes, accents, melodic connections, and notational phenomena are. This is the difference between copying a score image and recording a true musical source. One gives a pretty picture; from the other, the machine also understands what is happening in the melody — and produces a prettier picture.

Moreover, the aesthetic appearance of the score and adherence to stemming rules depend on the editor in Guido's case; Aretino makes it possible to produce an aesthetically pleasing, rule-conforming notation automatically, simply by specifying the notes.

### What Does Aretino Preserve from the Tradition?

Everything that is essential to the Dobszay–Szendrei school:

- **round noteheads**, five-line system, modern clefs (point 10);
- **virga stem** (point 4) — automatically, on every local maximum;
- **descending connecting line** (point 5) — automatically, adjusted by interval;
- **neume grouping with a notehead-width gap** (point 6) — the `/` operator;
- **mora, episema, plica, quilisma, and liquescent small notes** (points 8–9) — as suffix characters;
- **independence of the staff-line and clef question** (point 10) — the clef can be changed without affecting the `a–n` notation.

Aretino therefore does **not break** with the tradition — on the contrary: it **automates the essence**, so the user only needs to focus on the musical content.

---

## 5. Your First Score

```aretino
(g2) c e g A g.
```

This draws a treble clef (G on the 2nd line) and then five punctums — the last with a mora (duration dot).

A minimal example with text and header:

```aretino
%title: Salve Regina
%%
(g2) c e g A g.
w: Sal-ve, Re-gí-na,
```

The three main building blocks:

1. **Header** — optional; `%key: value` lines, usually closed by `%%`.
2. **Melody line** — notes, ligatures, bar lines. The first parenthesized element is usually the clef (`(g2)`, `(f4)`, `(c3)`).
3. **Text line** — lyric (`w:`), verse (`W:`), or music continuation (`n:`), directly beneath the melody it belongs to.

Body lines are classified by prefix:

| Prefix | Meaning |
|---|---|
| `w:` | lyric syllables aligned under the preceding music line |
| `W:` | free-flowing verse text, not note-aligned |
| `n:` | music continuation after lyrics |
| *(blank)* | section break / vertical spacing |
| *(anything else)* | music line |

After a `w:` line, an unprefixed line continues the same lyric line. After a `W:` line, an unprefixed line becomes an explicit line break inside that verse.

---

## 6. Header

Header lines begin with a percent sign (`%key: value`). The `%%` marker closes the header; it is optional, but recommended whenever a header is present.

| Key | Description |
|---|---|
| `title` | Title, centered, bold. |
| `subtitle` | Smaller centered subtitle below the title. |
| `caption` | Caption, right-aligned, italic. |
| `rubric` | Rubric, left-aligned, small caps. |
| `indent` | Indentation at the beginning of the first line. If a value is given (e.g. `I.d`), it appears in lowercase. |
| `option` | Renderer option, one per line, e.g. `%option: lyricDistance=0.5`. |

You can also use special characters, and formatting.

```aretino
%title: Vigil
%subtitle: Example
%caption: Ps. 50,17
%indent: VII.
%rubric: Call for prayer
%option: lyricDistance=0.5
%%
(g2) h h h g h j i g h. ||
w: O Lord, hear my hum-ble call to you!
```

Use either `name=value` or `name: value` for `%option:` headers. Numbers are parsed as numbers; booleans accept `true`/`false`, `1`/`0`, `yes`/`no`, and `on`/`off`. Common source-level options include `dpi`, `staffSpaceMm`, `lyricSize`, `textFont`, `noteSpacing`, `lyricDistance`, `hideRepeatClef`, `canvasHeight`, and `staffGap`.

The header is **optional** — you can start immediately with the melody line. Unknown header keys are kept in the parsed source but are not drawn.

---

## 7. Clefs

The clef is specified in parentheses: letter + line number.

| Source | Clef | Note |
|---|---|---|
| `(g2)` | G-clef on line 2 | Treble clef |
| `(f4)` | F-clef on line 4 | Bass clef |
| `(c3)` | C-clef on line 3 | Small square C-sign (not a traditional alto clef). |

The clef is usually the first element of the melody line. You can also change the clef mid-line:

```aretino
(g2) d f g h  (c3) e g h (f4) i h g
```

After a line break, the renderer automatically draws the current clef.

---

## 8. Pitch

Notes are represented by the lowercase letters **a–n**. The letter always indicates the same line or space, **regardless of the clef**:

```aretino
a b c d e f g h i j k l m n
w: a b c d e f g h i j k l m n
```

So in treble clef, `c` is C on line 1, `g` is B on line 3, etc.
In bass clef, the same `c` on line 1 becomes E (because the clef changes, but the line position does not).

### Raised Octave — Uppercase letters

```aretino
A B C D E F G H I J K L M N
w: A B C D E F G H I J K L M N
```

---

## 9. Notehead Types

A **suffix character** immediately after the letter modifies the base form of the notehead:

| Source | Name | Appearance |
|---|---|---|
| `d` | **punctum** | filled round notehead, no stem |
| `d'` | **virga** | punctum with a downward stem on the left |
| `dw` | **quilisma** | striped, zigzag-contour notehead |
| `dt` | **tenor note** | open notehead with vertical bars on both sides |
| `ds` | **liquescent / small note** | reduced-size notehead; `s` combines with other shapes |

### Examples

```aretino
(g2) d d' dw dt ds
```

Left to right: punctum, virga, quilisma, tenor note, and liquescent/small note — all at the same staff position. Uppercase letters raise a note by an octave; they do not mean virga.

The **virga** often appears automatically on ligature peaks (see the [Ligatures](#11-ligatures--neumes) section), but can also be used manually to indicate the internal grouping of longer melismas.

The **quilisma** always occurs within a ligature:

```aretino
(g2) dfwg
```

Here `w` after `f` indicates that the `f` is a quilisma.

---

## 10. Modifier Suffixes

Combinable suffixes after the notehead, **without a space**:

| Suffix | Name | Meaning |
|---|---|---|
| `.` | **mora** | to the right of the notehead; indicates a long note |
| `_` | **episema** | short horizontal line above the notehead. Consecutive episemata are merged by the system. |
| `-` | **ictus** | small vertical line above the notehead (in the space) |
| `~` | **plica** | small "tail" at the upper right of the notehead |
| `s` | **liquescent / small** | reduced-size notehead; combines with punctum, virga, quilisma, or tenor |

```aretino
(g2) d d. d_ d- d~ ds d_e_d_
```

Modifiers can be combined freely: for example, `d._`, `d-~`, or `d's`.

---

## 11. Ligatures — Neumes

Notes written **consecutively without a space** form a ligature (neume). This is one of the most fundamental mechanisms in Aretino.

| Source | Name | Meaning |
|---|---|---|
| `df` | **podatus** | ascending two-note figure, with an arc from lower to upper |
| `fd` | **clivis** | descending two-note figure, with a calligraphic curved line |
| `dfd` | **torculus** | three-note: up-down |
| `fdf` | (valley three-note) | down-up — rendered as a unique ligature |
| `dfgf` | longer neume | arbitrarily long ligature |

### Single Note vs. Ligature

```aretino
df fd dfd fdf dfgf
```

- `d f g` → three **separate** punctums (separated by spaces).
- `df g` → one **podatus** (`df` together), then a separate `g`.
- `dfg` → one **three-note ligature** (torculus-like, ascending twice).

```aretino
d f g | df g | dfg
```


### Automatic Virga on Peaks

The renderer automatically places a virga stem on every ligature peak (local maximum) — this need not be marked manually. For example, with `dfd` (torculus), the `f` (peak) is automatically drawn with a virga stem.

```aretino
dfd ihgfghghjijigh
```

## 12. Neume-Separator Gap

The `/` (slash) inserts a **small breathing gap** within a ligature — making the internal grouping of the melisma visible. The notes before and after `/` still **belong to one ligature**; they are merely visually separated.

```aretino
(g2) fefdc.efdc./feg.gggee/cededdc. c

```

You may put spaces around `/`; they are ignored. The slash is still a visual separator inside the same ligature, not a new syllable by itself.

---

## 13. Bar Lines and Dividers

| Source | Name | Function |
|---|---|---|
| `,` | short bar line (quarter bar) | small caesura, breath |
| `;` | half bar line | end of a phrase section |
| `\|` | full bar line | end of a sentence |
| `\|0` | empty bar | invisible divider with full-bar spacing |
| `\|\|` | double bar line | end of a section |
| `\|:` | repeat start | beginning of a repeated section |
| `:\|` | repeat end | end of a repeated section |
| `:\|:` | repeat both | repeat end and start at the same point |
| `\|\|\|` | triple/final bar line | classical ending |
| `'` | small breath mark | breath |

```aretino
' , ; | |0 || |: :| :|: |||
```

Bar lines can also be written in parentheses: `(,)`, `(;)`, `(|)`, `(|0)`, `(||)`, `(|:)`, `(:|)`, `(:|:)`, `(|||)` — the effect is the same, but the parenthesized form may be familiar to users of traditional GABC.

If something appears in parentheses in the text, it is aligned under the next bar line; in the example below, `(*)` indicates that an asterisk should be written under the short bar line.

---

## 14. Line-End Justification, Manual Spacing, and Line Breaks

The Aretino renderer tries to distribute neumes/syllables favorably, but sometimes manual intervention is needed.

### Asterisk `*` — Distribution for Justified Lines

The `*` is an empty "flexible" spacer that lets you influence where a justified line has more breathing room:

```aretino
(g2) d f * g h * g (z) f d  (||)
```

Multiple `*` can be used in one line; the remaining space is evenly distributed among them.

### Spacer `(sp)` and `=` — Fixed-Size Gap

If you want a **fixed**-width gap (not flexible like `*`), use the `(sp)` directive. A multiplier can also be given: `(sp2)` = 2× base width, `(sp0.5)` = half width; `=` is equivalent to `(sp)`.

```aretino
(g2) d f (sp2) g = h ==== f
```

### Explicit Line Break `(z)` and `(Z)`

The renderer breaks lines automatically: if a line doesn't fit, it moves the next note to a new line. Explicit line breaks can also be requested:

| Source | Effect |
|---|---|
| `(z)` | forced line break, **justified** — the line fills to the margin |
| `(Z)` | forced line break, **not** justified — the line is left-aligned |

Use the `(z)` form where the end of a phrase naturally calls for a line break.

```aretino
(g2) g h i j (z) g h i j (Z) g h i j ||
```


---

## 15. Accidentals

Accidental tokens use `b / n / #`.

| Source | Name | Meaning |
|---|---|---|
| `(b)` | flat | a single flat at the height of the `i` note (line 3, B note) |
| `(n)` | natural | cancels the preceding alteration |
| `(#)` | sharp | raised by a semitone |

The letter before the accidental gives the staff position: `(eb)` = flat on `e`, `(fb)` = flat on `f`, etc. If the pitch letter is omitted, the accidental appears at the default `i` position, so `(b)` means the same height as `(ib)`.

### Example

```aretino
(g2) (ib) (sp) (in) (sp) (i#) (sp) : h (ib) hih fgh. g(ib)hih
```

Accidentals are kept together with the following neume. They may also be written inside a neume, and an accidental remains active for the same staff position until the next bar line or a replacement accidental. If a measure wraps to a new system, the renderer repeats the active accidental before the first affected neume on the new system.

### Key Signature — `(K:...)`

The key signature is placed after the clef. The renderer automatically displays it after the clef at the beginning of each new line, even if the clef is only written once at the start of the piece.

| Source | Meaning |
|---|---|
| `(K:b)` | flat key signature at the default `i` height |
| `(K:eb)` | flat on the `e` staff position |
| `(K:b eb)` | multiple accidentals — separated by spaces |
| `(K:)` | cancel key signature |

```aretino
%title: Example with Key Signature
%%
(g2) (K:F# C#) d e f g h i j k (||)
```

The key signature is repeated at the beginning of each new line. A subsequent `(K:...)` token changes the key signature from that point (it appears in place, and the new sign also appears at the beginning of subsequent lines). `(K:)` cancels the key signature.

---

## 16. Text, Stanzas, and Verses

### Syllable Alignment

The renderer **automatically aligns** syllables to notes: each syllable is placed under the center of the corresponding neume (or standalone punctum). Hyphenated syllabification (`Ky-ri-e`) marks syllable boundaries; the hyphens between notes appear automatically where there is room.

The rule is simple: **one syllable — one neume or one standalone note**.
A ligature (e.g. `df`) counts as a single unit, so one syllable is assigned to it; a standalone punctum (e.g. `d` with spaces on both sides) also counts as one unit, and one syllable is assigned to it.

The layout algorithm tries to place the text economically and aesthetically. This means that where possible, it tries to merge syllables. Individual syllables are centered under a punctum, and left-aligned under neumes, tenor notes, and mora-marked punctums.

Useful lyric constructs:

| Construct | Meaning |
|---|---|
| space | word boundary |
| `-` | syllable boundary within a word |
| `~` | non-breaking space inside one syllable |
| `~~` | display text plus separate alignment text |
| `*` | literal verse-division asterisk |
| `(text)` | label centered under the next bar line |

### Multiple Stanzas

Multiple `w:` lines can be written under the melody line — each new line is a stanza:

```aretino
(g2) d c d f g f e d. ,
w: Vic-ti-mae pas-cha-li lau-des
w: Praise to the Pas-chal Vic-tim now.
```

### Psalm Verses (`W:`)

Use `W:` for psalm-verse style text that should flow freely instead of syllable-by-syllable note alignment. It automatically indents explicit and automatic line breaks. Formatting directives can be used as well.

```aretino
(g2) f g A f. , gA g f d_c_ , f gA gf f. ||
w: Al-le-lu-ia, (*) al-le-lu-ia, al-le-lu-ia.
W: Glory to the {Father} and to the [Son] * 
and to the Holy Spirit.
W: As it was in the beginning, is now and ever shall be * 
world without end. Amen.
```

### Multiple Words on One Note (`~`)

If multiple words need to be written **on a single note** — for example, under a reciting tenor note — connect them with `~` without spaces. It renders as a non-breaking space, so the whole unit stays attached to one neume:

```aretino
(g2) f g ht g h :
w: God is Lord,~King~of~all, praise him!
```

The `~` sign can also be used as a blank placeholder to skip notes, leaving text out:

```aretino
f g ; h g
w: ~ ~ text
```

### Writing one musical line as multiple input lines

You can use the `n:` (as in _notes_) prefix to continue the previous music line. This allows you to write one measure per line for easier editing.

```aretino
(g2) (K:b) 
cf f f fghigf fj jklmkj j , 
w: {V}a-dis,~{*} pro-pi-ti-á-tor, 
n: fj j jk k kj j hijih gh igf ; 
w: ad im-mo-lán-dum pro ó-mni-bus. 
% bar #3 
n: f hi j i ji h ijijkjih ghgf , 
w: Non ti-bi oc-cúr-rit Pe-trus, 
```

### Stanza Numbering and Alignment Text

To avoid disrupting text layout with stanza numbers, R., V., or other markings, use `~~`. The text before `~~` is displayed as a prefix, while the text after `~~` is the part used for horizontal alignment. For the first stanza, manual spacing may still be needed.

```aretino
(g2) == g g h g gj j. ' jt
w: 1.~~Glo-ry to the Fa-ther (†) and~the~...
```

### Special Characters
Some characters are rendered specially.

```aretino
c d e f
w: \R \V + ++
``` 

### Text Formatting

Simple formatting marks can be placed in `w:` and `W:` lines:

- `[text]` — <ins>underline</ins>
- `<text>` — *italic*
- `{text}` — **bold**
- `\red{text}` — red colored text
- `\color:green{text}` — green colored text
- `\X` — escape a special character, e.g. `\{`, `\<`, or `\\`


```aretino
(g2) g h i g. hi h g e_d_ , g hi Ag g. ||
w: {\R.}~~Al-le-lu-ia, <al-le-lu-[ia]>, al-le-lu-ia. (\red{{2x}})
```

---

## 17. Longer Examples

### Simple Kyrie

```aretino
%title: Lord, have mercy (XVI.)
%%
(g2) (K:ib) h h h g h fg h ||
w: Lord, have mer-cy up-on us! (<3x>)

h h h g h fg h ||
w: Christ, have mer-cy up-on us! (<3x>)

h h h g h fg h ||
w: Lord, have mer-cy up-on us! (<2x>)

h g i g f gh h ||
w: Lord, have mer-cy up-on us!
```

**What can be observed here?**

- The clef only needs to be given in the first line — the renderer places it automatically at the beginning of new systems.
- Blank lines **start a new section**.
- Text is aligned under the bar line.

## 18. Parenthesized Notes

Wrapping one or more notes (or a whole neume) in `[` … `]` renders **typographical parentheses** around them. This is used for optional notes — for example, notes sung only on certain occasions.

| Source | Meaning |
|---|---|
| `[h]` | single note in parentheses |
| `[hg]` | ligature (neume) in parentheses |
| `[h i j]` | multiple tokens in parentheses (spaces allowed) |

```aretino
(g2) d [h] g [hg] d [h i j] g
```

---

## 19. Spanning Marks

Music-line braces draw a visual mark above a span of notes. This is different from lyric text, where `{text}` means bold.

| Source | Meaning |
|---|---|
| `{ g h i }` | curly overbrace above the notes |
| `\arc{ g h i }` | smooth arc above the notes |
| `\line{ g h i }` | straight line above the notes |
| `{ g h i }"1."` | overbrace with a label |

```aretino
(g2) { g h i j }"melisma" \arc{ h i j } \line{ j k l m }
```

Spanning marks can cross automatic or explicit system breaks; the renderer continues the mark on the next row.

---

## 20. Labels

A **label** is a short text displayed above a note or neume. Place a double-quoted string immediately after the note or ligature, without a space:

```aretino
(g2) hg"Label" d f"\red{{!}}" gh"2x"
```

Labels can be any (optionally formatted) text; they are rendered above the corresponding note or ligature.

---

## 21. Embedding in Markdown

Hosts that support Aretino-in-Markdown recognize fenced code blocks tagged `aretino`:

````markdown
```aretino
(g2) g h i ||
```
````

Some hosts also accept layout options after the language tag:

````markdown
```aretino fixed width=18cm
(g2) h h h g h j i g h. ||
w: O Lord, hear my hum-ble call to you!
```
````

| Option | Meaning |
|---|---|
| `fixed` | non-responsive layout; line breaks stay fixed |
| `width=Ncm` / `width=Nmm` | physical target width, used with `fixed` |

For source-level renderer settings, prefer repeatable `%option:` headers inside the Aretino source.

---

## 22. Getting Help and Support

If you have a question, find a bug, or want to share feedback, please use the **GitHub repository**:

- **Questions and general discussion** — [GitHub Discussions](https://github.com/aretino-chant/aretino-chant/discussions): ask how something works, or start a conversation about the format.
- **Bug reports and feature requests** — [GitHub Issues](https://github.com/aretino-chant/aretino-chant/issues): if the renderer produces unexpected output or you think something is missing, open an issue with a short example that reproduces the problem.

Aretino is a volunteer project by people who love liturgical music — your patience and encouragement are very welcome. There is no mailing list or forum — GitHub is the single place for all support.
