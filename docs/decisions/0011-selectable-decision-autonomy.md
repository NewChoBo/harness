# Decision 0011 — Selectable decision autonomy without authority expansion

## Status

Candidate / user-directed.

## Context

Harness consumers need different human-in-the-loop behavior. Some users want material alternatives presented before action; others want routine/reversible work completed automatically and reported afterward; a hands-off mode should be able to research current best practice, choose among viable alternatives, and continue without asking solely for preference among equivalent implementation choices.

Encoding this as broader authority would be unsafe and conceptually wrong. The right to choose among valid options is distinct from permission to write, review, adopt, merge, publish, deploy, use secrets, perform destructive operations, or cross other reserved boundaries.

The new profile must also be backward compatible for consumers that do not select it, preserve unresolved genuinely human-owned decisions across runs, and keep explicit user/project decisions authoritative until their owning authority changes them.

## Decision

Introduce one bounded `profile/decision-autonomy` family with:

- `ASSISTED` — retain human selection for unresolved material discretionary choices;
- `DELEGATED` — automatically resolve ordinary/reversible choices and escalate genuinely reserved, hard-to-reverse, costly, externally consequential, conflicting, or user-value-dependent decisions;
- `AUTONOMOUS` — independently research/compare/select the best-supported option inside current authority and continue through the lifecycle stages actually authorized.

The profile is an orthogonal composition axis. It does not grant capabilities and cannot weaken validation, Independent Review, adoption, publication/deployment, privacy/security, destructive-operation, cost, or higher-authority gates.

If no decision-autonomy profile is selected, preserve the existing parent control-cycle behavior: ask only when a decision cannot be resolved inside delegated authority or an explicitly reserved boundary applies. Omission is not an implicit `ASSISTED` selection and does not require every existing consumer to migrate merely to avoid new user stops.

When options remain materially equivalent in `AUTONOMOUS`, prefer least privilege/risk, simplest sufficient design, reversibility, and low maintenance/change amplification, then use a stable deterministic tie-break rather than escalating merely for arbitrary human selection.

Genuinely human-owned unresolved decisions form a bounded deduplicated durable set across relevant runs. Restore relevant pending decisions at run start, keep unrelated authorized work moving, revalidate them before final reporting, deduplicate them by a stable decision key, and retain them until explicit owning-authority/user resolution or verified `NO_LONGER_REQUIRED` / `SUPERSEDED` evidence. Re-reporting a pending decision does not resolve it, and unchanged reminders do not justify repeated Issue/comment noise or a new queue/database/scheduler subsystem.

An explicit user/project decision remains authoritative current truth inside its owned scope. Later analysis, research, or effect evidence may produce a bounded `CHANGE_RECOMMENDATION`. If adopting that recommendation would alter user-owned scope, route `CHANGE_AUTHORIZATION_REQUIRED` unless a current scoped standing delegation explicitly authorizes that class of revision. Continue unrelated authorized work. A rejected recommendation leaves the current decision authoritative and must not be repeatedly resurfaced on unchanged evidence.

## Alternatives rejected

### Human approval for every material choice

Rejected as the only model because it makes user management load scale with automation count and prevents closed-loop operation for reversible choices.

### Make omitted profile mean `ASSISTED`

Rejected because it would change existing no-profile consumers from the established delegated baseline into new routine human stops without an explicit migration decision.

### `AUTONOMOUS` implies broad/root authority

Rejected. Autonomy is decision-selection behavior, not privilege. This would collapse the existing role/authority/adoption model.

### Universal weighted decision score

Rejected. A fixed scoring DSL would create false precision and unnecessary policy machinery across domains. Use bounded qualitative criteria and explicit evidence/limitations instead.

### Random selection among ties

Rejected as the default because reproducible least-risk/simplest/reversible tie-breaking is easier to audit, review, and roll back.

### New pending-decision queue service

Rejected for this semantic slice. Existing provider/controller persistence surfaces can carry the bounded pending set; introducing storage infrastructure would expand scope without evidence that Core requires it.

## Consequences

Benefits:
- users can select a predictable management style without rewriting workflows;
- existing no-profile consumers preserve their established interaction behavior;
- fully hands-off operation becomes possible inside explicitly delegated authority;
- user questions are concentrated on genuine reserved/value decisions and survive run boundaries without reminder spam;
- explicit user decisions can be challenged by better evidence without being silently overridden;
- autonomous choices remain explainable and independently reviewable;
- consumer/project/task overlays can choose different modes without provider-specific prompt duplication.

Risks:
- an agent may overestimate whether a decision is inside delegated scope;
- an autonomous option may be reasonable but differ from an unstated user preference;
- stale pending decisions could become reporting noise if not revalidated;
- a change recommendation could be mistaken for permission to revise an explicit user-owned decision;
- too much decision provenance could become reporting noise.

Mitigations:
- `precedence != authority` remains controlling;
- no-profile behavior preserves the existing control-cycle baseline rather than silently selecting a stricter profile;
- explicit user/project decisions remain authoritative until properly revised;
- pending decisions are deduplicated, revalidated, and persisted only on material delta;
- persist only decision-relevant rationale and important alternatives;
- normal validation, Independent Review, adoption, rollback, and effect evaluation remain unchanged.

## Operational mapping

This decision maps to:
- `profile/decision-autonomy` for mode, no-profile compatibility, pending-decision continuity, and explicit-decision revision semantics;
- `protocol/change-safety` for intent/authority/human-stop and explicit-decision protection;
- `protocol/control-cycle` for runtime resolution and autonomous selection/routing;
- `standard/README.md` and `standard/catalog.yaml` for canonical mapping/provenance.

No new physical Scheduled Task, planner runtime, authority system, pending-decision database, or decision DSL is introduced.
