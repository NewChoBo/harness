# Local Agent Orchestration Protocol

## Purpose

Define how a local/code-native root agent executes Harness-managed work that requires an exact checkout, build/test/debug loops, UI/E2E/runtime reproduction, performance tooling, repository-wide refactors, Git graph operations, or other capabilities unavailable to a chat/session runtime.

This protocol is provider-neutral. Codex Local, Claude Code, and compatible coding agents may implement it through provider-specific profiles without changing the authority model.

## Core topology

```text
Principal / Governor / Supervisor
        -> accountable Logical Agent / work owner
        -> Coding Agent Work Queue + Active Claim
        -> Local Root Agent
        -> ephemeral local workers / worktrees / subagents
        -> exact candidate + validation evidence
        -> producer-distinct Independent Reviewer
        -> Governor / adoption authority
```

The **Local Root Agent** is the managed code-native execution boundary. It is not automatically the durable domain/work owner. The accountable Logical Agent or other governing work owner retains responsibility unless authority is explicitly transferred through the normal Harness lifecycle.

A child worker, subagent, worktree, helper model, or agent-team member is an execution detail of that root unless it independently satisfies the full durable Logical Agent test: Mission + Scope + Authority + persistent Report/Memory, with its own canonical Harness identity established by the governing control plane.

An Active Claim is coordination state. It does not by itself grant Logical Agent identity or authority.

Do not create a new Logical Agent merely because a provider supports subagents or multiple worktrees.

## On-demand availability and routing

A Local Root Agent is an **on-demand execution capability**, not a continuously-online Harness service. An operator may start or stop the local runtime independently of the durable work owner.

When no exact local claim, lease, or externally observable active local session exists, treat the runtime as `LOCAL_OFFLINE_OR_IDLE / NO_EXPECTED_PULSE`, not as failed.

Prefer the smallest safe capable runtime for each work slice:

- keep work with the accountable chat/session/GPT-style owner when that runtime can safely execute and verify the acceptance outcome;
- use an `EITHER` or local-preferred route when a code-native loop materially improves speed or verification quality but is not required for correctness;
- require Local only when the remaining acceptance outcome genuinely depends on an unavailable code-native capability such as exact checkout/build/test/debug, native/UI/E2E/runtime reproduction, performance tooling, release mechanics, or another environment-bound operation.

Local unavailability must not park work that another authorized runtime can safely advance. Continue analysis, design, bounded source/lifecycle work, evidence preparation, or other executable portions with the accountable owner and isolate only the true local-only residual gate.

Queue routing is therefore reversible. A previously local-routed item may be narrowed or reclaimed when its remaining work no longer requires the local capability.

## Intake and batch selection

When invoked for managed work, the Local Root Agent must:

1. restore the governing repository guidance, Harness binding, Current Work, Coding Agent Work Queue, and Active Work Claims when available;
2. prefer direct exact reads when the work, claim, Issue, PR, branch, or candidate identity is already known;
3. use bounded search/discovery when the exact identity is not known, and use broad set/database aggregation only when the decision actually requires complete set-level evidence;
4. re-fetch exact GitHub repository/Issue/PR/branch/head state before mutation;
5. discard or supersede stale queue assumptions rather than executing them from memory;
6. select eligible work by current priority and dependency state, normally `P0 -> P1 -> P2 -> P3`;
7. prefer already-active capability handoffs and near-complete canonical branches/PRs before opening new work;
8. continue to the next independent eligible item when one item becomes blocked, unless the blocker is a real shared prerequisite or safety stop.

A single local session may process multiple queue items. Queue order does not grant authority and must be revalidated against current work/claim/GitHub state.

Optional discovery/aggregation capability must not become a hidden prerequisite for exact single-work execution. If a broad query/search/aggregation feature is unavailable, rate-limited, or plan-limited, continue exact work when its identity and authority can be established through direct reads. When a decision genuinely requires complete population/set coverage and that coverage cannot be proven, fail closed only that aggregate claim as `UNKNOWN` / `NEEDS_EVIDENCE` rather than blocking unrelated exact work.

## Local liveness and interrupted execution

A local liveness expectation exists only while an exact active local claim/lease/session is externally evidenced. Do not infer a missed pulse from an idle or manually stopped local runtime with no active execution expectation.

While local execution is active, use normal material execution evidence as checkpoints rather than heartbeat spam. Useful checkpoints include:

- current work/claim step and next action;
- exact branch/ref/candidate SHA;
- actual build/test/debug/validation result;
- queue or claim lifecycle transition;
- durable receipt/report/checkpoint evidence when the governing control plane uses it.

If an expected material checkpoint exceeds its bounded observation window, classify the situation as `NO_SIGNAL / RECONCILIATION_REQUIRED`, not `FAILED`.

`NO_SIGNAL` alone must not:

- prove that no work or side effect occurred;
- automatically release or transfer the active claim;
- create a replacement branch, PR, external object, or duplicate work identity;
- authorize conflicting successor mutation.

Before retry, resume, or takeover, re-read the applicable truth surfaces: provider/runtime execution state when observable, Current Work/claim/queue, branch/ref/SHA, commit/push/PR/merge/CI state, and any external write that may have completed before the final response/checkpoint disappeared.

Never assume `no response == write failed`. Reuse exact identities and preconditions when possible.

Conflicting successor mutation after a missing signal requires authoritative exclusion/fencing or an equivalent exact stale-writer-prevention invariant appropriate to the target. If that cannot be established, non-conflicting inspection/projection repair may continue, but conflicting takeover remains `NEEDS_EVIDENCE` / `HANDOFF_REQUIRED`.

These semantics specialize the provider-neutral interrupted-execution/reconciliation owner; they do not create a second liveness state machine.

## Claim and mutation boundary

Before material mutation for each selected item:

- if this root already owns the canonical Active Claim, reuse it;
- otherwise take over that claim only after an explicit capability/ownership handoff authorizes transfer, or after evidence-backed reconciliation establishes the prior owner as stale, interrupted, abandoned, completed elsewhere, or otherwise no longer permitted to perform conflicting mutation;
- treat dedupe as collision evidence only, not ownership-transfer authority; when ownership remains ambiguous, stop with `CLAIM_RECONCILIATION_REQUIRED` rather than overlap mutation;
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

The Local Root Agent remains accountable for collision prevention, integrating child results, validating the final effective candidate, and publishing the durable Harness/GitHub/control-plane evidence.

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

The operator may stop an on-demand local session at any time, so material progress should leave durable checkpoints sufficient for safe reconciliation rather than depending on graceful shutdown alone.

Before the local session exits, when possible:

1. reconcile every selected queue row as `IN_PROGRESS`, `WAITING_REVIEW`, `BLOCKED`, `DONE`, or `SUPERSEDED` as appropriate;
2. update the canonical Active Claim with exact branch/SHA, current step, validation result, blocker, and next owner/action;
3. reconcile GitHub Issue/PR/branch lifecycle facts that the session is authorized to change;
4. preserve residual failures and required follow-up without inventing success;
5. leave enough exact evidence for a later runtime to resume without rediscovering the session.

A manually stopped session is not automatically a failed work item and does not by itself release ownership. If exit reconciliation is missing, use the `NO_SIGNAL / RECONCILIATION_REQUIRED` procedure before any conflicting recovery.

Do not leave claimed child work silently abandoned at session exit.

## Recommended one-command batch intent

A manually started local root may be given a thin launcher instruction equivalent to:

> Restore the durable coordination state for coding-agent work and active claims, revalidate exact repository/GitHub state, then process the highest-priority currently eligible code-native work using this Local Agent Orchestration Protocol and the active provider profile. Prefer exact known-identity reads over broad discovery, use bounded local workers/worktrees when useful, preserve canonical claims/branches, never use producer children as independent reviewers, continue past independent blockers, checkpoint material progress, and reconcile exact results before exit. If a broader coordination query is unavailable, continue exact work whose identity and authority are independently established.
