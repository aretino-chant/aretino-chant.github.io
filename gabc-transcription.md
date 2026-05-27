---
layout: doc
title: Online GABC editor alternative
description: Paste Gregorio GABC, transcribe it into Aretino notation, edit Gregorian chant in the browser, and preview the score instantly.
aside: false
pageClass: gabc-page
head:
  - - link
    - rel: canonical
      href: https://aretino-chant.github.io/gabc-transcription
  - - meta
    - name: keywords
      content: GABC editor, online GABC editor, Gregorio GABC, GABC converter, Gregorian chant editor, chant notation editor, Aretino
  - - meta
    - property: og:title
      content: Online GABC editor alternative | Aretino Chant
  - - meta
    - property: og:description
      content: Paste Gregorio GABC, transcribe it into Aretino notation, edit Gregorian chant in the browser, and preview the score instantly.
  - - meta
    - property: og:url
      content: https://aretino-chant.github.io/gabc-transcription
---

<section class="gabc-landing">

<p class="gabc-landing__eyebrow">For Gregorio and GABC users</p>

# Online GABC editor alternative

Paste Gregorio GABC, transcribe it into Aretino notation, edit the result in
your browser, and preview a Gregorian chant score instantly.

Many singers, editors, and libraries already have useful chant material encoded
in Gregorio GABC. This page is a practical bridge from that existing work into
Aretino: it gives a first transcription that can be reviewed, adjusted, and sung
in Aretino's performance-oriented notation, without asking users to retype an
entire repertory from the beginning.

<div class="gabc-landing__actions">
  <a class="gabc-landing__button gabc-landing__button--primary" href="#try-the-gabc-tool">Try the GABC tool</a>
  <a class="gabc-landing__button" href="/editor">Open the Aretino editor</a>
</div>

<div class="gabc-landing__grid">
  <section>
    <h2>Convert existing GABC work</h2>
    <p>Bring in antiphons, hymns, psalm tones, and other chant material already
    stored as <code>.gabc</code> source.</p>
  </section>
  <section>
    <h2>Edit in plain text</h2>
    <p>Review the Aretino transcription directly, using a readable text notation
    designed for chant performance.</p>
  </section>
  <section>
    <h2>Preview in the browser</h2>
    <p>Render the transcribed score client-side without installing Gregorio,
    LaTeX, fonts, or a desktop editor.</p>
  </section>
</div>

## Try the GABC tool

<GabcTranscriptionTool />

## Is this a GABC editor?

It can be used by people looking for an online GABC editor, but it is more
specific than a full Gregorio editor. You paste GABC on the left; Aretino
transcribes it into its own notation on the right; the score preview is rendered
from the Aretino transcription.

If your goal is a final Vatican-style GregorioTeX PDF, keep using the official
[Gregorio](https://gregorio-project.github.io/) toolchain or one of the online
Gregorio services listed on [GregoWiki](https://gregoriochant.org/). If your goal
is a browser-based chant editor with a lighter plain-text format and immediate
score preview, Aretino is worth trying.

## Transcription, not conversion

Moving a chant from GABC into Aretino is not just a change of file format. It is
closer to a musical transcription: the source notation is interpreted according
to the practical purpose of the target notation.

GABC is excellent at describing Gregorian notation as it appears in the world of
Gregorio, printed Vatican-style books, and manuscript-informed editions. It can
carry many signs whose purpose is partly typographic, partly historical, and
partly interpretive. Some of those signs are meant to reproduce the look of a
particular notation tradition. Others may point toward rhythmic nuance, melodic
gesture, articulation, or a school-specific reading of a source.

Aretino has a different center of gravity. It is aimed at sung performance: by
the faithful, by parish choirs, and by professional or semi-professional
scholae. Its notation should be clear enough for intermediate classically
trained singers to read without first becoming specialists in every layer of
Gregorian paleography. The score should invite a living performance, not force a
single scholarly interpretation onto every singer before rehearsal has even
started.

For that reason, transcription into Aretino intentionally simplifies. Debated,
doubtful, or highly theory-dependent performance markings are not always carried
over as visible obligations. That is not a loss of musical seriousness. It is a
decision to leave certain matters where they often belong: with the performers,
who can choose a tasteful rhythmic and expressive realization according to the
church, the acoustic, the singers present, the congregation, the text, and the
chant tradition they follow.

At the same time, Aretino is not a flattened modern staff transcription. It keeps
the notational elements that are crucial for performance and for the
modernized Metz-Gothic way of reading Gregorian melody: neume grouping, text
alignment, accidentals, bar signs, mora, episema, quilisma, ictus, plica,
liquescent small notes, and other marks that performers may choose to make
rhythmically significant.

The result should be a score that is musically responsible but usable. A trained
schola can still make refined decisions from it. A lay schola can still consume
it quickly. The same Aretino transcription can therefore serve a wide practical
range: it preserves the information needed for chant performance while removing
visual and interpretive density that would otherwise make the page harder to
sing from.

## Common searches this page answers

People often arrive here while looking for a GABC editor, a GABC converter, a
Gregorio alternative, or a Gregorian chant notation editor that works online.
Aretino does not replace every part of the Gregorio ecosystem, but it gives GABC
users a fast way to reuse existing chant source in a browser-native notation
workflow.

</section>
