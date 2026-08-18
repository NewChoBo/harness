# Scheduled Automation Operation

Resource ID: `protocol/automation-operation`

This protocol defines the reusable safety and control contract for recurring or scheduled Harness execution. Scheduler-specific cadence and physical task population remain runtime configuration, not Harness semantic state.

## Source-of-truth contract

A physical Scheduled Task is a thin runtime binding. It may identify the repository, trusted control ref, repository-owned binding source, schedule, and runtime-only capability values. It must not become a second policy store.

At run start:

1. resolve the configured repository and trusted control ref;
2. freeze the exact control revision once;
3. load the repository-owned binding and all required canonical resources from that same snapshot;
4. restore only current durable state needed for the selected work;
5. verify ownership, authority, candidate/review identity, dependencies, and public-information safety before mutation.

If the configured binding or required canonical source is missing, unreadable, moved without a compatible binding update, or cannot be verified, terminate as `CONTROL_SOURCE_MISSING` / `CONTROL_SOURCE_UNVERIFIED`.

**Missing control source is never permission to reconstruct, restore, or recreate it from conversational memory, an archive, a previous repository generation, an old Scheduled Task prompt, or another consumer.**

## Repository generation / cutover safety

Repository name and branch name alone are insufficient proof that an old runtime contract is still valid after a repository replacement, clean-history migration, visibility cutover, or source-layout change.

A run encountering materially changed source layout must re-resolve the current repository truth. Old paths are stale evidence, not repair instructions. If compatibility cannot be established from current public/canonical resources, stop and escalate rather than recreating removed structure.

## Trusted-ref mutation discipline

For the Harness repository, `main` is the trusted integration ref.

- **Worker / Producer** — performs material source changes on a topic branch/candidate and opens or updates a PR. It never writes source files directly to `main`.
- **Supervisor** — restores/routs state, coordinates Issues/PRs/reviews, and may persist public-safe control/routing evidence. It does not implement source changes or write source files directly to `main`.
- **Independent Reviewer** — reviews the frozen exact candidate and persists a verdict/review record. It does not modify candidate source, rebase/sync it, or write source files directly to `main`.
- **Governor / Adopter** — integrates only an exact candidate with a fresh valid Independent Review and satisfied authority/safety gates, normally by merging the reviewed PR. It does not bypass the candidate/review lifecycle by directly editing `main`.

An emergency direct trusted-ref remediation is outside the ordinary automation path and requires explicit applicable higher/admin authority plus proportional verification.

## Failure, recovery, and reporting

Self-recovery is allowed inside current authority, but silent failure is not.

```text
FAILURE_OBSERVED
-> report material failure state to organizational/control owner
-> bounded self-recovery when safe and authorized
-> RECOVERED | DEGRADED | BLOCKED
-> unresolved BLOCKED state escalates upward
```

A GitHub Issue or durable work item is evidence/persistence, not proof that organizational reporting occurred. Creating an Issue does not end the responsibility to recover or hand off.

Repeated equivalent failures should be deduplicated by stable target/failure/blocker identity rather than creating per-run Issues/comments. The Supervisor re-evaluates unresolved failures, may reroute or choose a different bounded approach, and surfaces only genuine administrator/user-required decisions or actions to the Principal.

Unrelated authorized work continues unless the failure is a real prerequisite.

## Public repository boundary

When automation targets the public Harness repository, `protocol/public-information-boundary` applies to every source/Issue/PR/review/comment/log/artifact/release output. Non-public evidence stays at its private source and is generalized before any public persistence.

## Scheduler self-modification boundary

A run does not create, delete, enable, disable, or change cadence/population of physical Scheduled Tasks merely because the runtime exposes that capability. Task topology changes require the applicable explicit management authority outside the ordinary role execution.

## Completion

A material automation run ends with enough durable public-safe state for the next owner to know the exact target/candidate/control identity, verified outcome, validation/review state, unresolved blocker, recovery/escalation state, and next owner/action. `NO_ACTION` remains a valid terminal result when there is no material current work.
