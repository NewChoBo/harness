# Execution Outcome Receipt

Resource ID: `protocol/execution-outcome-receipt`

## Purpose

Define a compact, provider-neutral semantic receipt for a material Harness run so later recovery, review, and effect evaluation can identify **what exact subject ran, what source/composition governed it, how the bounded work ended, what validation actually occurred, and whether an execution limit was resumable or diagnostic** without storing a transcript or private chain-of-thought.

This protocol complements:

- `protocol/execution-budget-resumability` — truthful capacity/clock evidence and safe bounded stopping;
- `protocol/adaptive-effort-convergence` — proportionate depth, finite passes, marginal-value gates, convergence, and unresolved-at-limit diagnosis;
- `protocol/checkpoint-handoff` — durable persistence and resumable transfer;
- the provider-neutral runtime/evidence contract that may later gain structured Engine/adapter projections.

An outcome receipt is **evidence/provenance**, not authority, adoption, independent review, publication approval, or proof that every self-reported field is externally verified.

## When a receipt is required

Do not emit a durable receipt for every routine execution.

A bounded outcome receipt is required when at least one of these applies:

- the governing workflow/effect owner explicitly requires one;
- the run produced a material candidate, validation/review/adoption transition, blocker, limit exit, or handoff whose state must survive the current execution context;
- another owner/run cannot safely resume without the recorded execution outcome;
- this is the **first selected canary run** whose exact Harness/source/composition and execution-control behavior must be proven durably for effect evaluation.

After the first required canary receipt exists, unchanged later `NO_ACTION` runs remain silent unless a material source/composition/blocker/effect delta occurs or the governing effect evaluation explicitly requires another bounded sample.

Do not create persistence merely to demonstrate that the Harness ran.

## Receipt subject

Bind the receipt to the exact material subject that the claim describes. Record only applicable fields.

Conceptually:

```yaml
kind: ExecutionOutcomeReceipt

executionOutcome:
  executionId:

  subject:
    workItem:
    targetIdentity:
    controlIdentity:
    bindingIdentity:
    effectiveHarnessIdentity:
    effectiveCompositionIdentity:

  sourceEvidence:
    accessState: READABLE | UNAVAILABLE | UNKNOWN
    capabilityLimits: []

  effectContext:
    evaluatedChangeIdentity:
    subjectCurrentness: MATCHED | MISMATCHED | UNKNOWN

  role:
  workflow:
  stage:
  profile:

  budgetEvidence:
    source:
    clock: CLOCK_AVAILABLE | CLOCK_APPROXIMATE | CLOCK_UNAVAILABLE
    targetObserved: true | false | unknown
    ceilingObserved: true | false | unknown

  iteration:
    mode: SINGLE_PASS | FIXED_BOUNDED | ADAPTIVE_BOUNDED
    completedPasses:
    targetPasses:
    maxPasses:

  validation:
    status:
    evidenceRefs: []

  terminal:
    state:
    stopReason:
    residualMaterialWork: true | false | unknown

  limitExit:
    occurred: true | false | unknown
    diagnosisRequired: true | false | unknown
    blockerFingerprint:
    routedTo:

  evidenceRefs: []
```

This is a semantic model illustration, not a frozen YAML schema or machine contract version. A future structured receipt contract may represent or version the same semantics independently under the Harness contract/versioning model.

## Exact identity and freshness

Where material, identify:

- work item or routed goal identity;
- exact target/candidate/artifact identity;
- trusted control/base identity;
- consumer binding identity when one selected the Harness source/composition;
- exact effective Harness/profile/overlay/composition identity that governed the run;
- logical role/workflow/stage;
- evidence references supporting material claims.

A receipt applies only to the exact subject/effective composition it names. If the target, control base, binding, effective Harness, relevant profile/overlay/composition, or evidence materially drifts, the affected receipt becomes stale for claims that depend on the old identity.

Wall-clock ordering alone is not proof that a run consumed a particular Harness change. Subject/currentness must be established from exact identity or another trustworthy provenance mechanism.

## Source access and composition evidence

`sourceEvidence` captures only the bounded facts needed to distinguish a genuinely reconstructed execution from model-memory or stale-prompt fallback.

Useful semantics:

- `READABLE` — the execution context actually resolved/read the claimed authoritative source sufficiently for the stage;
- `UNAVAILABLE` — the required authoritative source could not be read/resolved;
- `UNKNOWN` — the run cannot truthfully establish source access either way.

`capabilityLimits` records only material limitations that changed what evidence/validation/persistence could be produced. It is **not** a second full capability snapshot and should stay small.

A receipt must not claim `READABLE` merely because the source identity appeared in a prompt, binding, scheduler configuration, or prior conversation.

`effectiveCompositionIdentity` should identify or safely summarize the exact shared + domain/project/task composition when that materially affects the claim. Sensitive/private overlay details may remain in a private evidence owner; a shared/public receipt keeps only the non-sensitive identity/provenance needed for the downstream decision.

## Effect subject/currentness

When a receipt is intended to support effect evaluation, identify the evaluated change and whether the consumed subject actually contains it.

Useful bounded results:

```text
MATCHED
MISMATCHED
UNKNOWN
```

- `MATCHED` — exact subject/composition evidence establishes that the evaluated change was actually present/applicable;
- `MISMATCHED` — the run consumed a pre-change, non-containing, stale, or otherwise inapplicable subject;
- `UNKNOWN` — current evidence cannot establish applicability safely.

A `MISMATCHED` or `UNKNOWN` run is not positive or negative effect evidence for the named change merely because it happened after the adoption timestamp.

## Budget evidence truthfulness

Use the vocabulary from `protocol/execution-budget-resumability`.

`budgetEvidence.source` may identify an observed source such as runtime/session/user/controller evidence where useful. Do not infer a limit from provider/product identity alone.

For clock state:

- `CLOCK_AVAILABLE` — reliable enough for the claimed elapsed/target/ceiling observation;
- `CLOCK_APPROXIMATE` — useful only within the documented uncertainty of the source;
- `CLOCK_UNAVAILABLE` — no trustworthy clock evidence for the claimed run.

`targetObserved` / `ceilingObserved` describe whether the corresponding boundary was actually observed for this run.

- use `true` only when evidence supports that the boundary was reached/crossed;
- use `false` only when evidence supports that it was not reached/crossed;
- use `unknown` when the relevant clock/budget evidence is unavailable or insufficient.

Never convert unavailable evidence into `false`, `0`, an invented duration, or a PASS-like signal.

## Iteration evidence

When `protocol/adaptive-effort-convergence` governed the run, record the applicable iteration mode and pass bounds.

Rules:

- `completedPasses` records semantically completed passes, not arbitrary internal thought cycles;
- `targetPasses` and `maxPasses` come from the effective profile/override rather than being reconstructed after the fact;
- `maxPasses` is a safety ceiling, never a desired utilization target;
- do not invent pass counts for work that did not use a meaningful pass model;
- a skipped later pass because the work converged early is not a failure; the terminal stop reason explains why another pass was not justified;
- the receipt does not replace the richer candidate/evidence needed to independently judge whether the pass itself was high quality.

## Validation evidence

Record the validation state actually achieved for the claimed terminal state.

Useful values may include existing workflow/domain states such as:

```text
PASSED
FAILED
INCOMPLETE
UNAVAILABLE
BLOCKED
NOT_APPLICABLE
```

Use the vocabulary already owned by the applicable workflow/domain where possible rather than creating parallel synonyms merely for the receipt.

Rules:

- cancelled, skipped, unavailable, incomplete, or unverified validation is never `PASSED`;
- link exact validation/evidence references when they materially support the receipt;
- receipt persistence does not independently validate its own assertions;
- a self-authored validation field is provenance/evidence and may require independent/tool/provider corroboration before it can justify review/adoption/effect conclusions.

## Terminal state and stop reason

`terminal.state` uses the governing Harness/workflow state such as `NO_ACTION`, `CANDIDATE_READY`, `CHANGES_REQUIRED`, `REVIEW_BLOCKED`, `SLICE_COMPLETE`, `BLOCKED`, or another precise owned state.

`terminal.stopReason` explains the bounded execution-control reason without creating a second lifecycle.

Use this small shared vocabulary when applicable:

```text
STOP_CONVERGED
NO_MATERIAL_DELTA
DIMINISHING_RETURNS
TARGET_REACHED_NO_MATERIAL_CONTINUATION
VALIDATION_FAILED
LIMIT_REACHED_RESUMABLE
LIMIT_REACHED_DIAGNOSIS_REQUIRED
REPLAN_REQUIRED
BLOCKED
HANDOFF_REQUIRED
```

Interpretation:

- `STOP_CONVERGED` — routed goal/slice reached required validation and another bounded pass has no material expected gain;
- `NO_MATERIAL_DELTA` — the next/reviewed delta is materially unchanged, so additional work would be churn;
- `DIMINISHING_RETURNS` — plausible further work exists but expected material gain no longer justifies continuing the current bounded run;
- `TARGET_REACHED_NO_MATERIAL_CONTINUATION` — target effort/pass boundary was reached and no valid target-crossing reason remains;
- `VALIDATION_FAILED` — validation failed and the terminal state remains truthful rather than converting failure to completion;
- `LIMIT_REACHED_RESUMABLE` — a capacity/ceiling/max boundary stopped the run, current approach still makes material progress, and a known bounded next slice can resume safely;
- `LIMIT_REACHED_DIAGNOSIS_REQUIRED` — the boundary occurred with evidence of repeated/non-converging failure requiring root-cause triage before identical retry;
- `REPLAN_REQUIRED` — current plan/assumptions/decomposition are no longer credible enough for another ordinary pass;
- `BLOCKED` — an owned dependency/capability/authority/validation/external condition prevents permitted continuation;
- `HANDOFF_REQUIRED` — another owner/provider/authority must continue the work.

A stop reason explains **why this run ended**. It does not by itself prove whole-work completion.

## Residual material work

Use `residualMaterialWork` to prevent stop/completion ambiguity.

- `false` only when the claimed routed work/slice is actually complete at the required validation level;
- `true` when material work remains after the current run;
- `unknown` when the current evidence is insufficient to make the distinction safely.

`STOP_CONVERGED` for one semantic slice does not imply the entire larger objective is complete unless the subject explicitly represents that whole work item.

## Limit-exit evidence

When an execution budget, effort ceiling, or max-pass boundary is material, record whether a limit exit occurred and whether diagnosis is required.

### Normal resumable exit

Use semantics equivalent to:

```text
occurred = true
diagnosisRequired = false
stopReason = LIMIT_REACHED_RESUMABLE
```

only when:

- the current approach is still making material progress;
- the next bounded semantic slice is known;
- no repeated blocker/contradiction/ownership/dependency signal requires replan;
- another run can resume without replaying failed work;
- validation/checkpoint truth is preserved.

A normal bounded stop does **not** create an Issue merely because it ended.

### Diagnostic exit

Use semantics equivalent to:

```text
occurred = true
diagnosisRequired = true
stopReason = LIMIT_REACHED_DIAGNOSIS_REQUIRED
```

when repeated/non-converging evidence under `protocol/adaptive-effort-convergence` requires bounded root-cause triage before scheduling the same approach again.

The diagnosis/routing remains owned by the control-cycle semantics. The receipt records the selected result; it is not a new timeout taxonomy or issue-generation mechanism.

## Blocker fingerprint and routing

When a stable repeated blocker is material, `blockerFingerprint` provides a bounded deduplication key suitable for the owning persistence surface.

Rules:

- base it on the stable target + blocker/failure signature where practical;
- do not include secrets, private prompt text, or sensitive evidence merely to make the fingerprint unique;
- sensitive consumer-local identity may remain in a private/local evidence store rather than a shared/public receipt;
- the fingerprint does not create authority to open an Issue or escalate;
- before new Issue/comment creation, restore/search the existing owner/fingerprint as required by the control cycle;
- `routedTo` records the actual selected owner/handoff when material, not an aspirational owner that was never contacted or persisted.

## First-canary proof obligation

A selected first canary after a material Harness change may need one durable receipt even when its ordinary terminal state is `NO_ACTION`.

The purpose is to establish a bounded assertion that the canary:

- resolved the claimed control/target/binding identity;
- actually accessed the claimed authoritative source rather than relying on model memory;
- consumed/reconstructed the claimed exact Harness/effective composition;
- established whether the evaluated change was actually present/applicable;
- observed the applicable runtime/capability limits;
- reached a precise terminal/validation state;
- could preserve enough state for effect/recovery evaluation.

This first receipt remains self-reported unless corroborated. Do not label the canary `EFFECTIVE` merely because the receipt exists.

After that proof obligation is satisfied, unchanged `NO_ACTION` executions should not create durable repository/comment noise.

## Persistence and privacy

The protocol does not mandate GitHub comments, repository files, a database, or another evidence store. Use an explicit provider/consumer-owned persistence surface appropriate to the workflow.

Persist only decision/recovery/effect-relevant fields.

Do **not** persist by default:

- raw prompts or transcripts;
- private chain-of-thought;
- secrets/credentials/tokens;
- unnecessary consumer/customer/project content;
- high-cardinality debug traces;
- private operational evidence into a shared/public Harness store.

When private evidence supports a shared/public effect claim, retain the detailed evidence in its private owner and publish only the generalized safe finding and minimum non-sensitive provenance required for review.

## Receipt trust boundary

An `ExecutionOutcomeReceipt` transfers bounded evidence, never Harness authority.

It does not by itself prove:

- that an issuer actually loaded the named resources;
- that a semantic judgment was correct;
- that validation was independent;
- that a reviewer was independent;
- that adoption/publication is authorized;
- that the observed change was EFFECTIVE.

Those conclusions require the applicable exact-subject evidence, independent review, trust/attestation, authority, and effect-evaluation contracts.

## Anti-telemetry / anti-DSL boundary

This protocol is not a generic analytics/event platform.

Do not add:

- arbitrary metrics/query/expression languages;
- user-defined event-processing rules;
- generic retry/scheduler semantics;
- provider-specific clock constants;
- automatic Issue creation from receipt fields;
- OpenTelemetry/exporter requirements in core semantics;
- PKI/signing infrastructure without an actual threat model;
- per-run repository-log persistence by default.

Future Engine/adapters may normalize or export the bounded receipt, but they implement this semantic contract rather than redefine it.

## Completion

A material outcome receipt is sufficient when another authorized owner/effect evaluator can identify the exact subject/effective Harness/composition, authoritative-source access state, evaluated-change currentness when applicable, relevant capability limits, applicable depth/pass/budget evidence, actual validation state, precise bounded stop reason, residual material work, limit-exit diagnosis/routing when relevant, and evidence provenance **without reconstructing the conversation or treating missing evidence as success**.
