# Claude Code Profile

## Scope

Adapter profile for a Local Root Agent running in Claude Code. It composes with `protocol/local-agent-orchestration` and does not grant additional authority.

## Repository guidance

- Treat repository `CLAUDE.md`, scoped Claude Code rules, and the consumer repository's Harness binding as local execution guidance within their existing authority.
- Restore the Harness queue/claim state and exact GitHub state before material mutation when those surfaces are available.
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

## Exit

Before ending the Claude Code root session, reconcile each selected queue item and canonical Active Claim. Preserve exact branch/SHA, validation status, residual blockers, worker results that matter to the final candidate, and the next owner/action.
