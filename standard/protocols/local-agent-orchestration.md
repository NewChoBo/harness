# Local Agent Orchestration Protocol

## Purpose

Define how a local/code-native root agent executes Harness-managed work that requires an exact checkout, build/test/debug loops, UI/E2E/runtime reproduction, performance tooling, repository-wide refactors, Git graph operations, or other capabilities unavailable to a chat/session runtime.

This protocol is provider-neutral. Codex Local, Claude Code, and compatible coding agents may implement it through provider-specific profiles without changing the authority model.

## Core topology

```text
Principal / Governor / Supervisor
        -> Coding Agent Work Queue + Active Claim
        -> Local Root Agent
        -> ephemeral local workers / worktrees / subagents
        -> exact candidate + validation evidence
        -> producer-distinct Independent Reviewer
        -> Governor / adoption authority
```

The **Local Root Agent** is the managed execution boundary. A child worker, subagent, worktree, helper model, or agent-team member is an execution detail of that root unless it has separately granted durable Mission + Scope + Authority and its own canonical Harness identity.

Do not create a new Logical Agent merely because a provider supports subagents or multiple worktrees.

## Intake and batch selection

When invoked for managed work, the Local Root Agent must:

1. restore the governing repository guidance, Harness binding, Current Work, Coding Agent Work Queue, and Active Work Claims when available;
2. re-fetch exact GitHub repository/Issue/PR/branch/head state before mutation;
3. discard or supersede stale queue assumptions rather than executing them from memory;
4. select eligible work by current priority and dependency state, normally `P0 -> P1 -> P2 -> P3`;
5. prefer already-active capability handoffs and near-complete canonical branches/PRs before opening new work;
6. continue to the next independent eligible item when one item becomes blocked, unless the blocker is a real shared prerequisite or safety stop.

A single local session may process multiple queue items. Queue order does not grant authority and must be revalidated against current work/claim/GitHub state.

## Claim and mutation boundary

Before material mutation for each selected item:

- reuse or take over the canonical Active Claim after dedupe;
- set the runtime to the actual local runtime and record the real start/current step/next action;
- reuse the canonical Issue, branch, and PR when safe;
- do not create replacement branches merely to signal local ownership;
- freeze exact candidate identity before review or handoff;
- update claim/queue/GitHub lifecycle at material checkpoints and before session exit.

If coordination surfaces are unavailable, record `COORDINATION_VISIBILITY_GAP` where possible and avoid overlapping mutation when ownership is ambiguous.

## Delegation to ephemeral workers

The Local Root Agent may create local subagents, worktrees, helper sessions, or provider-native agent teams when this materially improves speed, isolation, or verification.

Every delegated worker must inherit a bounded delegation packet from the root containing, as applicable:

- parent work/claim identity;
- allowed repository/worktree;
- allowed files or subsystem;
- allowed tools and side effects;
- mutation authority;
- acceptance criteria;
- required validation/evidence;
- stop conditions and escalation conditions.

Child workers may **narrow** delegated scope but must not widen authority, adopt/release, mutate unrelated work, change reserved policy, or create further authority merely because the provider permits recursive delegation.

The Local Root Agent remains accountable for collision prevention, integrating child results, validating the final effective candidate, and publishing the durable Harness/GitHub/Notion evidence.

## Parallelism and worktree safety

Parallel work is allowed only when candidate scopes are demonstrably independent.

Prefer parallel workers for:

- read-only exploration or hypothesis testing;
- independent repositories;
- disjoint worktrees/branches with no shared generated state;
- independent test/benchmark matrices;
- bounded implementation slices with an explicit integration owner.

Serialize work when workers would mutate the same exact candidate, lockfile, shared generated artifact, release state, migration state, database, or other collision-prone resource.

If two workers converge on the same work identity, one must defer and report a dependency/collision rather than race.

## Root-owned execution loop

For implementation work, the root may run iterative local loops such as:

```text
inspect -> plan -> edit -> build/test -> inspect failure -> repair -> re-run -> freeze candidate
```

The root may delegate individual loop steps, but must not replace required execution evidence with a worker summary. Build/test/debug results must be derived from actual commands/environment artifacts.

Unavailable, skipped, cancelled, or unexecuted validation is not PASS.

## Provider profiles

Provider-specific profiles may define efficient mechanisms such as worktrees, subagents, hooks, rules, tool permissions, or agent teams. Profiles must not redefine shared authority, claim, review, or adoption semantics.

The provider profile is an adapter:

```text
Local Agent Orchestration Protocol
+ provider-specific execution profile
+ consumer repository overlay
+ task-specific bounded delegation
= effective local execution behavior
```

## Independent review boundary

A child worker created by a producer Local Root Agent is **not** producer-distinct merely because it has a separate context, model instance, worktree, or provider-native `review` label.

Producer-root children may perform first-party self-review, static analysis, adversarial checks, or test verification, but they cannot satisfy a required Independent Review gate.

A required producer-distinct review must be routed to an independently governed reviewer runtime/claim that did not produce or direct the candidate.

## Destructive and reserved operations

Provider capability never expands authority.

The Local Root Agent must stop and route upward when an operation requires a reserved decision not already delegated, including destructive history/ref rewrite, release/publish/tag authority, credential/account changes, irreversible external side effects, policy/authority expansion, or another Principal-reserved action.

A blocked reserved action should not stop unrelated eligible queue work.

## Batch completion and exit

Before the local session exits:

1. reconcile every selected queue row as `IN_PROGRESS`, `WAITING_REVIEW`, `BLOCKED`, `DONE`, or `SUPERSEDED` as appropriate;
2. update the canonical Active Claim with exact branch/SHA, current step, validation result, blocker, and next owner/action;
3. reconcile GitHub Issue/PR/branch lifecycle facts that the session is authorized to change;
4. preserve residual failures and required follow-up without inventing success;
5. leave enough exact evidence for a later runtime to resume without rediscovering the session.

Do not leave claimed work silently abandoned at session exit.

## Recommended one-command batch intent

A manually started local root may be given a thin launcher instruction equivalent to:

> Restore the Harness-managed coding-agent queue and active claims, revalidate exact GitHub state, then process all currently eligible work in priority/dependency order using this Local Agent Orchestration Protocol and the active provider profile. Use bounded local workers/worktrees when useful, preserve canonical claims/branches, never use producer children as independent reviewers, continue past independent blockers, and reconcile exact results before exit.
