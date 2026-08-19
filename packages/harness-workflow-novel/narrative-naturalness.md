# Narrative Naturalness Review and Repair

## Purpose

Protect reader-facing narrative naturalness by finding and repairing over-explained, over-managed, repetitive, or character-incongruent prose structures.

This protocol does **not** attempt to identify whether text was written by AI or a human. Detector probability and authorship guesses are not quality evidence.

## Review order

Use a fresh read before naming a defect family.

```text
uninterrupted read
-> mark friction windows
-> reread local context
-> classify likely cause
-> test counterexamples / deletion
-> decide whether the effect is material
```

Starting from a checklist and hunting for every named pattern tends to create false positives.

## Form is not a verdict

None of the following is independently proof of naturalness or artificiality:

- short or long sentences;
- complete or fragmentary sentences;
- conversational or formal language;
- ellipsis/interjection usage;
- smooth transitions;
- paragraph length;
- first- or third-person narration.

Judge whether the realization belongs to the current narrator, character attention, scene pressure, and information state.

## Common defect families

### `EXPLANATION_ECHO`

Action, dialogue, image, or thought already conveys the meaning and a following sentence translates the same meaning again without adding material information or voice.

### `SEMANTIC_CLOSURE_LOCK`

Beats repeatedly end by stating the emotional/relational/theme answer instead of leaving already-legible meaning for the reader to infer.

### `POV_OR_EMOTION_SIGNPOST`

Narration repeatedly explains that viewpoint/emotion/topic is changing when context already carries the shift.

### `SLOT_COMPLETION`

A beat receives more signals than it needs because the prose appears to fill a template: thought + gesture + interjection + dialogue + explanation even when one or two signals already do the work.

### `SYNTHETIC_VARIATION`

Surface wording changes while the underlying sentence/beat architecture repeats mechanically.

### `EXAMPLE_SHADOWING`

An example from guidance/review is treated as approved wording/cadence and near-paraphrased instead of re-solving the current scene.

### `AUTHORIAL_MIND_READER`

A focalized character appears to think a summary that mainly exists to organize information for the reader rather than because it follows from that character's current attention/knowledge.

### `GENERIC_EMOTION_LABEL`

An emotion label repeats what the reader already receives from behavior, dialogue, image, or thought without adding new judgment/voice.

### `BALANCED_VERDICT`

Complexity is repeatedly closed with symmetrical formulations when the scene does not need that explicit adjudication.

### `TRANSITION_BRIDGE_DEPENDENCE`

Every scene/topic/POV shift requires an explanatory bridge even when the narrative grammar already makes the move legible.

### `BEAT_RECIPE_LOCK`

Materially different scenes repeat the same functional sequence of observation, interpretation, reaction, and closure.

### `OVERPOLISHED_LOCAL_COHESION`

Every sentence explicitly inherits and resolves the previous sentence's meaning, removing useful omission, jump, interruption, or character-driven attention change.

## Character-attention test

For suspicious narration/thought, ask:

1. What is the focalizer noticing, wanting, avoiding, or doing now?
2. Does this sentence naturally arise from that attention?
3. Does it exist mainly to prevent reader ambiguity that the surrounding scene already resolves?
4. Does the language fit the focalizer's knowledge and voice?

## Deletion / counterfactual test

Mentally remove or compress the suspicious sentence/window.

- If meaning/causality/character choice remains and the passage reads more naturally, the defect hypothesis strengthens.
- If important information, rhythm, or voice disappears, the hypothesis weakens.
- If the surrounding sentences must change too, treat it as a beat/paragraph/scene-window defect rather than a line-edit problem.

Deletion is a diagnostic, not an automatic edit command.

## Recurrence and false-positive guards

A single instance may be purposeful. Recurrence across the local scene/episode is stronger evidence than one sentence.

Do not use these shortcuts:

- fragments are automatically human;
- complete sentences are automatically artificial;
- slang/interjections automatically improve naturalness;
- smooth prose is automatically artificial;
- random reordering creates authenticity;
- deliberate formality/dryness is wrong when narrator/genre/scene function supports it.

## Repair principle: re-realize, do not cosmetically humanize

When the defect is structural, repair the causal realization unit rather than synonym-swapping one flagged line.

Possible repair scopes:

- one beat;
- a paragraph cluster;
- a short scene window.

Possible operations are a palette, not a checklist:

- remove redundant explanation;
- change information order;
- keep one of two redundant signals;
- move a thought into action/dialogue/silence or the reverse;
- combine or split sentences when scene rhythm warrants it;
- omit an unnecessary bridge or closure;
- re-write the beat from current character attention/voice;
- leave a direct complete sentence when it is the most natural choice.

Do not deliberately inject mistakes, slang, fragments, randomness, or punctuation noise to imitate a human author.

## Examples are not surface authority

Unless a project explicitly promotes example wording into canon/style authority, examples in guidance/review illustrate a function only. Their wording, cadence, punctuation, sentence length, and order do not need to be preserved.

## Fresh recheck after repair

After revision:

1. read the changed window continuously as if new;
2. assess reader friction before consulting the old finding list;
3. then compare against the prior defect family and continuity/POV/canon requirements;
4. freeze the new exact candidate;
5. invalidate the prior naturalness verdict and request fresh independent review.

Writer self-read is useful preflight evidence, not an independent PASS.

## Repeated same-family failure

If materially different exact candidates repeatedly reproduce the same defect family, stop infinite local patching. Diagnose higher causes such as rule overload, narrator/style resolution, example overfitting, generation-window scope, context contamination, or weak whole-read validation.

A process/guidance diagnosis is not permission for the reviewer to become the Writer or to self-adopt a new rule.

## Scope boundary

This protocol is public and content-neutral. It contains no private style threshold, project-specific prose/canon, business rule, explicit-content mechanic, or detector-evasion recipe. Private/custom genre methodology may layer above it without changing these baseline semantics.
