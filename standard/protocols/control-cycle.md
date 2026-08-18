# Control Cycle

Resource ID: `protocol/control-cycle`

## Purpose

Provide the minimal recurring control loop for state restoration, ownership/dependency routing, decision-autonomy resolution, budget-aware bounded execution, adaptive effort/convergence when material, truthful outcome evidence, Supervisor completion, bounded recursive improvement, and idempotent no-op behavior.

## Steps

1. **RESTORE** — freeze the trusted control/base identity and restore durable prior state.
2. **RESOLVE EXECUTION BUDGET WHEN MATERIAL** — when the run may be long or externally bounded, resolve current clock/budget facts from the runtime/session rather than provider-name assumptions; load `protocol/execution-budget-resumability` as needed.
3. **RESOLVE EXECUTION CONTROL WHEN MATERIAL** — when depth, repeated refinement/review, or stage effort can materially affect quality/cost, resolve the effective depth/profile/override under `protocol/adaptive-effort-convergence`. Do not invent clock facts; if no reliable time budget exists, use semantic depth/pass rules rather than fake minute/ratio accounting.
4. **OBSERVE** — inspect only material deltas: candidate/review/adoption state, blockers, dependencies, consumer feedback, and evidence.
5. **CLASSIFY** — shared concern vs consumer-specific policy; defect/state/ownership/validation/resource-model/policy contradiction as applicable.
6. **RECONCILE OWNERSHIP** — one clear owner per mutation; distinct Independent Reviewer for material changes.
7. **RESOLVE DECISION AUTONOMY WHEN MATERIAL** — when the authorized goal leaves a material discretionary choice, resolve `profile/decision-autonomy`. Autonomy determines whether to request human selection or choose inside current authority; it never grants authority.
8. **BOUND AND ROUTE** — choose the highest-value authorized action and one useful semantic slice that can reach a safe validation/checkpoint boundary under the available execution budget. Apply the effective autonomy mode to unresolved valid alternatives. No-op is valid.
9. **EXECUTE / ITERATE WITHIN THE EFFECTIVE BOUND** — perform the selected slice. When the effective policy is iterative, later passes target residual/delta work. After each material pass, use the configured bounded convergence decision to stop, repeat, replan, hand off, or escalate; never exceed the finite maximum or repeat merely because capacity remains.
10. **VERIFY** — compare reports against actual repository/runtime evidence and perform the validation required for the completed slice/work state. Where the effective depth profile requires it, apply Critical/Falsification + Preservation/Constructive + Synthesis review without conflating those perspectives with formal Independent Review.
11. **DIAGNOSE UNRESOLVED LIMIT EXIT WHEN NEEDED** — when a ceiling/max/budget boundary is reached with material work still unresolved, determine whether this is a normal resumable slice boundary or evidence of a deeper execution/system problem before scheduling the same approach again.
12. **REFLECT / IMPROVEMENT TRIAGE** — after material work, proportionally inspect residual work and recurring/systemic signals, then route at most one highest-value follow-up or `NO_ACTION`.
13. **FORM OUTCOME RECEIPT WHEN MATERIAL** — when recovery/effect/audit or a selected first-canary proof requires it, construct the exact-subject bounded receipt under `protocol/execution-outcome-receipt` from the final verified run state. Missing clock/pass/validation evidence remains unknown/unavailable; do not improve the record after the fact.
14. **CHECKPOINT / PERSIST** — preserve only material state, completed slice vs remaining work, effective depth/profile override when decision-relevant, effective decision-autonomy profile and autonomous selection/tie-break when material, pass/convergence state when iterative, next action, blockers, improvement/effect state, relevant budget/validation facts, outcome receipt/reference when required, and genuine upward decisions.

## Budget-aware bounded execution

Use `protocol/execution-budget-resumability` when execution capacity can materially affect completion.

- Provider/product identity is not proof of a duration or hard-timeout capability.
- A floating/mutable runtime limit must be re-resolved when material rather than copied into shared Harness policy.
- Choose semantic slices that can be independently useful and resumable; do not split solely by arbitrary file/minute/token counts when a meaningful boundary exists.
- Protect capacity needed for required validation and checkpoint/handoff. If starting new material work would consume those reserves, stop starting new work and finish the nearest safe slice/checkpoint instead.
- Stage targets/ceilings are soft and profile/task-specific. Unused non-reserved capacity may be reallocated.
- If clock/budget is unknown, choose smaller slices and checkpoint more frequently rather than inventing remaining time.
- `SLICE_COMPLETE` never means `WORK_COMPLETE`. A budget-limited stop must preserve the incomplete state truthfully.

## Adaptive effort / convergence

Use `protocol/adaptive-effort-convergence` when one or more of these are material:

- explicit total/stage effort envelope;
- stage-ratio/default depth profile;
- fixed finite `N` review/refinement passes;
- adaptive bounded iteration;
- repeated failure or uncertainty requiring a convergence decision;
- critical vs preservation review balance;
- high risk of either premature completion or endless refinement.

Key control behavior:

- resolve `QUICK`, `STANDARD`, `DEEP`, `HIGH_RISK`, or a governed custom effective profile/override proportionally rather than maximizing depth by default;
- total/stage floors are quality/attention targets, not busywork requirements;
- stage ratios are soft/reclaimable and must not starve required validation/handoff;
- each repeated pass consumes residual/delta work and has a finite maximum;
- `NO_MATERIAL_DELTA` / diminishing returns may terminate before target/max pass counts;
- repeated failure, contradictory evidence, stale target semantics, or expanding scope trigger `REPLAN` / handoff / escalation rather than blind repetition;
- unresolved material findings at the max pass/effort boundary remain unresolved and cannot be reported as PASS;
- dual-lens self-review is execution-quality control only; material Producer != Independent Reviewer remains mandatory under the adoption lifecycle.

## Decision autonomy and best-practice selection

Use `profile/decision-autonomy` only to decide **who selects among valid alternatives inside already delegated authority**.

### `ASSISTED`

When a material discretionary choice remains after proportionate analysis, prepare a compact recommendation/Decision Packet and request user selection. Do not ask for mechanical steps already fixed by an approved decision.

### `DELEGATED`

Resolve ordinary reversible choices automatically. This includes implementation details, state/configuration reconciliation, work packaging/splitting, established best-practice application, and other evidence-supported decisions that are already within the approved goal/scope and authority.

Ask the user only when the unresolved choice materially crosses a reserved authority boundary, is destructive or hard to reverse, creates major external/public or unbounded/high-cost commitment, requires legal/accountability judgment, conflicts with existing user directives, or depends primarily on user-specific values/preferences not established by current policy/context.

### `AUTONOMOUS`

Do not stop merely because several reasonable alternatives remain.

When solution choice is material:

1. restore the exact objective, constraints, state, authority, and effective profile;
2. perform proportionate discovery/research when it can change the choice;
3. compare viable options plus meaningful no-change/defer alternatives;
4. select using the bounded criteria and tie-break discipline in `profile/decision-autonomy`;
5. continue through the lifecycle stages actually authorized for the relevant identities;
6. report the selection and important rejected alternatives afterward.

An autonomous selection is not review, adoption, integration, publication, deployment, or effect evidence. A later Independent Reviewer or Adoption Authority may still reject or require revision of the selected design.

If alternatives remain materially equivalent, prefer least privilege/risk, simplest sufficient design, reversibility, and low maintenance/change amplification, then a stable deterministic tie-break. Do not use random choice when a reproducible tie-break is available. Record `AUTONOMOUS_TIE_BREAK` when the final differentiator is only the stable tie-break.

A mode switch cannot make an unauthorized choice executable. `AUTONOMOUS` plus missing authority still yields the applicable blocked/handoff/upward-decision state.

## Unresolved-at-limit diagnosis and escalation

A ceiling, max-pass boundary, or execution-budget stop with unresolved material work is not automatically just `try again next run`.

First distinguish two cases.

### Normal resumable boundary

A compact checkpoint/resume is sufficient when all of the following are true:

- the current approach is still producing material progress;
- the unfinished work is a known bounded next semantic slice;
- no repeated failure pattern, contradictory evidence, ownership problem, or hidden dependency is apparent;
- another run can resume without replaying the same failed work;
- required validation/handoff truth is preserved.

In this case, checkpoint the exact residual slice and continue later. **Do not create an Issue merely because one bounded run ended.**

When an outcome receipt is required for this run, record the stop as `LIMIT_REACHED_RESUMABLE` and keep diagnosis-required false only when the evidence above is actually satisfied.

### Diagnostic limit exit

Before repeating the same approach, perform a bounded root-cause triage when one or more of these are true:

- the same material blocker/failure survived multiple passes or runs;
- max passes were reached without meaningful reduction in the core problem;
- pass-to-pass progress repeatedly collapsed or oscillated;
- the task repeatedly consumes its budget before reaching the same validation boundary;
- evidence increasingly contradicts the current plan;
- the work keeps discovering prerequisites, dependencies, or scope that should have been separated earlier;
- the current owner lacks a capability, authority, context, or dependency needed to finish;
- a similar failure appears across multiple work items/consumers/agents.

Check the smallest decision-relevant set of possible causes rather than blindly increasing time:

```text
work decomposition / slice too large
wrong or stale approach / plan
hidden or unmet dependency
missing evidence / research gap
missing runtime/tool capability
ownership / authority mismatch
validation or state-model gap
systemic guidance / architecture / automation-topology gap
external/provider limitation
policy contradiction or reserved decision
```

These are diagnostic hypotheses, not a new mandatory taxonomy. Map the result to existing Harness classifications when possible.

When an outcome receipt is required for this run, record the stop as `LIMIT_REACHED_DIAGNOSIS_REQUIRED`; the receipt reflects the selected diagnosis/routing state but does not itself authorize escalation.

### Routing after diagnosis

Choose the smallest durable route that prevents repetition without creating issue/comment noise.

1. **Existing work item/Issue already owns the cause** — update or route to it; do not create a duplicate.
2. **Local persistent defect with a clear owner and decision-ready scope** — create or strengthen one work item/Issue with acceptance criteria and evidence.
3. **Cross-scope, cross-agent, architectural, shared-Harness, repeated systemic, or ownership/authority problem** — report to the Supervisor or applicable higher agent with a compact diagnosis and recommended route.
4. **Reserved authority/user decision is actually required under the effective autonomy profile** — route `UPWARD_DECISION_REQUIRED`; do not use a generic Issue as a substitute for the decision.
5. **One-off provider/runtime interruption with no systemic evidence** — checkpoint/handoff only; do not escalate by default.

A useful durable escalation packet contains only decision-relevant facts:

```text
target/work item + exact state
observed budget/ceiling/max evidence when available
completed slices/passes and validation actually performed
unresolved material condition
stable failure/blocker signature for deduplication
root-cause hypothesis + supporting evidence + falsifier/uncertainty
why another identical run is unlikely to be sufficient
existing related Issue/work item, if any
recommended owner and next bounded action
effective decision-autonomy profile when it changes whether human selection is required
```

Do not persist private chain-of-thought. A repeated automation run must search/restore the existing owner/signature first and **must not create the same Issue/comment every execution**.

Limit exhaustion itself is not proof of a systemic defect. Escalation is justified by the unresolved state plus evidence that the current decomposition, approach, dependency, capability, ownership, or guidance is materially inadequate.

## Execution outcome receipt

Use `protocol/execution-outcome-receipt` only when a material recovery/effect/audit obligation requires a compact run outcome.

The receipt is formed **after VERIFY and any required limit diagnosis/improvement routing**, so it can truthfully record the final terminal state, stop reason, residual material work, validation state, and actual routed owner.

Key rules:

- bind the receipt to exact work/target/control/effective-Harness identity where material;
- record selected profile/pass bounds only when they actually governed the run;
- use `CLOCK_UNAVAILABLE` / `unknown` rather than false/zero when clock/target/ceiling evidence is missing;
- distinguish lifecycle terminal state from execution-control stop reason;
- distinguish `LIMIT_REACHED_RESUMABLE` from `LIMIT_REACHED_DIAGNOSIS_REQUIRED`;
- a blocker fingerprint is for deduplication and does not create Issue/escalation authority;
- receipt persistence is evidence/provenance, not independent proof, review, adoption, publication, or effect classification;
- the first selected canary may require one durable receipt even if ordinary work ends `NO_ACTION`;
- after that first proof obligation, unchanged `NO_ACTION` runs remain noise-free unless a material delta/effect sample is required.

The control cycle does not mandate the physical evidence store. `protocol/checkpoint-handoff` owns durable persistence/handoff behavior.

## Post-completion improvement triage

Do not treat successful completion as proof that no follow-up exists, but do not manufacture follow-up work merely to keep the control loop active.

After `VERIFY`, check only the decision-relevant subset of:

- **Freshness** — target/head/base/dependencies/effective Harness are still current.
- **Actual validation** — required checks really ran; skipped/unavailable/cancelled is not PASS.
- **Residual work** — unresolved defects, migration, cleanup, documentation, rollback, effect validation, dependency gaps, or unfinished bounded slices remain.
- **Systemic signal** — repeated failure, stale/duplicated policy, ownership ambiguity, validation/research gap, provider/tool limitation, execution-budget/resumability failure, repeated unresolved-at-limit diagnosis, non-converging effort/review behavior, automation-topology inefficiency, policy contradiction, obsolete mechanism, or a materially simpler alternative.
- **Shared vs local** — distinguish a genuinely shared Harness concern from consumer/domain-specific policy before promotion.
- **North Star alignment** — prefer improvements that reduce user micromanagement, improve closed-loop completion/portability/evidence, and avoid unnecessary framework complexity.
- **Evidence / falsifier** — act only when evidence is sufficient or a bounded experiment/research step can reduce material uncertainty; define how later runs can detect improvement or regression.

Useful bounded classifications include:

```text
ONE_OFF_EXECUTION_ERROR
SYSTEMIC_GUIDANCE_GAP
STATE_MODEL_GAP
OWNERSHIP_GAP
VALIDATION_GAP
RESEARCH_GAP
AUTOMATION_TOPOLOGY_GAP
PROVIDER_OR_TOOL_LIMITATION
POLICY_CONTRADICTION
OBSOLETE_OR_DUPLICATED_MECHANISM
CONSUMER_SPECIFIC_POLICY
SHARED_HARNESS_CANDIDATE
```

Do not create new taxonomy terms when an existing class is sufficient. Execution-budget interruptions normally fit `PROVIDER_OR_TOOL_LIMITATION`, a precise blocked/handoff state, or the residual-work checkpoint; do not create a taxonomy family merely for accounting. Repeated unresolved-at-limit behavior may instead reveal one of the existing systemic/ownership/validation/research/topology classifications after diagnosis.

When a material follow-up exists, route at most one highest-value next action:

```text
FIX_WITHIN_CURRENT_SCOPE
ROUTE_EXISTING_WORKITEM
CREATE_DECISION_READY_WORKITEM
REQUEST_RESEARCH
MARK_PENDING_EFFECT_VALIDATION
NARROW_REVERT_OR_SUPERSEDE
UPWARD_DECISION_REQUIRED
NO_ACTION
```

These routing outcomes do not bypass the normal Worker -> self-check -> frozen candidate -> Independent Review -> adoption lifecycle.

## Upward decision requests

Resolve the active decision-autonomy profile before asking the user.

- under `ASSISTED`, an unresolved material discretionary choice normally becomes a compact user Decision Packet;
- under `DELEGATED`, ask only for genuinely reserved, hard-to-reverse/high-cost/external, conflicting-directive, legal/accountability, or unresolved user-value/preference decisions;
- under `AUTONOMOUS`, do not ask solely because multiple valid alternatives remain; perform proportionate best-practice analysis and select according to `profile/decision-autonomy` unless the choice is outside current authority or another true reserved boundary remains.

When an upward decision is genuinely required and the credible option space is sufficiently closed, prefer a concise recommended choice set: normally 2–4 substantive options, mark the recommended default, include status quo/defer when it is a real option, and include `Other` when user-specific alternatives may exist.

Do not force multiple choice when the problem itself is ambiguous, discovery is incomplete, user-only information is missing, or enumeration would falsely close the solution space. In those cases ask only the smallest necessary open question.

Do not re-ask an explicitly decided choice unless material new evidence invalidates it.

## Invariants

- do not manufacture work to keep a cycle busy;
- do not manufacture improvement candidates or receipts to satisfy a checklist; `NO_ACTION` is a valid successful outcome;
- decision autonomy never grants authority or weakens a reserved gate;
- `AUTONOMOUS_SELECTION` / `AUTONOMOUS_TIE_BREAK` are provenance, not review/adoption/publication/deployment/effect states;
- do not ask the user merely to make an arbitrary tie-break when the effective `AUTONOMOUS` profile permits a stable bounded selection;
- do not use a configured effort floor, pass target, or remaining capacity as a work-generation quota;
- do not preserve a stage ratio when doing so would starve required validation/handoff;
- do not blindly repeat the same full task for an allowed `N`/max pass count; consume residual/delta work;
- do not blindly schedule the same approach after an unresolved ceiling/max exit when evidence indicates a deeper blocker or non-convergence pattern;
- do not create an Issue solely because one bounded run ended; diagnose persistence/systemic evidence first;
- before creating a limit-related Issue/comment, restore existing work items and deduplicate by target + stable failure/blocker signature where practical;
- do not overwrite unfinished same-owner work with duplicate work;
- dependency ordering must be explicit when downstream work relies on upstream output;
- completion reports and outcome receipts are not evidence of correctness by themselves;
- do not expand the current work item's scope merely because improvement triage found a follow-up; route it separately when needed;
- one consumer's domain/product rule is not a shared Harness rule without cross-context evidence;
- Supervisor normally verifies control evidence rather than rereading all source;
- do not spend protected validation/handoff reserve on optional new material work;
- budget/clock uncertainty is not permission to fabricate a deadline, elapsed time, remaining capacity, target/ceiling observation, or pass count;
- review perspectives inside one producer execution are not formal independent review evidence;
- receipt persistence never grants authority, review independence, adoption, publication, or effect status.

## Completion

A cycle ends in a precise state such as `NO_ACTION`, `CANDIDATE_READY`, `PRE_ADOPTION_REVIEW_REQUIRED`, `CHANGES_REQUIRED`, `REVIEW_PASSED`, `PENDING_APPROVAL`, `ADOPTED`, `PENDING_EFFECT_VALIDATION`, a useful `SLICE_COMPLETE` handoff, or a concrete blocked/reconciliation state.

A material cycle's checkpoint must also make residual/systemic, iterative, and decision state resumable: one routed next action, an effect-validation obligation, an upward decision request that genuinely remains under the effective autonomy profile, an autonomous selection/tie-break when material, unfinished next slice/pass, convergence/stop reason when material, unresolved-at-limit diagnosis/owner when applicable, or explicit `NO_ACTION`.

When `protocol/execution-outcome-receipt` is required, the final persisted state also includes the exact bounded receipt/reference or an explicit unresolved persistence handoff. Missing receipt evidence must not be silently reconstructed from scheduler timestamps or conversation memory.
