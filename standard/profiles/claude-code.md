# Claude Code Profile

## Scope

Adapter profile for a Local Root Agent running in Claude Code. It composes with `protocol/local-agent-orchestration` and does not grant additional authority.

Claude Code is an **on-demand execution runtime**, not a continuously-online Harness service. An operator may start or stop it independently of the durable work owner. Without a positive exact expected-execution, lease, or run-expectation identity plus an explicit observer/source and bounded observation window, there is no expected Claude Code pulse; an active claim/session alone does not establish `NO_SIGNAL` eligibility.

The accountable Logical Agent/work owner remains responsible for the work unless authority is explicitly transferred. If Claude Code is unavailable, another authorized runtime should continue every safe executable portion and leave only the genuinely local-only residual gate.

## Repository guidance

- Treat repository `CLAUDE.md`, scoped Claude Code rules, and the consumer repository's Harness binding as local execution guidance within their existing authority.
- Restore the Harness queue/claim state and exact GitHub state before material mutation when those surfaces are available.
- Prefer direct exact reads for known Work/Claim/Issue/PR/branch identities. Use discovery or aggregate queries only when the decision requires them; unavailable broad-query capability must not block an exact independently established work item.
- Provider-native instructions, hooks, tools, or subagent definitions may specialize execution but cannot widen Harness authority.

## Subagents and agent teams

Claude Code subagents may be used as ephemeral workers for bounded exploration, implementation, testing, verification, or specialist tasks.

If provider-native agent-team functionality is enabled, treat the team lead as the Local Root Agent and teammates as ephemeral workers unless a teammate independently satisfies the full durable Logical Agent test: Mission + Scope + Authority + persistent Report/Memory, with its own canonical Harness identity established by the governing control plane. An Active Claim is coordination state and does not satisfy that promotion test.

Agent-team availability is an execution capability, not a required Harness dependency. The root must continue to work correctly when only ordinary subagents or a single session are available.

## Permission and tool boundary

Use provider-native tool restrictions/permissions to narrow worker access when practical. A delegated worker should receive only the tools and mutation surface required by its task.

Hooks, rules, or permission configuration do not create new adoption, release, reviewer, credential, or policy authority.

## Delegation packet

Before delegating, provide the child with at least:

- parent Work Identity / Active Claim;
- repository and branch/worktree scope;
- target subsystem/files;
- allowed tools/side effects;
- acceptance criteria and required evidence;
- stop/escalation conditions.

The child reports changed files, commands/tests, failures, artifacts and exact result/candidate identity to the root. The root owns durable coordination reconciliation.

## Parallel execution

Parallel Claude Code workers are appropriate for independent investigations, disjoint implementation scopes, or separate test matrices. Serialize mutation of the same candidate, lockfile, release state, generated state, migration state, or other collision-prone resource.

A teammate/subagent created or directed by a producer root cannot satisfy a required producer-distinct Independent Review gate.

## Efficient execution

Claude Code is preferred when its local repository/runtime loop materially improves implementation or verification quality. `Preferred` is not automatically `Required`; require the local runtime only when the remaining acceptance outcome actually depends on a capability unavailable to the accountable non-local runtime.

Do not park connector-safe analysis, governance, lifecycle reconciliation, or other safely executable work merely because the local runtime is absent.

## Active-session checkpoints and no-signal recovery

An active claim/session is coordination evidence, not by itself a liveness expectation. `NO_SIGNAL` may be evaluated only when an observer can identify the exact expected execution/lease/run expectation, its expectation and observer source, and the bounded window/deadline for a named material checkpoint.

While such a verified expected Claude Code execution is active, material progress should preserve the current step, exact branch/SHA, actual validation result, blocker and next action. These execution-derived checkpoints are liveness evidence; do not create presence-only heartbeat spam.

If the checkpoint named by that expectation is absent after its bounded window, classify `NO_SIGNAL / RECONCILIATION_REQUIRED`, not `FAILED`. If the expectation operand cannot be established, use `LOCAL_OFFLINE_OR_IDLE / NO_EXPECTED_PULSE` or `UNKNOWN / NEEDS_EVIDENCE` as appropriate instead of inferring a missed pulse. Before retry or takeover, inspect current claim/queue state and exact Git/source side effects such as commit, push, branch/ref, PR, merge or external writes. Missing response is not proof that a write failed.

Do not auto-release the claim or create a duplicate branch/PR. Reconciliation of stale/interrupted/abandoned coordination state may repair claim ownership, but it does not authorize conflicting successor mutation. Conflicting recovery mutation requires authoritative predecessor exclusion/fencing or equivalent exact stale-writer prevention defined by the shared interrupted-execution semantics.

## Exit

Before ending the Claude Code root session, when possible, reconcile each selected queue item and canonical Active Claim. Preserve exact branch/SHA, validation status, residual blockers, worker results that matter to the final candidate, and the next owner/action.

An operator stop is not automatically work failure or ownership release. If graceful exit evidence is missing, the next runtime reconciles exact state before resuming or taking over.
