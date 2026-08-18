# Translation Review Check

Resource ID: `checklist/translation-review`

Before an Independent Translation Reviewer reports `REVIEW_PASSED` for a material target-language candidate, verify the applicable subset of:

- **Exact source** — the reviewed source unit/path/object and source-unit digest/content identity are known as precisely as the runtime permits; the Reviewer is not reviewing against memory or an unspecified source version.
- **Effective translation context** — target language/locale and material source-language considerations, target-language profile, project overlay/glossary, content/canon boundaries, and publication constraints are identified and current.
- **Candidate identity** — the exact target artifact/candidate identity is frozen; source/profile/overlay/target drift that can affect fidelity or target realization invalidates the verdict unless a documented freshness check proves no impact.
- **Source vs target authority** — the target is a derived artifact; translation work has not silently rewritten source canon or expanded publication authority.
- **Semantic completeness** — no material event, fact, quantity, condition, negation, chronology, causal relation, callback, or continuity anchor was omitted, invented, or reversed.
- **POV / uncertainty** — focalization, knowledge limits, inference-vs-fact, intentional ambiguity, unreliable narration, and material omission/indirection remain faithful.
- **Agency / relationship semantics** — agency, relationship/power state, consent/coercion meaning, emotional/state changes, and identity facts were not softened, strengthened, normalized, or otherwise changed by fluent wording.
- **Terminology** — proper names, transliteration, glossary terms, titles/roles, invented terms, keep-untranslated items, and context-dependent terminology are current and internally consistent.
- **Target-language realization** — grammar, idiom, collocation, sentence/clause structure, punctuation, paragraphing, dialogue conventions, pronoun/subject handling, honorific/address strategy, tense/aspect, rhythm, and register are natural for the target language/locale and project.
- **No source-grammar mimicry** — apparent fidelity is not being achieved by unnatural calques, punctuation copying, source word order, or sentence-shape imitation where target-language realization should differ.
- **Project voice** — target prose preserves the project's character/narrator/genre effect without promoting one consumer voice into a shared language rule.
- **Cross-unit continuity** — neighboring translated units do not contradict established terminology, names, relationship speech strategy, or continuity when the review scope includes cross-unit effects.
- **Freshness / staleness** — **every source-unit digest/content-identity change** has triggered a freshness re-evaluation, including punctuation/rhythm/voice/register or other realization-relevant changes with no obvious plot/factual delta. Prior target/review evidence is retained after a changed source only when a documented no-impact check establishes that the delta cannot affect semantic fidelity or target realization. Unrelated repository/control drift alone does not invalidate an unchanged exact source unit without reason.
- **Validation truthfulness** — semantic/terminology/tool checks are described accurately; unavailable/skipped/incomplete checks are not PASS.
- **Independence** — the Reviewer is distinct from the Translator/Producer for material work and has sufficient source-semantic plus target-language capability/evidence for the claim.
- **Bounded execution** — if review spans multiple session slices, `protocol/execution-budget-resumability` and `protocol/checkpoint-handoff` preserve exact reviewed ranges/candidate identities; `SLICE_COMPLETE` is not a final verdict.
- **Privacy / copyright** — shared checkpoints do not persist private source/target text unnecessarily; external exemplars/research are rights/provenance safe and are not used as a style-imitation corpus.
- **Authority** — `REVIEW_PASSED` routes to the existing project/adoption/publication authority; it does not publish or release the translation.

If the Reviewer cannot inspect the exact source, cannot establish sufficient source-semantic/target-language competence/evidence, or cannot verify the current effective translation context where it materially affects fidelity, return `REVIEW_BLOCKED` rather than a guessed PASS.

This checklist supplements `checklist/pre-adoption-review`; it does not create a second adoption lifecycle.
