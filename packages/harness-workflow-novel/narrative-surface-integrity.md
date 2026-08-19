# Narrative Surface Integrity

## Purpose

Protect the boundary between information used to produce a narrative and information that can legitimately appear in the published narrative.

A Writer may use metadata, plans, canon indexes, review findings, and control state to make decisions. Those sources do not automatically become facts, objects, memories, or language available to a narrator or character.

## Information planes

Resolve each material fact or object into one plane before using it in story text.

- `PRESENTATION_META` — chapter/episode identifiers, titles, release order, ratings, tags, navigation, publication metadata.
- `PRODUCTION_META` — roadmap entries, beats, review findings, acceptance criteria, task state, source locks, future plans.
- `CANON_LATENT` — true in the setting or design, but not yet observed, reported, inferred, remembered, or otherwise available in the current narrative context.
- `DIEGETIC_OBSERVED` — directly perceived or physically available to the current focalizer.
- `DIEGETIC_REPORTED` — learned through an in-world speaker, document, signal, record, memory, or other established channel.
- `STORY_SURFACE` — words and structures intended to be read as part of the narrative itself.

## Hard publication boundary

`PRESENTATION_META` and `PRODUCTION_META` remain outside `STORY_SURFACE` unless the project explicitly defines an in-world equivalent.

Examples:

- An internal episode code may exist in a filename, index, renderer, or navigation layer. It must not appear inside story prose merely because it identifies the work item.
- A chapter title may be displayed by a publication layer while remaining separate from the diegetic body.
- Roadmap/review/beat/metadata/task concepts may not be naturalized into narration unless story canon itself contains that concept.
- A fourth-wall-aware or metafictional narrator is an exception only when project canon explicitly enables that mode. Default: `META_AWARENESS = false`.

## Diegetic provenance test

Before a fact, object, memory, inference, or label appears in `STORY_SURFACE`, verify:

1. **Source** — where did it come from in-world?
2. **Access** — how did this focalizer obtain or perceive it?
3. **Time** — was it available by this moment?
4. **Retention** — if remembered or carried forward, what preserves it?
5. **Confidence** — is it observation, report, inference, suspicion, memory, or established fact?
6. **Language ownership** — would this narrator or character actually phrase it this way?

A canon fact that has not crossed an in-world information channel remains `CANON_LATENT` and cannot be stated as current character knowledge.

## Local context-continuity test

A fact may have valid provenance and still be inserted at the wrong moment. Check the immediate narrative window:

- **attention chain** — what is the focalizer currently noticing, wanting, avoiding, or doing?
- **object continuity** — where is the object now, who possesses it, and how is it accessed?
- **topic / goal continuity** — does the thought or action arise from the active question or pressure?
- **spatial continuity** — can the character perceive, reach, or move to the relevant place?
- **temporal continuity** — has enough or too much time passed; did a scene cut or memory trigger occur?
- **motivation** — why does this matter now rather than merely because the outline needs it?
- **surviving state** — what bodily, emotional, relational, informational, or material state carries from the previous scene or installment?

This is not a requirement for transition sentences. Hard cuts, surprise, sudden memories, and abrupt scene changes are valid when their trigger or scene grammar is legible.

## Blocking failure families

- `PRESENTATION_META_IN_STORY_BODY` — identifiers or publication navigation appear as narrative content without an explicit metafictional contract.
- `META_TO_DIEGETIC_LEAK` — production/control information is rewritten as if it were in-world knowledge.
- `UNSOURCED_CHARACTER_KNOWLEDGE` — a character knows a fact without an established channel.
- `UNSOURCED_DIEGETIC_OBJECT` — an object appears, moves, or is possessed without physical provenance.
- `NARRATOR_KNOWLEDGE_LEAK` — narration exceeds the resolved narrator/focalizer knowledge contract.
- `CONTEXTLESS_INSERTION` — a valid fact or object appears only because the plan requires it, not because the current scene supports it.
- `CONTEXT_STATE_JUMP` — location, time, body, relationship, object, or knowledge state changes without a legible transition or cause.
- `PRODUCTION_LANGUAGE_LEAK` — evaluation, planning, or verification vocabulary displaces the project’s actual narrative voice.

## Writer self-check

Before freezing a candidate:

1. Separate presentation/frontmatter from story body.
2. Scan story body for internal IDs and production vocabulary.
3. Trace every newly introduced fact/object through a diegetic source.
4. Read the previous surviving-state anchor and the current scene continuously.
5. Run a deletion/counterfactual check on suspicious explanatory insertions.
6. Verify that a context repair changes the scene, action, or access path rather than merely adding a sentence that excuses the leak.

## Independent review gate

A material failure in this protocol blocks narrative acceptance even when style, genre, or continuity specialists otherwise pass.

Review should be bound to the exact narrative candidate and the effective narrator/canon/presentation configuration. Any material story-body or configuration change invalidates the prior verdict.

## Scope boundary

This protocol is public and content-neutral. Sensitive genre mechanics, explicit-content progression, private editorial thresholds, and project-specific character/canon rules belong in private or consumer-owned overlays.
