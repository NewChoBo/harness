# Scheduled Automation Operation

Resource ID: `protocol/automation-operation`

This protocol defines safe recurring or scheduled Harness execution over repository work, review, failures, branch lifecycle, and releases. Scheduler-specific cadence and physical task population remain runtime configuration, not canonical Harness policy. This protocol does not expand role authority.

## Repository-owned bootstrap

A physical Scheduled Task is a thin runtime binding. A repository may project its standard role bindings at a repository-owned path such as:

```text
.newchobo/harness/scheduled-task-bindings.md
```

The concrete path is repository-local configuration. Once adopted as a repository binding source, it is required metadata rather than disposable generated output; removing, relocating, or replacing it is a material automation-contract migration.

At run start:

1. resolve the configured repository and trusted control ref;
2. freeze the exact control revision once;
3. load the repository-owned binding and every required canonical resource from that same snapshot;
4. restore current role-relevant open Issues/PRs plus only the durable state needed for the selected work;
5. reconcile existing ownership, candidate/branch/review/dependency/blocker state before creating new work;
6. verify authority and public-safety constraints before mutation.

If the configured binding or required canonical source is missing, unreadable, moved without a compatible migration, from a different repository generation, or cannot be verified, terminate as `CONTROL_SOURCE_MISSING` or `CONTROL_SOURCE_UNVERIFIED`.

**Missing control source is never permission to reconstruct, restore, delete-and-recreate, or replace it from conversational memory, archive history, an earlier repository generation, old Scheduled Task text, another consumer, or a stale branch.**

## One material action

Each run selects at most one highest-value material action. `NO_ACTION` is valid. Recurring schedules are not work-generation quotas.

Restore current Issues, PRs, branches, reviews, checks, release state, continuations, failures, and dependencies before selection. Live state overrides stale checkpoints.

## Role-owned Issue lifecycle

Every recurring role is responsible for the lifecycle of Issues that are genuinely inside that role's current scope/ownership. This is scoped ticket awareness, not a requirement for every role to sweep the entire repository backlog.

At each run, before selecting new work:

1. inspect current open Issues and PRs relevant to the role's scope, including explicitly assigned/routed work and durable handoffs;
2. restore any existing owned Issue before creating a duplicate work item;
3. reconcile the Issue against current branch/PR/review/CI/integration/effect evidence;
4. continue or recover owned unfinished work when it remains valid and actionable;
5. when the Issue's current done/acceptance criteria are verified **and every required linked source-change review/integration gate for that Issue is satisfied**, persist only useful completion evidence and close the owned Issue in the same run when capability and authority permit;
6. when an owned Issue is duplicate, superseded, or no longer required, close it only after identifying the current replacement/evidence and when that disposition is within role authority;
7. if the Issue belongs to another role/owner, do not close or silently take it over—route/handoff it to the proper owner and preserve the dependency/blocker relation.

For a source-change Issue, an open linked PR normally means the Issue remains open while required review/integration is unresolved. A repository may define an explicit implementation-only Issue whose done state is a durable handoff to another owned work item, but that handoff must be explicit; do not infer it merely because a producer finished coding.

A role must not leave a verified-complete Issue open merely because implementation or merge finished. Conversely, a merged PR or a completion report alone is not enough to close an Issue unless its actual acceptance criteria are satisfied.

Issue comments are delta/evidence surfaces, not mandatory heartbeat logs. Do not emit unchanged per-run status comments. Closing an Issue is a lifecycle action, not a substitute for required upward failure reporting or post-adoption effect validation.

## Source-layout and cleanup safety

A cleanup, migration, recursive-improvement, or repository-normalization run must distinguish:

- required product/source/metadata contracts;
- generated or disposable artifacts;
- stale branches/candidates;
- private/consumer-local material that does not belong in a public repository.

A dot-prefixed vendor directory is not inherently private or disposable. Repository-owned metadata must be classified from current repository truth and its canonical owner, not from naming heuristics alone.

Before deleting or moving a required path, the acting role must identify the current canonical owner, dependent physical/runtime pointers, validation coverage, migration/rollback plan, and exact reviewed replacement. Unknown ownership or dependency state fails closed.

## Trusted-ref mutation discipline

The repository binding defines one trusted integration ref (for example `main`, `master`, `trunk`, or a governed release/integration branch). Shared Harness semantics refer to that configured trusted ref rather than assuming a branch name.

For material source changes:

```text
current trusted-ref exact SHA
-> one short-lived topic branch
-> implementation and validation
-> frozen candidate
-> producer-distinct review
-> adoption authority
-> expected-head integration to trusted ref
-> verify trusted ref
-> close/update owner when actually done
-> delete merged head branch
```

- **Worker / Producer** — performs source changes on a topic/candidate branch distinct from the configured trusted integration ref and opens or updates a PR. Never directly authors source on the trusted ref.
- **Supervisor** — restores state, reconciles ownership/dependencies/branches, and routes work. It does not implement source or directly author the trusted ref.
- **Independent Reviewer** — reviews the frozen exact candidate and persists a verdict. It does not modify, rebase, or sync the candidate.
- **Governor / Adopter** — integrates only an exact candidate with a fresh valid producer-distinct review and satisfied gates, normally by merging the reviewed PR into the configured trusted ref. It does not bypass review by directly editing that ref.

An emergency direct trusted-ref remediation is outside ordinary automation and requires explicit applicable administrator authority plus proportional verification.

## Branch lifecycle

- Restore and continue one existing valid branch/PR before opening a duplicate.
- Interrupted work remains active only when its owner, scope, candidate, and continuation are still valid.
- A candidate/topic branch may be removed only after verifying that its material delta is integrated, fully superseded by an identified integrated/reviewed replacement, or intentionally abandoned under current authority with no unique required delta.
- Never classify a branch as cleanup-eligible merely because its name differs from `main`; first resolve whether it is the configured trusted integration ref, a protected release/integration ref, or an active governed work ref.
- If a branch contains unfinished material work and is not actively owned, the Supervisor routes continuation to completion, validation, review, and integration rather than silently abandoning or deleting it.
- Superseded, empty, merged, or experiment-only branches are closed/deleted only after verifying no unique required delta remains.
- A merged branch that remains because cleanup failed is cleanup debt, not a new work source.
- No role treats deleting/recreating files on the trusted ref as routine reconciliation.
- After successful integration, remove the merged candidate branch when repository capabilities permit and verify ref absence before reporting cleanup complete.

Repository branch/ruleset protection should enforce the same boundary where the hosting platform permits it.

## Failure, self-recovery, and upward reporting

`SELF_RECOVERY_ALLOWED != SILENT_FAILURE_ALLOWED`.

A material failure records a bounded public-safe or private-scoped handoff containing the work/target identity, affected stage, impact, attempted recovery class, current state, blocker fingerprint when useful, and accountable next owner. Do not persist private chain-of-thought.

```text
FAILURE_OBSERVED
-> report material failure state to organizational/control owner
-> bounded recovery inside current authority
-> RECOVERED | DEGRADED | BLOCKED
-> accountable higher owner is informed
-> unresolved responsibility is rerouted/escalated
-> Principal/admin is interrupted only when a reserved human action remains
```

A GitHub Issue is durable work/evidence, not proof that organizational reporting occurred. Retries are finite and deduplicated. Repeated failure with the same approach triggers decomposition, dependency/capability/authority/state-model analysis, alternative routing, or rollback rather than blind repetition. Unrelated authorized work continues unless the failure is a real prerequisite or safety stop.

## Scheduled-task reconciliation

Repository desired state and manager runtime state are compared by stable task identity, role/binding, enabled state, cadence, and prompt source.

- Update existing physical tasks in place.
- Do not create replacements when a unique matching task exists.
- Task-manager prompt text remains a thin pointer.
- Population/cadence changes require explicit applicable authority and normal review.
- The task itself must not modify its own population or cadence.

## Release tagging

Release/tag creation is separate from ordinary implementation/adoption authority.

A top-level management/Governor role may create a SemVer release tag, with or without a conventional leading `v`, only when explicit standing release-tag authority covers the repository and release class.

Before tagging, verify:

- the target is the exact current trusted-ref commit at tag creation time;
- all release source changes were integrated through reviewed PRs;
- required exact-SHA CI/release checks are green and no material review/blocker remains;
- every publishable package uses the tag version after removing an optional leading `v`;
- public-information and package-content checks pass;
- the tag and GitHub Release do not already exist;
- required registry versions do not already exist, or the release workflow can safely skip them idempotently;
- release notes and metadata are public-safe;
- rollback/remediation ownership is clear.

The management/Governor role pushes only the verified tag. Tag push, not a GitHub Release publication event, is the automatic release entrypoint. The repository release workflow owns package publication and GitHub Release creation.

The workflow must validate the immutable tag source and require it to remain in trusted-ref ancestry. Exact-trusted-ref applies at tag creation; a later reviewed trusted-ref advance does not invalidate an already-created in-flight release whose immutable tag source remains in ancestry. A failed release workflow remains a material failure requiring diagnosis/reporting and may be resumed idempotently when its release contract permits.

Tagging does not authorize source edits, direct package publication, deployment, scheduler topology changes, or bypass of a reserved release decision.

## Scheduler self-modification boundary

Ordinary role execution does not create, delete, enable, disable, or change cadence/population of physical Scheduled Tasks merely because the runtime exposes those controls. Task-topology changes require explicit management authority.

## Effect and recursive improvement

After material adoption, observe whether the mechanism reduces early exit, overwork, stale branches, failure silence, prompt drift, or release errors without increasing ceremony/noise. Regressive or duplicate machinery is narrowed, removed, or superseded through the same lifecycle.

## Completion

A material automation run ends with enough durable public-safe state for the next owner to know the exact control/candidate identity, owned Issue/PR state, branch/review/integration state, verified outcome, validation state, unresolved blocker, recovery/escalation state, and next owner/action. `NO_ACTION` is valid when no material current work exists.
