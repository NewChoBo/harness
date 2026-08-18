# Scheduled Automation Operation

Resource ID: `protocol/automation-operation`

This protocol defines the reusable control contract for recurring or scheduled Harness execution. Scheduler-specific cadence and physical task population remain runtime configuration, not canonical Harness policy.

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

If the configured binding or required canonical source is missing, unreadable, moved without a compatible migration, or cannot be verified, terminate as `CONTROL_SOURCE_MISSING` or `CONTROL_SOURCE_UNVERIFIED`.

**Missing control source is never permission to reconstruct, restore, delete-and-recreate, or replace it from conversational memory, archive history, an earlier repository generation, old Scheduled Task text, or another consumer.**

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

- **Worker / Producer** — performs source changes on a topic/candidate branch distinct from the configured trusted integration ref and opens or updates a PR. Never directly authors source on the trusted ref.
- **Supervisor** — restores state, reconciles ownership/dependencies/branches, and routes work. It does not implement source or directly author the trusted ref.
- **Independent Reviewer** — reviews the frozen exact candidate and persists a verdict. It does not modify, rebase, or sync the candidate.
- **Governor / Adopter** — integrates only an exact candidate with a fresh valid producer-distinct review and satisfied gates, normally by merging the reviewed PR into the configured trusted ref. It does not bypass review by directly editing that ref.

An emergency direct trusted-ref remediation is outside ordinary automation and requires explicit applicable administrator authority plus proportional verification.

## Branch lifecycle

Automation performs material source changes on candidate/topic branches distinct from the configured trusted integration ref.

A candidate/topic branch may be removed only after verifying one of:

- its material delta is integrated into the configured trusted ref;
- it is fully superseded by an identified integrated/reviewed replacement;
- it is intentionally abandoned under current authority with no unique required delta.

Never classify a branch as cleanup-eligible merely because its name differs from `main`; first resolve whether it is the configured trusted integration ref, a protected release/integration ref, or an active governed work ref.

If a branch contains unfinished material work and is not actively owned, the Supervisor routes continuation to completion, validation, review, and integration rather than silently abandoning or deleting it.

After successful integration, remove the merged candidate branch when repository capabilities permit and verify ref absence before reporting cleanup complete.

## Failure, self-recovery, and upward reporting

Self-recovery is allowed within current authority, but silent failure is not.

```text
FAILURE_OBSERVED
-> report material failure state to organizational/control owner
-> bounded self-recovery when safe and authorized
-> RECOVERED | DEGRADED | BLOCKED
-> unresolved BLOCKED state escalates upward
```

A GitHub Issue is durable work/evidence, not proof that organizational reporting occurred. The highest applicable control owner re-evaluates unresolved failures and asks the administrator/user only when administrator authority, reserved judgment, credentials/access, or another genuinely human-only action is required.

Repeated equivalent failures are deduplicated by stable target/failure/blocker identity rather than creating per-run Issue/comment noise.

## Release tagging

Release/tag creation is separate from ordinary implementation/adoption authority.

When a higher management/Governor role has explicit standing release-tag authority, it may create a release tag only after verifying:

- the exact integrated trusted-ref commit;
- package/release version consistency;
- required CI/release checks and current release policy;
- no unresolved material review/blocker;
- expected tag-triggered release behavior.

Tagging must not be used to bypass candidate review, and a failed release workflow remains a material failure requiring diagnosis/reporting.

## Scheduler self-modification boundary

Ordinary role execution does not create, delete, enable, disable, or change cadence/population of physical Scheduled Tasks merely because the runtime exposes those controls. Task-topology changes require explicit management authority.

## Completion

A material automation run ends with enough durable public-safe state for the next owner to know the exact control/candidate identity, owned Issue/PR state, branch/review/integration state, verified outcome, validation state, unresolved blocker, recovery/escalation state, and next owner/action. `NO_ACTION` is valid when no material current work exists.
