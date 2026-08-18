# Decision 0009 — Adaptive effort, bounded iteration, and convergence

Status: proposed candidate under issue #36; operational semantics are not adopted until the candidate passes PRE_ADOPTION_REVIEW and the appropriate adoption authority integrates it.

## Context

The adopted execution-budget/resumability model answers how to use a bounded or uncertain execution window safely, but it intentionally does not decide how much depth a task deserves, how many refinement/review passes should run, or when repeated work has converged.

Real consumer work also exposes two opposite failure modes:

- agents stop too early after one plausible implementation/analysis without enough verification or counterexample pressure;
- agents continue improving indefinitely, manufacture issues, over-refactor successful behavior, or repeat the same research/review because more time/passes are available.

A reusable Harness needs a bounded way to express total/stage effort, finite repeated passes, critical/falsification review, preservation/constructive review, and convergence while remaining provider-neutral and non-Turing-complete.

## Decision

Adopt an execution-control model with three layers:

```text
Harness Core semantics
+ optional shared Effort/Depth Profile
+ delegated consumer/project/task/agent execution override
= effective execution-control policy
```

The Core defines:

- total/stage effort-envelope concepts: `floor / target / ceiling`;
- soft target ratios/ranges and reclaimable non-reserved capacity;
- bounded `SINGLE_PASS`, `FIXED_BOUNDED`, and `ADAPTIVE_BOUNDED` iteration modes;
- critical/falsification, preservation/constructive, and synthesis review perspectives;
- convergence, stop, replan, and escalation semantics;
- anti-busywork, anti-blind-repeat, anti-critique-churn, and authority-preservation invariants.

The first shared depth profile exposes `QUICK`, `STANDARD`, `DEEP`, and `HIGH_RISK` defaults. It uses semantic depth/pass/review requirements and soft stage ratios, not provider-specific minute constants.

A delegated task/runtime override may add explicit current wall-clock `floor / target / ceiling`, ratio adjustments, or pass bounds when reliable budget evidence exists. Precedence never expands authority or weakens required validation/review/privacy/security constraints.

## Minimum duration semantics

A configured minimum/floor is a **quality/attention target**, not a requirement to keep the process busy for a wall-clock duration.

If useful verification, alternative analysis, counterexample search, preservation review, or evidence checking remains, floor capacity can fund it. If the routed goal is already validated and converged, the agent stops early rather than inventing work or waiting artificially.

Hard process timeout/enforcement remains a runtime/controller capability. Prompt-only semantics cannot claim it.

## Repetition semantics

Finite fixed `N` passes are allowed only as bounded declarative configuration with a semantic purpose per pass. Adaptive repetition uses a finite maximum plus Harness-defined continuation/stop/replan reasons rather than arbitrary user-authored loop expressions.

A later pass consumes residual/delta work. It should not rerun the entire task from scratch unless the previous approach was invalidated and a full replan explicitly requires it.

## Review balance

`CRITICAL / FALSIFICATION` review searches for defects, invalid assumptions, counterexamples, regressions, unsupported claims, and simpler alternatives.

`PRESERVATION / CONSTRUCTIVE` review identifies what is already correct, what must not regress, what improvement actually worked, and where further change would create churn.

`SYNTHESIS` decides whether to keep, fix, repeat, replan, hand off/escalate, or stop converged.

These are execution-quality perspectives. They do not replace formal Producer != Independent Reviewer separation for material PRE_ADOPTION_REVIEW.

## Alternatives considered

### Hard universal minimum minutes

Rejected. It encourages busywork/waiting, cannot be truthful when clock/runtime enforcement is unavailable, and is not portable across providers/tasks.

### Universal fixed stage percentages

Rejected as quotas. Different work types need different emphasis and required validation/handoff must not be starved. Profiles may supply soft defaults that are reclaimable.

### Always run N passes

Rejected as the default because it repeats already-converged work. Fixed passes remain available for a known finite method, while adaptive bounded iteration is preferred for ordinary refinement.

### Critic-only recursive improvement

Rejected because it systematically rewards finding more things to change and can destroy stable successful behavior. Preservation analysis is required for balanced convergence.

### Arbitrary loop/condition expressions in YAML/JSON

Rejected. This would turn declarative resources into a workflow/programming language. Complex iteration control belongs in controller/runtime code behind bounded Harness semantics.

## Consequences

### Benefits

- allows task depth to scale with impact/uncertainty/reversal cost;
- supports explicit work-time envelopes without provider-duration lock-in;
- improves verification and counterexample pressure on material work;
- reduces endless refactoring/research/review churn through preservation and convergence;
- makes repeated passes resumable and delta-oriented;
- provides a natural semantic target for future Engine/controller enforcement.

### Costs / risks

- adds another execution-control concept and profile surface;
- ratios/pass bounds may become bureaucracy if applied to trivial work;
- badly tuned floors or maxima can still waste effort or stop useful work;
- self-review lenses could be mistaken for formal independent review;
- profile proliferation could become a hidden optimizer/config language.

### Mitigations

- QUICK remains intentionally lightweight;
- `NO_MATERIAL_DELTA` and early convergence are valid;
- shared profiles stay small and provider-neutral;
- floors never require manufactured work;
- formal Independent Review remains a separate lifecycle gate;
- Engine/controller work may implement the finite model later but declarative resources do not gain arbitrary logic.

## Operational mapping

If adopted, this decision's operational semantics are mapped to:

- `standard/protocols/adaptive-effort-convergence.md`;
- `standard/profiles/execution-depth.md`;
- integration clauses in `standard/protocols/control-cycle.md`;
- verification clauses in `standard/checklists/agent-self-check.md` and `standard/checklists/pre-adoption-review.md`.

For mapped semantics, those canonical Standard resources control on conflict; this Decision remains rationale/history/provenance.

## Effect / falsifier

Do not classify the change EFFECTIVE merely because the resources are adopted.

Canaries should demonstrate that the model:

- reduces premature one-pass completion on material work;
- does not increase duplicate/repeated work or issue/comment noise materially;
- improves validation/review quality without starving production;
- reduces unnecessary refactor/research churn through preservation/convergence;
- resumes bounded repeated work from residual state rather than replaying the full task;
- does not increase user micromanagement.

Narrow or supersede the model if consumers show persistent budget bookkeeping overhead, repeated passes with little material gain, or confusion between self-review and formal independent review.