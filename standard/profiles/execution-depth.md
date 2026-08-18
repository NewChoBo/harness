# Execution Depth Profiles

Resource ID: `profile/execution-depth`

## Purpose

Provide a small reusable set of execution-depth defaults for `protocol/adaptive-effort-convergence` without fixing provider-specific wall-clock durations or introducing an optimization/scoring language.

These profiles are defaults. Consumer/project/task/agent overrides may tune them only inside delegated scope and may not weaken required validation, review independence, authority, privacy/security, or protected validation/handoff reserves.

## Common stage model

When a reliable total budget is available, profiles may use the following stage buckets:

```text
RESTORE / OBSERVE
DISCOVER / PLAN
PRODUCE
VALIDATE / REVIEW
CHECKPOINT / HANDOFF
```

Percentages below are **soft target ratios**, not quotas. They are reclaimable and may be exceeded/narrowed when material value and protected reserves justify it. When the clock/budget is unavailable, ignore percentage arithmetic and use the semantic depth/pass requirements instead.

No shared profile defines fixed provider minute limits. A delegated runtime/task overlay may add total/stage `floor / target / ceiling` values from current runtime evidence.

Common stop bias:

- target effort/pass count is the normal reassessment point, not a utilization goal;
- after target, stop by default unless a material continuation reason satisfies `protocol/adaptive-effort-convergence`;
- `max` is a safety ceiling, never a desired number of passes;
- unused budget may remain unused after convergence;
- do not repeat review/research/refactoring on an unchanged target merely because capacity remains;
- start with the shallowest credible profile and escalate only on evidence; depth may be narrowed again when risk/uncertainty falls.

## `QUICK`

Use for trivial, obvious, already-patterned, low-impact, or read-only work where a second pass has little expected value.

```text
iteration: SINGLE_PASS
review lenses: preservation sanity check + critical check only as material
formal independent review: only when required by the underlying change class
```

Soft target ratios when useful:

```text
RESTORE / OBSERVE     10%
DISCOVER / PLAN       10%
PRODUCE               55%
VALIDATE / REVIEW     20%
CHECKPOINT / HANDOFF   5%
```

Guardrails:

- required validation is never skipped merely because the profile is QUICK;
- no extra ceremony is required to fill time or create findings;
- escalate depth when the task proves materially more uncertain/risky than initially classified;
- do not escalate merely because additional time is available.

## `STANDARD`

Default for ordinary implementation, research, analysis, review, or documentation work with bounded uncertainty.

```text
iteration: ADAPTIVE_BOUNDED
passes: min 1 / target 1 / max 2
review lenses: CRITICAL + PRESERVATION + SYNTHESIS for material work
formal independent review: according to existing lifecycle requirements
```

Soft target ratios when useful:

```text
RESTORE / OBSERVE     10%
DISCOVER / PLAN       15%
PRODUCE               40%
VALIDATE / REVIEW     25%
CHECKPOINT / HANDOFF  10%
```

Pass 1 is the normal completion target. A second pass is an exception justified only by a material residual finding/uncertainty/failure or decision-relevant evidence change that is plausibly resolvable in one bounded pass. Do not perform pass 2 simply because the maximum permits it.

If pass 1 satisfies done criteria and validation and the dual-lens synthesis has no material actionable delta, stop.

## `DEEP`

Use when uncertainty, novelty, reversal cost, architectural/UX significance, repeated failure, or evidence ambiguity is materially higher.

```text
iteration: ADAPTIVE_BOUNDED
passes: min 1 / target 2 / max 4
review lenses: explicit CRITICAL + PRESERVATION + SYNTHESIS
alternative/falsifier work: required when decision-relevant
formal independent review: according to existing lifecycle requirements
```

Soft target ratios when useful:

```text
RESTORE / OBSERVE     15%
DISCOVER / PLAN       20%
PRODUCE               30%
VALIDATE / REVIEW     25%
CHECKPOINT / HANDOFF  10%
```

Prefer separate/contrastive review contexts when they materially reduce anchoring, but do not confuse that with formal Independent Reviewer identity.

Two useful passes are the normal upper planning target. Passes 3–4 are reserve capacity for unresolved material issues, not routine refinement. Before pass 3 or 4, require the protocol's target-crossing gate.

Stop before the maximum when convergence is reached. If repeated passes reveal expanding scope, shrinking material delta, unchanged review findings, or contradictory evidence, stop/replan instead of continuing the same approach.

## `HIGH_RISK`

Use for high blast radius, hard-to-reverse decisions, material authority/security/privacy boundaries, breaking public contracts, destructive migration, or similarly sensitive work.

```text
iteration: ADAPTIVE_BOUNDED
passes: min 1 / target 2 / max 4
review lenses: explicit CRITICAL + PRESERVATION + SYNTHESIS
formal independent review: mandatory when the underlying change is material
review isolation: fresh/external level as required by existing workflow/review policy
```

Soft target ratios when useful:

```text
RESTORE / OBSERVE     15%
DISCOVER / PLAN       20%
PRODUCE               25%
VALIDATE / REVIEW     30%
CHECKPOINT / HANDOFF  10%
```

High risk increases the strength of required evidence/review; it does **not** justify unlimited duration or repeated speculative work. Two useful passes are the normal planning target; passes 3–4 require a material unresolved risk with a credible bounded resolution path.

This profile does not grant permission to execute a high-risk operation. Reserved authority boundaries continue to apply. A max-pass/effort boundary with unresolved material risk must produce a blocked/revision/escalation state rather than PASS.

## Fixed-pass specialization

A task may explicitly select `FIXED_BOUNDED` with finite `N` when a known repeated method is itself useful, for example:

- two contrastive review lenses in separate passes;
- three bounded refinement passes over a fixed artifact;
- a predetermined finite comparison set.

Each pass must have a semantic purpose and consume residual/delta state. If a later fixed pass has no remaining purpose because convergence occurred early, skip it truthfully rather than manufacture work, unless that pass is itself a required independent/validation gate.

Do not select a larger `N` merely as a proxy for quality confidence.

## Depth escalation / narrowing

During execution, a profile may be reconsidered when material evidence changes.

Escalate depth when, for example:

- validation repeatedly fails;
- unexpected cross-component impact appears;
- important assumptions become uncertain;
- a supposedly reversible change becomes costly to undo;
- a safety/authority/public-contract boundary becomes relevant.

Narrow/stop when, for example:

- the goal is satisfied and validation is sufficient;
- another pass yields no material delta;
- the target is reached without a material continuation reason;
- only optional polish remains;
- review would inspect unchanged candidate/evidence again;
- new sources no longer change the decision/confidence/falsifier;
- further work would create churn, consume capacity with low marginal value, or exceed delegated scope.

Changing execution depth does not change task authority or scope.

## Conformance

A consumer claiming conformance to one of these profiles must preserve its required invariants. A lower override may change soft ratios, wall-clock envelope, or pass targets within delegated scope, but cannot silently remove a required review/validation/authority guarantee.

A conforming implementation must preserve both sides of bounded effort: it may not prematurely skip material validation/work, and it may not treat target/max capacity as an obligation to keep working after convergence.