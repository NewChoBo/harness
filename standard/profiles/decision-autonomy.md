# Decision Autonomy Profiles

Resource ID: `profile/decision-autonomy`

## Purpose

Control **when a valid choice inside already delegated authority may be selected without a human decision**.

Decision autonomy is separate from authority:

```text
AuthorityProfile
= what actions may be performed

DecisionAutonomyProfile
= which valid choices inside that authority may be selected without a human decision
```

Selecting a more autonomous profile never grants write, review, adopt, merge, publish, deploy, destructive, secret, privacy, cost, or other authority that is not already delegated. Runtime/tool capability also remains distinct from both.

## Resolution and precedence

Resolve the effective profile from the applicable shared/default, consumer/project, and task/lane configuration.

- a lower overlay may select or narrow decision autonomy only inside its delegated scope;
- profile precedence never widens authority or removes a required validation/review/adoption/publication/privacy/security gate;
- an explicit user decision or project policy overrides an autonomous default for the owned decision scope;
- if no profile is selected, preserve the parent `protocol/control-cycle` baseline: ask only when a decision cannot be resolved inside delegated authority or an explicitly reserved boundary applies. Do not treat omission as an implicit `ASSISTED` selection and do not require an existing consumer to migrate merely to avoid new routine user stops.

No-profile compatibility is not a fourth autonomy mode and should not be recorded as a selected `DELEGATED` or `ASSISTED` profile. The effective profile identity is part of decision provenance only when a profile is actually selected and materially changes whether a human stop occurred.

## `ASSISTED`

Use when the user wants to retain selection of material discretionary choices.

- perform the evidence gathering and consequence analysis needed to close the option space;
- recommend a default when possible;
- when a material choice remains and no existing standing decision resolves it, emit a compact Decision Packet and stop for user selection;
- ordinary deterministic implementation details already fixed by an approved decision do not require repeated confirmation.

`ASSISTED` does not mean asking for every mechanical step.

## `DELEGATED`

Use when the user wants routine management and reversible implementation choices completed automatically, with human attention reserved for genuinely human-owned decisions.

Inside current authority:

- select and execute ordinary, reversible, evidence-supported choices without asking first;
- repair state/configuration drift, choose implementation details, package/split work, and apply established best practice when the goal is already clear;
- finish the permitted lifecycle and report the completed result afterward.

Escalate when the unresolved choice materially depends on a reserved authority boundary, hard-to-reverse/destructive action, major external/public commitment, unbounded/high cost, legal/accountability requirement, conflicting user directives, or a user-specific value/preference that cannot be responsibly inferred from existing policy/context.

## `AUTONOMOUS`

Use for hands-off operation where the Harness may independently research, compare, select, and execute a best-supported alternative inside delegated authority.

A material choice does not require human selection merely because multiple reasonable options exist.

When solution choice is material:

1. restore current state and the declared objective/constraints;
2. perform proportionate discovery/research when it can change the decision;
3. compare viable options and meaningful no-change/defer alternatives;
4. select the best-supported option using the smallest decision-relevant subset of:
   - goal/outcome fit;
   - evidence quality, freshness, limitations, and counterexamples;
   - reversibility and rollback quality;
   - authority/security/privacy/blast-radius risk;
   - maintainability, complexity, and change amplification;
   - interoperability/portability;
   - implementation/migration/resource cost;
   - validation and effect measurability;
   - reuse, consolidation, removal, or provider-native mechanisms before new machinery;
5. continue through the lifecycle stages actually authorized for the executing identities;
6. report the selected option, important rejected alternatives, evidence limits, validation/effect state, and any remaining true human decision after execution.

Do not freeze a universal weighted score or decision-expression DSL. Judgment remains bounded by the goal, evidence, current policy, and review/adoption gates.

### Materially equivalent alternatives

If alternatives remain materially equivalent after proportionate analysis, do not escalate solely to make the user choose arbitrarily. Prefer, in order:

1. least privilege / lowest material risk;
2. simplest sufficient design;
3. most reversible option;
4. lowest maintenance and change amplification;
5. a stable deterministic tie-break among the remaining equivalent options.

Record `AUTONOMOUS_TIE_BREAK` when the final differentiator is the stable tie-break rather than stronger substantive evidence. Do not use random choice when a reproducible choice is available.

## Explicit user/project decisions

An explicit user/project decision remains authoritative current truth inside its owned scope. `DELEGATED` or `AUTONOMOUS` alone does not permit replacing it.

Later analysis, research, validation, or effect evidence may produce a bounded `CHANGE_RECOMMENDATION` when material assumptions changed or a meaningfully better, safer, or simpler direction emerges. If the recommended change would alter user-owned scope:

- route `CHANGE_AUTHORIZATION_REQUIRED` unless a current scoped standing delegation explicitly permits that class of revision;
- preserve the existing decision until the owning authority changes it;
- continue unrelated work that remains authorized;
- summarize only the current decision, changed evidence/assumptions, recommended change, keep-vs-change consequences, migration/rollback, uncertainty/falsifier, and recommendation needed for the decision;
- after rejection, keep the current decision authoritative and do not repeatedly resurface the same recommendation on unchanged evidence.

## Durable pending human decisions

Genuinely human-owned unresolved decisions are a bounded deduplicated continuity set, not one-shot report text.

For each material pending decision preserve only the applicable decision-relevant subset, such as:

```text
decisionKey
scope / owner
question
decision class / reserved boundary
current options + recommended default when still valid
createdFrom / evidence refs
firstRaisedAt / lastVerifiedAt
state: PENDING | RESOLVED | NO_LONGER_REQUIRED | SUPERSEDED
resolutionRef when resolved
```

The exact serialization/store is provider/controller owned. This profile does not require a new queue service, database, scheduler, or policy DSL.

Per relevant run:

1. restore unresolved pending decisions relevant to the current control scope;
2. continue unrelated work allowed by current authority/autonomy mode;
3. revalidate each pending decision against current state before final reporting;
4. deduplicate newly discovered human-owned decisions by a stable `decisionKey`;
5. remove an item only after explicit owning-authority/user resolution or verified `NO_LONGER_REQUIRED` / `SUPERSEDED` evidence;
6. accumulate prior still-pending plus newly-pending decisions in the final human-facing report;
7. do not create repetitive Issue/comment noise solely to remind about an unchanged pending decision.

Displaying or re-requesting a pending decision does not resolve it.

## Decision provenance

Useful bounded outcomes include:

```text
AUTONOMOUS_SELECTION
AUTONOMOUS_TIE_BREAK
USER_DECISION_SELECTED
CHANGE_RECOMMENDATION
CHANGE_AUTHORIZATION_REQUIRED
UPWARD_DECISION_REQUIRED
NO_ACTION
```

These are bounded provenance/routing semantics, not a second lifecycle state machine.

Persist only decision-relevant rationale, evidence/limitations, selected option, important rejected alternatives, effective autonomy profile, authority owner, pending-decision identity when material, and rollback/falsifier. Do not persist private chain-of-thought.

## Human-facing completion report

Complete all work that the effective autonomy profile and authority permit before reporting.

A useful final report separates:

```text
completed / automatically resolved
validation / effect state
automatic follow-up already routed
human decisions still required
```

`human decisions still required` is the accumulated set of prior still-needed plus newly needed decisions after revalidation. Under `AUTONOMOUS`, it should normally contain only decisions blocked by real authority/reserved boundaries or information/value judgments that cannot be resolved under delegated authority. If none remain, report none.

## Invariants

- autonomy never grants authority;
- autonomy never makes unavailable validation PASS;
- autonomy never collapses Producer and Independent Reviewer identities;
- autonomy never converts `REVIEW_PASSED` into `ADOPTED`, publication, deployment, or effect;
- an autonomous decision may still be rejected or revised by the normal Independent Review / adoption lifecycle;
- an explicit user/project decision wins over a default autonomous preference in its owned scope until validly revised;
- a recommendation to change a user-owned decision is not authorization to change it;
- pending-decision persistence transfers continuity only, never authority;
- uncertainty is not a reason to invent evidence; when the decision cannot be responsibly resolved inside the mode and authority, route the precise blocker/decision;
- `NO_ACTION` remains valid when action is not justified.
