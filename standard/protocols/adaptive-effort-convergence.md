# Adaptive Effort and Convergence

Resource ID: `protocol/adaptive-effort-convergence`

## Purpose

Provide a bounded execution-control layer above the ordinary control cycle so a compatible runtime or zero-runtime agent can proportionally control work depth, stage effort, finite repetition, critical/preservation review, and convergence without turning declarative Harness resources into a scheduler, optimizer, or workflow language.

This protocol complements `protocol/execution-budget-resumability`:

- execution-budget/resumability answers **how much capacity is actually available and how to stop/resume safely**;
- adaptive effort/convergence answers **how deeply to use that capacity, when another pass is justified, and when to stop, replan, or escalate**.

Neither protocol grants authority, proves runtime capabilities, or replaces required validation/review/adoption gates.

## Core invariants

- useful work is bounded by goal, evidence, authority, validation, and convergence, not by a requirement to remain busy;
- a minimum/floor never authorizes fabricated work, artificial waiting, or scope expansion merely to consume time;
- **target is a reassessment boundary, not a utilization goal**: after target effort/pass count is reached, the default is to stop unless a material continuation reason justifies more work;
- **ceiling is a stop boundary**: after it is reached, do not start new optional production, research, review, refactoring, or polish; finish only the nearest required validation/safety/checkpoint/handoff boundary that can still be completed truthfully;
- stage allocations are soft/reclaimable unless a real runtime/controller enforces a documented boundary;
- required validation and handoff reserves remain protected under `protocol/execution-budget-resumability`;
- every repeated execution mode has a finite maximum;
- a repeated pass targets residual/delta work rather than replaying the whole task without reason;
- critique is balanced by preservation analysis so successful behavior is not destroyed merely because another change is possible;
- dual-lens self-review never substitutes for formal Independent Review where that is required;
- reaching a pass/time ceiling with unresolved material defects does not convert the result into PASS;
- more time, more passes, more sources, more comments, or more findings are never quality metrics by themselves;
- task/profile/agent execution overrides never expand authority or weaken non-overridable safety/review/privacy constraints.

## Effort envelope

When the current runtime exposes trustworthy clock/budget evidence, an effective profile or delegated task override may describe an effort envelope for the total run and/or selected stages.

Useful concepts are:

- **floor** — preferred minimum meaningful attention/quality effort before ordinary completion;
- **target** — preferred effort boundary at which continued work must be re-justified by material expected value;
- **ceiling** — point at which the agent/controller must stop starting optional work and finish the nearest safe validation/checkpoint boundary;
- **target ratio** — preferred share of a known total budget for a stage;
- **range** — optional bounded flexibility around the target ratio;
- **reclaimable capacity** — unused non-reserved capacity that may move to another useful stage.

A floor is a **soft quality floor by default**, not a hard wall-clock occupancy requirement. If done criteria and convergence are already satisfied before the floor, stop truthfully rather than manufacture work. When additional useful validation, counterexample search, preservation checking, or evidence verification exists, that is the preferred use of remaining floor capacity.

### Target-crossing gate

Crossing the target effort or target pass count is a deliberate control decision, not the normal path. Before continuing beyond target, require at least one decision-relevant reason such as:

- a required validation/review step is still incomplete;
- a material unresolved finding is likely resolvable by one bounded next pass;
- important uncertainty remains and a specific bounded evidence step is likely to change the decision;
- new evidence invalidated an assumption and a bounded correction is required;
- stopping now would leave the current semantic slice in an unsafe or non-resumable state.

Do **not** continue beyond target merely because:

- budget remains available;
- the configured maximum has not been reached;
- more polish is possible;
- more sources/findings could probably be collected;
- an agent can imagine a broader improvement scope.

If no material continuation reason exists at target, emit `TARGET_REACHED_NO_MATERIAL_CONTINUATION` and converge/stop.

### Ceiling behavior

A ceiling is cooperative unless an actual controller/runtime can enforce a hard timeout. Shared Harness semantics must not claim process-level enforcement from prompt text alone.

At or before the ceiling:

1. stop starting optional production/research/review/refactor/polish;
2. preserve capacity for required validation and checkpoint/handoff;
3. complete only the nearest safe semantic boundary if feasible;
4. if required validation cannot finish, report it as incomplete/blocked rather than extending work indefinitely or claiming PASS;
5. if a real hard timeout exists, stop sufficiently before it to preserve truthful validation/handoff.

A task may use a lower `soft ceiling` than the runtime's absolute capacity. The fact that the runtime allows more time is not a reason to consume it.

If the clock or total budget is unavailable/unreliable, do not invent elapsed/remaining minutes or compute fake ratios. Fall back to semantic depth/pass rules, smaller resumable slices, and the same marginal-value/overwork gates.

## Marginal-value / anti-overwork gate

Before any **optional** next pass, additional research horizon, broad refactor, extra review cycle, or polish after the current goal can already be validated, ask whether the next unit has a plausible material decision/outcome effect.

Continue only when the next bounded unit is expected to materially improve at least one of:

- correctness or required validation;
- meaningful uncertainty reduction;
- safety/regression prevention;
- decision quality between live alternatives;
- required preservation of behavior/compatibility;
- resumability/handoff of unfinished material work.

Stop/narrow when expected benefit is merely cosmetic, repetitive, speculative, or lower-value than preserving capacity for other owned work. No universal numeric utility formula is required.

Common overwork signals include:

- the same finding is being restated without new evidence;
- review cycles repeatedly return only optional polish or wording preferences;
- more sources are collected without changing confidence, options, or falsifiers;
- search scope expands after the original decision is already sufficiently supported;
- refactoring spreads into adjacent code/docs without a routed defect or acceptance need;
- pass-to-pass delta is shrinking below material significance;
- another review pass would inspect an unchanged candidate with unchanged evidence;
- work continues mainly because time/budget remains;
- optional improvements begin displacing another already-routed higher-value task.

These signals should cause `STOP_CONVERGED`, `DIMINISHING_RETURNS`, `TARGET_REACHED_NO_MATERIAL_CONTINUATION`, or a separately routed follow-up rather than more work in the current run.

## Stage allocation

A profile or task override may emphasize stages such as:

```text
RESTORE / OBSERVE
DISCOVER / PLAN
PRODUCE
VALIDATE / REVIEW
CHECKPOINT / HANDOFF
```

Ratios are planning targets, not quotas. A stage may exceed its target when the remaining budget still protects required later reserves and the overrun has material expected value. Unused non-reserved capacity may be reclaimed by another useful stage.

Do not preserve a configured ratio when doing so would starve required validation, independent-review preparation, handoff, or a higher-priority safety check. Do not reallocate unused capacity merely to maximize utilization; unused capacity may remain unused when the work has converged.

## Iteration modes

The effective execution-control policy may select one of three bounded modes.

### `SINGLE_PASS`

Use one production/analysis pass plus required validation/review. Appropriate for trivial, obvious, already-patterned, or low-risk work where another pass has little expected value.

### `FIXED_BOUNDED`

Use an explicit finite number of useful passes when the work itself benefits from a known repeated procedure, for example two contrastive review passes or three bounded refinement passes.

Rules:

- the pass count is finite and explicit;
- each pass has a defined semantic purpose;
- later passes consume residual/delta findings rather than blindly replaying prior work;
- a configured fixed count does not require fabricating content if the purpose of a later pass no longer exists; record an early convergence/skip reason instead;
- fixed passes do not bypass validation or formal Independent Review;
- a fixed-pass procedure should still stop early when later pass purpose disappears, unless that pass is itself a required independent/validation gate.

### `ADAPTIVE_BOUNDED`

Use `min / target / max` pass semantics with a small Harness-defined set of material continuation/stop/replan reasons. `max` is mandatory and finite.

`min` is the minimum number of semantically required passes for that profile/task, not a reason to split one sufficient pass into artificial sub-passes. `target` is the normal reassessment boundary. `max` is a safety ceiling, not a desired count.

A next pass is justified only when at least one material condition remains, such as:

- `VALIDATION_FAILED`;
- `MATERIAL_FINDING_REMAINS`;
- `MATERIAL_UNCERTAINTY_REMAINS`;
- `ASSUMPTION_CHANGED`;
- `DECISION_RELEVANT_EVIDENCE_CHANGED`;
- a bounded correction from formal/self review remains inside the current delegated scope.

After target passes are complete, require the stronger target-crossing gate above before consuming another pass toward `max`.

Prefer stopping when:

- done criteria and required validation are satisfied;
- another pass yields `NO_MATERIAL_DELTA`;
- expected marginal improvement is below material significance (`DIMINISHING_RETURNS`);
- target is reached without a material continuation reason (`TARGET_REACHED_NO_MATERIAL_CONTINUATION`);
- only optional polish remains outside the routed goal;
- remaining budget must be protected for validation/checkpoint/handoff;
- further review would inspect an unchanged candidate/evidence set without a new review purpose.

Prefer `REPLAN` / escalation instead of another ordinary pass when:

- the same material failure repeats without meaningful improvement;
- evidence contradicts the current approach;
- the target/base/effective semantics became stale;
- the problem scope expands materially on each pass;
- another owner/authority is required;
- the pass ceiling is reached while material defects/uncertainty remain.

Do not expose arbitrary user-authored loop expressions, conditions, scripts, or functions in declarative resources. Complex iteration control belongs in controller/runtime code; zero-runtime agents interpret the same bounded semantic contract directly.

## Dual-lens review

For material work, an effective profile may require two distinct review perspectives before synthesis.

### `CRITICAL / FALSIFICATION`

Look for:

- invalid assumptions and counterexamples;
- defects, regressions, edge cases, unsupported claims;
- simpler or materially better alternatives;
- evidence that should narrow, reject, or replan the current approach;
- places where validation success is weaker than claimed.

The purpose is not to manufacture findings. `NO_MATERIAL_FINDING` is valid.

### `PRESERVATION / CONSTRUCTIVE`

Identify:

- behavior/results that are already correct and should remain stable;
- preservation invariants that a fix/refactor must not damage;
- improvements that actually worked and should be retained;
- places where further change would add churn without material gain;
- useful constraints, compatibility, readability, voice, UX, performance, or evidence quality that could be lost by overcorrection.

This is not a praise quota. The output is decision-relevant preservation information, not compliments.

### `SYNTHESIS`

Reconcile both lenses into one bounded decision:

```text
KEEP
FIX_WITHIN_SCOPE
REPEAT_BOUNDED_PASS
REPLAN
HANDOFF / ESCALATE
STOP_CONVERGED
```

Where stronger independence is useful, the critical and preservation lenses may use separate fresh contexts/capsules. This is an execution-quality choice. It does **not** satisfy the formal Producer != Independent Reviewer requirement for material PRE_ADOPTION_REVIEW unless the governing review-isolation contract is independently satisfied.

A completed dual-lens cycle that returns no material actionable delta should normally end first-party review for the unchanged candidate. Do not repeat critique/preservation cycles merely to increase confidence unless a new material question, candidate change, or evidence change appears.

## Convergence decision

After each material pass, evaluate only decision-relevant evidence:

- done/acceptance state;
- validation results;
- unresolved critical findings;
- preservation invariants at risk;
- material uncertainty;
- evidence/confidence gain;
- repeated-failure pattern;
- expected marginal value of another pass;
- whether target has been reached and the continuation reason is strong enough;
- remaining budget/reserve and safe checkpoint boundary;
- opportunity cost of continuing versus ending/routing the current work.

A converged result means the routed goal is satisfied to the required validation/review level and another pass has no material expected gain. It does **not** mean the artifact is globally perfect.

If unresolved material findings remain at the maximum pass/effort boundary, route the truthful blocked/revision/handoff state instead of declaring convergence.

## Three-layer composition

Execution control composes conceptually as:

```text
Harness Core execution-control semantics
+ optional shared Effort/Depth Profile
+ consumer/project/task/agent execution override inside delegated scope
= effective execution-control policy
```

Rules:

- Core defines invariant semantics and bounded vocabulary.
- A shared profile supplies reusable depth/pass/review/stage-emphasis defaults.
- A local/task/agent override may tune wall-clock envelope, ratios, pass bounds, or selected depth **only inside already-delegated scope**.
- Precedence is not authority. A later override cannot weaken required validation, formal review independence, privacy/security boundaries, adoption authority, protected validation/handoff reserve, or another explicit non-overridable invariant.
- An override that conflicts across an authority boundary is `POLICY_CONTRADICTION` / escalation, not a valid precedence win.
- When profile conformance is claimed, required profile invariants must remain satisfied or be replaced only through an explicitly permitted equivalent guarantee.

## Depth selection

Select depth proportionally from factors such as:

- impact/blast radius;
- uncertainty;
- reversal/migration cost;
- novelty;
- evidence quality/availability;
- failure/regression history;
- authority/security/privacy sensitivity;
- current task and consumer constraints.

Do not require a universal numeric scoring formula. A shared profile may provide bounded defaults; a consumer/task may tune them with current evidence.

**Start with the shallowest profile that credibly satisfies the risk/uncertainty/validation need.** Escalate only on material evidence. `DEEP` or `HIGH_RISK` is not a quality badge and must not be selected merely because more effort is available.

Depth may also be narrowed during execution when evidence reduces uncertainty/risk or the remaining work becomes routine. Escalation is not one-way.

## Persistence / handoff

Persist only what another run/reviewer needs, for example:

- effective depth/profile and material override;
- current semantic slice/pass number when relevant;
- validation status;
- unresolved material finding/uncertainty summary;
- preservation invariants when they affect the next action;
- convergence/stop/replan reason;
- remaining work and next owner.

Do not persist private chain-of-thought or a verbose transcript of every internal review pass.

## Failure patterns

Treat these as quality failures when observed:

- `MIN_TIME_BUSYWORK` — fabricated work/waiting merely to satisfy a duration floor;
- `MAX_BUDGET_UTILIZATION` — continuing mainly because time/capacity remains instead of because material value remains;
- `TARGET_OVERRUN_WITHOUT_CAUSE` — crossing target effort/pass count without a material continuation reason;
- `FIXED_RATIO_STARVATION` — quota adherence starves required validation/handoff;
- `BLIND_N_REPEAT` — repeated full-task replay without residual/delta purpose;
- `REVIEW_CHURN` — repeated review of unchanged candidate/evidence without a new material question;
- `RESEARCH_HORIZON_CREEP` — continuing source collection after the decision is sufficiently supported and new evidence no longer changes the result;
- `OPTIONAL_POLISH_SCOPE_CREEP` — expanding into adjacent cleanup/refactoring/polish outside the routed goal;
- `CRITIQUE_ONLY_CHURN` — endless changes because only defect discovery is rewarded;
- `POSITIVE_REVIEW_CHEERLEADING` — praise replaces preservation analysis;
- `SELF_REVIEW_AS_INDEPENDENT_REVIEW` — self-review is reported as formal independent review;
- `NON_CONVERGING_LOOP` — repeated failure continues without replan/escalation;
- `PROFILE_AUTHORITY_ESCALATION` — an effort override weakens or bypasses higher constraints.

## Completion

This protocol succeeds when the run uses **neither less nor more depth/repetition than justified**, protects validation/handoff, reaches a truthful converged result or precise blocked/replan state, and leaves enough compact evidence for another owner/run to continue without replaying the full session.
