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
4. restore only current durable state needed for the selected work;
5. verify ownership, authority, candidate/review identity, dependencies, and public-safety constraints before mutation.

If the configured binding or required canonical source is missing, unreadable, moved without a compatible migration, or cannot be verified, terminate as `CONTROL_SOURCE_MISSING` or `CONTROL_SOURCE_UNVERIFIED`.

**Missing control source is never permission to reconstruct, restore, delete-and-recreate, or replace it from conversational memory, archive history, an earlier repository generation, old Scheduled Task text, or another consumer.**

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

Ordinary role execution does not create, delete, enable, disable, or change cadence/population of physical Scheduled Tasks merely because runtime tooling exposes those controls. Task-topology changes require explicit management authority.

## Completion

A material automation run ends with enough durable public-safe state for the next owner to know the exact control/candidate identity, branch/PR state, verified outcome, validation/review state, unresolved blocker, recovery/escalation state, and next owner/action. `NO_ACTION` is valid when no material current work exists.
