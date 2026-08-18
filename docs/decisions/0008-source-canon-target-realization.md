# Decision 0008 — Translation preserves source canon while target-language realization remains language/project-specific

- Status: Proposed candidate pending independent review/adoption
- Date: 2026-08-16
- Owner: #33

## Context

A translation system can fail in two opposite directions:

1. literal surface copying preserves source sentence shape but produces unnatural target-language prose and loses language-specific relationship/register cues;
2. aggressive localization produces fluent prose but silently changes source facts, ambiguity, POV, agency, relationship/power, consent/coercion meaning, terminology, or canon.

Different languages also express information differently through subject/pronoun omission, honorifics, tense/aspect, definiteness/gender/number, word order, dialogue punctuation, sentence endings, sound symbolism, idiom, and genre/register conventions. Encoding one universal translation style would flatten both languages and projects.

Long translation/review work may also span bounded chat/runtime slices, so translation should reuse the adopted execution-budget/resumability semantics rather than define its own timeout model.

## Decision

1. **Source canon remains authoritative.** Translation produces a derived target artifact and never silently edits source canon.
2. **Exact source provenance is first-class.** A target candidate records the exact source-unit identity/digest plus control/snapshot context when available.
3. **Semantic fidelity and target realization are distinct checks.** Faithfulness does not require source-grammar mimicry.
4. **Target-language realization may restructure form** when source meaning/project effect is preserved: syntax, clause boundaries, pronouns/subjects, honorifics, punctuation, idiom, rhythm, tense/aspect, register, and similar language-specific features may differ.
5. **Language profiles are selectors/risks, not universal styles.** Shared language-specific rules require evidence beyond one consumer/project/language pair.
6. **Project translation decisions stay local.** Names, terminology, glossary, relationship/honorific strategy, project voice, content/canon boundaries, and publication rules remain project/consumer overlays.
7. **No new authority layer.** Translator is a Worker specialization; Translation Reviewer is an Independent Reviewer specialization; existing adoption/publication authority remains controlling.
8. **Material source/effective-context drift invalidates affected translation evidence.** Prefer source-unit digest/context checks so unrelated repository drift does not invalidate unchanged translations unnecessarily.
9. **Translation can span bounded semantic slices** using `protocol/execution-budget-resumability` and `protocol/checkpoint-handoff`; `SLICE_COMPLETE != UNIT_COMPLETE != WORK_COMPLETE`.
10. **One bounded canary precedes bulk rollout.** A new project/language workflow should first demonstrate exact-source fidelity, target-language quality, review, stale-source recovery, and resumability before broad automation.
11. **No style-imitation corpus or provider lock-in.** External exemplars/research respect copyright/provenance and are not a substitute for source/project truth.

## Consequences

### Benefits

- preserves canon/meaning without forcing unnatural literal prose;
- makes language-specific behavior explicit without hard-coding one language as default;
- supports exact stale-translation detection and incremental retranslation;
- reuses existing Worker/Reviewer/adoption governance;
- supports long translations across chat/runtime slices;
- provider-neutral and usable without a Harness Engine.

### Drawbacks / risks

- effective translation context (profiles/glossaries/project overlays) adds maintenance state;
- semantic fidelity vs naturalness requires judgment and may not be deterministically measurable;
- language profiles can overfit or become prescriptive style guides;
- material source changes can invalidate reviewed target units;
- canary/review gates slow bulk translation rollout.

### Mitigations

- persist only project decisions and language risks that materially affect continuation/review;
- keep language profiles scoped and evidence-backed;
- use exact source-unit identity/digest to avoid unnecessary invalidation;
- preserve one existing adoption lifecycle rather than translation-specific authority states;
- start with one project/language/unit and expand only after effect evidence.

## Alternatives considered

### Literal sentence-by-sentence translation as default

Rejected. Easy to reason about mechanically but produces target-language calques and can lose relationship/register effects encoded differently across languages.

### Free localization without exact source tracking

Rejected. Fluency cannot justify silent canon/semantic drift, and updates become difficult to reconcile.

### New Translator / Translation Reviewer authority classes

Rejected. They are role specializations of existing Worker/Independent Reviewer semantics; adding authority levels would duplicate governance.

### Universal language-style templates

Rejected. Language-specific risks are useful, but one style template would over-generalize across genre, narrator, project and locale.

### Enable bulk automatic translation immediately

Rejected. One bounded canary is lower-risk and provides effect/failure evidence before scaling.

## Validation / falsifier

The decision is supported if a bounded canary can:

- preserve source facts/POV/ambiguity/relationship/consent meaning;
- produce target-language-natural prose without source-grammar artifacts;
- maintain glossary/voice consistency;
- detect and recover from material source-unit changes;
- pass a distinct exact-source/target Translation Review;
- resume across bounded slices without full transcript dependence.

Narrow or supersede the model if it causes substantial profile/glossary overhead without reducing translation defects, routinely invalidates unaffected units, or produces systematic voice flattening/calque drift.

## Operational mapping

The canonical operational semantics are mapped to:

- `standard/protocols/translation-localization.md`;
- `standard/checklists/translation-review.md`;
- existing `role/worker`, `role/independent-reviewer`, `protocol/adoption-lifecycle`, `protocol/execution-budget-resumability`, and `protocol/checkpoint-handoff` where referenced by those resources.
