# Project Setup Dialogue

Resource ID: `protocol/project-setup-dialogue`

## Purpose

Define a bounded, resumable dialogue that helps configure a new or existing project without requiring the user to know Harness structure in advance.

This protocol composes existing Harness semantics. It is not a questionnaire DSL, project-management language, requirements authority, or scheduler.

## Entry modes

### New project

Start from the user's rough goal and any known constraints. Do not fabricate requirements or architecture merely to fill a template.

### Existing project

Restore current repository/project state first. Treat existing canonical project guidance as current truth unless the user explicitly changes it or current evidence proves it stale/contradictory.

## Epistemic labels

When material, distinguish:

```text
USER_DECISION
SUPPORTED_RECOMMENDATION
PROVISIONAL_ASSUMPTION
UNRESOLVED
```

These labels describe setup knowledge/provenance. They are not WorkItem lifecycle states or authority grants.

## Dialogue principles

- ask only questions whose answers can materially change the generated setup;
- reuse known user/project facts and prior explicit decisions;
- do not ask the same question again unless new evidence invalidates the prior answer;
- use progressive disclosure rather than a full intake form;
- allow partial setup when optional details can safely remain unresolved;
- separate problem/outcome from preselected solution where useful;
- offer recommendations, but preserve user-owned value/product choices;
- an explicit user answer overrides a conflicting assistant default inside the user's decision scope;
- do not convert repeated assistant inference into user intent.

## Phase 0 — Restore / classify

Determine:

- new vs existing project;
- current repository/control identity when applicable;
- existing requirements/North Star/roadmap/architecture/validation/release/agent guidance;
- current Harness binding/profile/overlays if present;
- existing unresolved human decisions;
- already-known user/project presentation preferences when relevant;
- whether the user is asking for full setup, one missing setup dimension, or a revision of current setup.

For an existing project, summarize only decision-relevant current state and contradictions before asking new questions.

## Phase 1 — Need / context

Resolve the smallest useful subset of:

- what is being built, operated, researched, or created;
- primary user/stakeholder or audience;
- problem/friction/desire or intended outcome;
- must-have requirements;
- hard constraints/boundaries;
- explicit non-goals;
- important existing systems/dependencies/interoperability requirements.

If the underlying need is materially uncertain, route or apply the applicable Problem/Demand Discovery semantics rather than pretending the requested feature wording is proven demand.

## Phase 2 — North Star / outcomes

Establish enough durable direction to guide later tradeoffs:

- concise project/product purpose;
- primary value or desired user outcome;
- strategic priorities and important tradeoffs;
- observable success/effect signals where meaningful;
- Objective/Outcome relationships when the project needs durable work traceability.

Avoid turning the North Star into a long feature backlog or universal KPI set.

## Phase 3 — Development / solution strategy

When solution choice is material, use proportional Solution Discovery rather than guessing.

Resolve applicable choices such as:

- product vs platform/library/framework/domain ownership boundaries;
- build vs reuse/composition/provider-native approach;
- greenfield vs incremental migration;
- architecture/interoperability direction;
- sequencing and dependency strategy;
- branch/integration model;
- release/publication/deployment model;
- compatibility/migration expectations;
- validation/testing/review strategy;
- post-adoption effect observation.

Do not force the user to choose implementation trivia that can be resolved safely by delegated technical judgment.

## Phase 4 — Harness composition / authority

Resolve the minimum effective Harness composition:

```text
exact/updatable Harness base
+ selected shared profile(s) when justified
+ minimal project binding
+ genuine project/domain overlays
+ task/lane overlays only when needed
```

Determine, when material:

- producer/worker owner;
- independent reviewer;
- adoption/integration authority;
- release/publish/deploy authority;
- sensitive/destructive/reserved boundaries;
- decision-autonomy profile when available;
- which decisions remain human-owned;
- research/effect/maintenance responsibilities.

Autonomy never widens authority.

### User-facing presentation preferences

Resolve presentation preferences only when they are material and not already known from durable user/project context.

Useful choices include:

- final report / review language;
- artifact language per artifact class;
- whether technical terms are preserved in the source language or translated/bilingual;
- whether code identifiers, paths, Issue/PR titles and other stable identifiers remain verbatim;
- decision-request format and desired report detail.

`report language != artifact language`. A project may intentionally keep public code/docs/PR metadata in one language while presenting user-facing summaries in another.

Treat these as durable preferences when the owning user/project wants them persisted; do not ask again every run. A task-specific override may narrow presentation for that task without changing unrelated project/user preferences.

## Phase 5 — Automation topology

Automation is optional. Add recurring/conditional execution only when there is a durable reason.

Before proposing physical tasks, decide:

- what logical lanes actually need recurrence or long-lived ownership;
- which roles can share one physical scheduler without breaking independence/throughput;
- which roles must remain distinct (for example Producer vs Independent Reviewer);
- desired cadence/trigger based on actual project need;
- durable state/continuation and no-op behavior;
- expected effect/maintenance burden.

Prefer fewer project-owned bindings over prompt proliferation. Do not create a physical task for every logical specialist by default.

### Project-owned prompt source rule

If a physical scheduler is used:

1. create or reuse a project-owned canonical prompt/binding source;
2. keep detailed shared semantics in Harness and detailed domain/product semantics in their project owners;
3. physical scheduler stores only:
   - repository/project identity and control ref;
   - project prompt-source path/key;
   - truly runtime-only/private parameters that cannot safely or meaningfully live in project source;
4. future prompt changes modify/review the project source first, then reconcile the existing physical task in place;
5. do not create replacement duplicate tasks merely because the prompt source changed;
6. public projects must not receive private identifiers/evidence solely to centralize prompt text.

## Phase 6 — Synthesis

Generate/update the smallest coherent project-owned artifact set.

Possible outputs include, only when needed:

- existing `AGENTS.md` / agent guide updates;
- minimal `.agent-harness/harness.*` binding;
- project/product North Star;
- requirements/constraints/non-goals;
- strategy/architecture/roadmap projection;
- validation/release conventions;
- project-owned Scheduled Task prompt source / desired-state;
- Decision Packet for unresolved human-owned choices.

Reuse existing canonical documents. Do not create parallel `requirements-v2`, `north-star-new`, or duplicate policy files when an owner already exists.

## Question selection

At each dialogue turn:

1. restore what is already known;
2. identify unresolved choices that can materially alter setup;
3. rank by dependency/unblocking value and user-specificity;
4. ask the smallest highest-value question or tightly related question group;
5. after the answer, update the working synthesis and continue only if material gaps remain.

Use 2–4 option choices with a recommendation when the credible option space is sufficiently closed. Include `Other` or use an open question when user-specific alternatives remain plausible.

## Human decision handling

A user-facing setup conversation should not surface implementation details that delegated/autonomous policy can safely resolve.

A decision remains pending only when it is genuinely user/owning-authority controlled or cannot be resolved from current evidence/authority. Pending decisions must be durable and re-surfaced until explicitly resolved or verified no longer required/superseded under the applicable continuity contract.

### Revisiting an existing user decision

An explicit `USER_DECISION` remains the current authoritative truth in its owned scope until the user or another valid owning authority changes it. It is not immune to later challenge.

Create a `CHANGE_RECOMMENDATION` only when materially new evidence or changed conditions could justify revising, narrowing, replacing, or retiring that decision. Useful triggers include:

- a prior assumption becoming false or materially weaker;
- effect/evaluation evidence showing the decision is ineffective or regressive;
- a simpler, safer, more maintainable or materially better option becoming available;
- a new dependency/platform/standard/cost/security/privacy constraint;
- conflict with a newer explicit user goal or higher-priority decision;
- recurring operational evidence showing disproportionate management/rework cost.

A useful change recommendation contains only decision-relevant material:

```text
current user decision
what materially changed
recommended replacement / narrowing
keep-current benefits and drawbacks
change benefits and drawbacks
migration / rollback impact
risk / cost / interoperability consequences
confidence / uncertainty / falsifier when material
recommendation
```

If applying the recommendation would change user-owned intent, create or update one durable `CHANGE_AUTHORIZATION_REQUIRED` decision keyed to the underlying choice. Do not mutate the decision first and ask afterward.

While authorization is pending:

- keep the current user decision authoritative;
- continue unrelated work allowed by current authority;
- revalidate the recommendation before each later relevant report;
- re-surface the same deduplicated request while still needed;
- close it as `RESOLVED`, `NO_LONGER_REQUIRED`, or `SUPERSEDED` only with actual evidence/authority;
- if the user rejects the change, preserve the existing decision and do not repeat the same request on unchanged evidence.

`AUTONOMOUS` does not by itself authorize rewriting explicit user decisions. Automatic revision is allowed only when an explicit current standing delegation already covers that decision class and scope.

## Validation

Before declaring setup complete, verify proportionally:

- generated artifacts do not contradict each other;
- user decisions are represented correctly and not mixed with inference;
- shared Harness policy was not copied into project files unnecessarily;
- project/domain policy did not leak into shared/public Harness;
- authority/autonomy boundaries are explicit enough for planned automation;
- requirements, North Star and development strategy are mutually coherent;
- validation/review/release assumptions are executable in the target environment or explicitly unresolved;
- user-facing report language and artifact-language policy are not accidentally conflated;
- automation prompt sources are project-owned when automation exists;
- existing project state was preserved or intentionally superseded with provenance.

## Completion / handoff

Return a compact setup summary containing:

```text
project goal / North Star
key requirements + constraints + non-goals
development strategy / major ownership boundaries
Harness composition
authority + autonomy model
presentation/reporting preferences when material
validation/review/release strategy
automation topology, if any
project artifacts created/updated
unresolved human decisions
```

The facilitator may then hand implementation to the applicable project owner. Setup completion is not implementation completion, review, adoption, publication, or effect proof.
