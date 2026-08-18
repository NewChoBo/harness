# Translation and Localization

Resource ID: `protocol/translation-localization`

## Purpose

Produce a target-language artifact that is faithful to the exact source semantics/canon while reading as intentional, natural writing in the target language and locale.

Translation is not source rewriting. The source artifact remains authoritative for its own content unless a separate authorized source change is adopted. The target artifact is a derived candidate with explicit source/effective-context provenance.

This protocol is provider-neutral. It does not require a specific machine-translation model, translation API, Engine, or provider.

## Role mapping

Translation does not create a new authority level.

- **Translator** — a specialization of `role/worker`; produces the target-language candidate and performs Worker self-check/QA.
- **Translation Reviewer** — a specialization of `role/independent-reviewer`; independently reviews the frozen target candidate against the exact source and effective translation context.
- **Adoption / publication authority** — remains the existing consumer/project authority. Translation review does not authorize publication.

A Translator must not independently pass/adopt its own material target candidate.

## Required inputs

Before material translation, resolve the applicable subset of:

- trusted source control/repository/snapshot identity;
- exact source unit identity — path/object ID and digest or equivalent immutable identity when available;
- source language and target language/locale;
- source canon/project/content boundaries;
- target artifact scope/path/owner;
- project-local translation overlay/glossary when present;
- source-language considerations and target-language profile when they materially affect realization;
- required validation/review/publication gates;
- `protocol/execution-budget-resumability` when the translation/review may exceed one safe execution slice.

Provider or model name is not translation quality, language competence, or authority proof.

## Effective translation context

Conceptually compose:

```text
exact source canon / source-unit identity
+ source-language considerations when material
+ target-language profile / locale conventions
+ project translation overlay / glossary
+ task/unit constraints
= effective translation context
```

The exact storage representation is consumer/runtime-specific and provisional.

Apply the established Harness overlay precedence only inside authority already delegated to the overriding layer. A project/task overlay may validly narrow or replace a language-profile default within its delegated translation scope, for example through a project glossary or dialogue convention. Precedence never grants authority to change reserved source facts/canon, project content boundaries, relationship/consent meaning, release/publication authority, or other non-overridable constraints.

If an overlay requests behavior outside its delegated scope, attempts to weaken a reserved invariant, or a material contradiction remains unresolved after valid precedence is applied, stop with a precise conflict/handoff rather than choosing the newest prompt by default.

## Source preservation set

Unless the authorized source/project explicitly allows adaptation, preserve the decision-relevant subset of:

- factual and canonical events;
- chronology, causality, conditions, quantities, and negation;
- POV/focalization and what each character/narrator knows or only infers;
- uncertainty, intentional ambiguity, unreliable-narrator distinctions, and unresolved questions;
- character identity, relationships, power state, agency, consent/coercion semantics, and material emotional/state changes;
- world/project terminology and proper-name identity;
- promises, callbacks, motifs, continuity anchors, and scene/episode state delta;
- content/safety boundaries and age/identity facts where material;
- intentional omission or indirection when it carries meaning.

Do not improve target fluency by silently resolving an ambiguity the source deliberately leaves open, changing agency, making inference factual, softening/strengthening consent, changing plot facts, or inventing explanation.

## Target-language realization

Faithfulness does **not** require source-sentence mimicry. When semantics and project voice are preserved, the Translator may adapt target-language form as needed, including:

- sentence/clause boundaries and local ordering;
- explicit vs omitted subjects/pronouns;
- tense/aspect/modal realization;
- honorifics, politeness level, address forms, titles, and relationship-marking conventions;
- dialogue punctuation/quotation conventions;
- idiom, collocation, contractions, discourse markers, and natural connective structure;
- onomatopoeia/sound-symbolic realization;
- paragraphing and rhythm where target-language readability requires it;
- register and genre conventions appropriate to the target project/audience;
- lexical repetition vs variation when the source effect can be preserved more naturally by a different target-language pattern.

Do not calque the source grammar or punctuation merely to look faithful.

If a source feature has no clean target equivalent, preserve the semantic function first and record a material translation decision when later review/continuity depends on it.

## Language profiles

A language profile may document **known realization choices, risks, and review selectors**, such as:

- pronoun/subject omission or obligatory expression;
- honorific/politeness systems;
- tense/aspect differences;
- word order and information structure;
- dialogue punctuation and typography;
- gender/number/definiteness marking;
- idiom/collocation hazards;
- sound symbolism/onomatopoeia;
- sentence-ending/rhythm conventions;
- genre/register conventions;
- recurring false-friend or calque risks.

A profile is not a universal style template and must not encode one project's voice as a language default. Language-specific shared rules require evidence beyond one project or one translation pair before promotion.

Do not create a general-purpose LanguageProfile DSL in v0.x. Narrative or simple declarative profiles are sufficient until repeated machine-interoperability needs justify stronger structure.

## Project translation overlay / glossary

Keep consumer/project-specific translation decisions local, including where applicable:

- canonical translated names and transliteration;
- terms that remain untranslated;
- context-dependent terminology;
- character-specific address/honorific strategy;
- project voice/register constraints;
- title/role rendering;
- invented-language/setting terminology;
- known forbidden mistranslations or ambiguity traps;
- publication/locale requirements.

A shared Harness must not become a consumer glossary database.

Glossary entries do not override source semantics. If the glossary conflicts with the exact source or current project canon, report/reconcile the conflict.

## Translation workflow

A normal material unit follows:

```text
RESTORE exact source + effective translation context
→ choose bounded source/target unit
→ semantic / preservation map when useful
→ DRAFT TRANSLATION
→ TARGET-LANGUAGE REALIZATION PASS
→ TRANSLATOR QA / Agent Self-Check
→ freeze target CANDIDATE_READY with source/effective-context identity
→ fresh Independent Translation Review
→ REVIEW_PASSED | CHANGES_REQUIRED | REVIEW_BLOCKED
→ existing Adoption / Publication Authority
→ effect validation when material
```

A semantic map need not become a large permanent artifact. Persist only decisions/ambiguities/terminology that another run/reviewer actually needs.

Translation completion is not publication. `REVIEW_PASSED` is only eligibility for the consumer's normal adoption/publication process.

## Bounded execution and resumability

Use `protocol/execution-budget-resumability` for long translation/review work.

Useful semantic slices may include:

- one episode, chapter, section, scene, document section, or other coherent source unit;
- source semantic/preservation mapping for that unit;
- translation draft for a bounded unit;
- target-language realization/QA pass;
- exact-candidate independent translation review.

Do not split a unit at an arbitrary token/minute boundary when doing so would destroy discourse context, dialogue relationship cues, terminology consistency, or reviewability. If a large unit must span slices, checkpoint the exact completed range plus only the neighboring context/terminology/ambiguity state needed to resume.

`SLICE_COMPLETE != UNIT_COMPLETE != WORK_COMPLETE`.

## Provenance and source freshness

A material target candidate should identify, as precisely as the consumer/runtime permits:

- exact source unit path/object identity;
- exact source-unit digest/content identity when available;
- source control/snapshot identity;
- target language/locale;
- material language profile / project overlay / glossary identity when applicable;
- target candidate identity;
- validation/review evidence.

Prefer source-unit identity/digest for staleness decisions so unrelated repository changes do not invalidate a translation unnecessarily.

### Source-unit drift

A source-unit digest/content-identity change is a freshness trigger. Re-evaluate whether the change can alter semantic fidelity **or target-language realization** before retaining prior target/review evidence.

If the source change can affect any material translation property — including facts, ambiguity, POV, agency, terminology, voice, register, rhythm, punctuation, intentional repetition, discourse effect, or other stylistic function that the target is expected to preserve — then:

- mark the affected target as stale/retranslation or re-review required;
- invalidate review evidence that applied to the prior source/effective candidate;
- update only affected units when dependency/context boundaries permit.

If the exact source-unit content changed but a documented freshness check establishes that the delta cannot affect the target or its reviewed preservation/realization obligations, prior target/review applicability may be retained. Do not infer this merely from unchanged plot facts.

### Non-material control drift

If repository/control SHA changes but the exact source-unit digest and all material effective translation-context identities are unchanged, a freshness check may preserve target/review applicability. Do not invalidate everything solely because an unrelated file changed.

If project glossary/profile/canon changes in a way that can alter the target realization, treat that as effective-candidate drift and re-evaluate the affected target.

## Translator self-check

Before `CANDIDATE_READY`, verify the relevant subset of:

- no material source content was omitted, invented, reversed, or accidentally resolved;
- names/numbers/negation/conditions/chronology are faithful;
- POV, uncertainty, agency, relationship and consent/coercion semantics are preserved;
- glossary/terminology is internally consistent and current;
- target grammar/register/dialogue conventions are natural for the target locale;
- obvious source-language calques and punctuation artifacts were removed unless intentional;
- source and effective profile/overlay identities are recorded;
- target artifact is not being treated as source canon or automatically published;
- validation still unavailable is explicitly reported.

## Independent Translation Review

The Translation Reviewer inspects the actual exact source and target candidate rather than relying on Translator summaries.

Reviewer competence/capability must be sufficient for the claimed review. Target-language fluency alone is not proof of source fidelity; source-semantic access and relevant language/project context must be available directly or through current trustworthy evidence.

Review the applicable subset of:

- semantic/factual fidelity and omissions/additions;
- POV, ambiguity, evidentiality, agency, relationship/power, and consent/coercion semantics;
- target-language naturalness/readability;
- register, dialogue, honorific/pronoun/address strategy;
- terminology/glossary consistency;
- target-language calques, unnatural syntax, typography, or source-language artifacts;
- character/project voice preservation without copying source grammar;
- cross-unit continuity and repeated terminology;
- source/effective-context/currentness identity;
- existing validation evidence and unavailable checks.

Useful verdicts remain the ordinary lifecycle verdicts:

- `REVIEW_PASSED`
- `CHANGES_REQUIRED`
- `REVIEW_BLOCKED`

Do not invent a second translation-specific adoption lifecycle.

## Bridged evidence

A Translation Reviewer may consume current, exact-subject evidence from another tool/runtime, such as terminology checks or source/target semantic comparison, when provenance and limitations are known.

Bridged evidence transfers evidence only. It does not transfer source authority, reviewer independence, adoption authority, or publication authority.

## Effect validation and rollout

Do not treat one successful translation as proof of universal language rules.

**Before bulk rollout or multi-unit expansion for a new project/language workflow, one bounded canary is required.** The canary must include at least:

```text
one project
+ one target language/locale
+ one exact source unit
+ Translator candidate
+ independent Translation Review
+ observed revisions / terminology / naturalness / stale-source handling
```

If the canary cannot establish source fidelity, current terminology/context, independent review, and a resumable/stale-source-safe workflow, do not expand that project/language workflow. Return a precise blocked/narrow/retry state instead.

Potential effect signals include the applicable subset of:

- material semantic-fidelity findings;
- terminology/glossary drift;
- target-language naturalness/calque findings;
- independent-review revision count;
- stale-source detection/recovery success;
- bounded-slice handoff/resume success;
- user intervention needed.

Do not turn these into universal fixed thresholds without evidence. Use before/after and qualitative effect evidence when more meaningful.

Only after suitable evidence should a project translation workflow expand to more units/languages or a language-specific selector be promoted into shared guidance.

## Copyright / privacy / external exemplars

- consumer-private source text and translations remain in the consumer's authorized store;
- shared Harness checkpoints/resources do not persist private manuscripts/documents merely for translation convenience;
- external language exemplars/research must respect access and copyright constraints;
- do not build a long copyrighted prose corpus or style-imitation workflow under the guise of language profiling;
- store only the bounded evidence/annotation needed for the translation decision.

## Completion

A translation unit is complete only when its exact target artifact is tied to the current exact source/effective translation context, required Translator QA is truthful, the applicable independent review/adoption stage is unambiguous, and another session can resume/update the unit without the full prior transcript.

A published/localized artifact additionally requires the consumer's existing publication/release authority; this protocol never grants it.
