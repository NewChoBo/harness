# Codex Local Profile

## Scope

Adapter profile for a Local Root Agent running in Codex on a local checkout. It composes with `protocol/local-agent-orchestration` and does not grant additional authority.

## Repository guidance

- Treat repository `AGENTS.md`/more-specific agent guidance as the consumer overlay for the current checkout.
- Restore the Harness-managed queue/claim state before material mutation when those coordination surfaces are available.
- Use the actual repository commands and environment; do not substitute narrative confidence for build/test output.

## Multi-agent and worktree use

When Codex provides multiple agent threads or worktree isolation, the root may use them for independent work under the protocol's ephemeral-worker rules.

Prefer isolated worktrees for parallel source mutation when branches/scopes are independent. Do not run two workers against the same exact candidate or shared mutable build/release state merely because worktree support exists.

A Codex child thread/worktree remains a producer-root child for review-independence purposes unless it is separately governed as an Independent Reviewer outside the producer root.

## Delegation packet

Before assigning a child agent, give it a bounded packet containing at least:

- parent Work Identity / Active Claim;
- repository and worktree/branch;
- target files/subsystem;
- task acceptance criteria;
- required commands/evidence;
- prohibited side effects and stop conditions.

The child returns changed files, commands/tests, failures, artifacts and candidate/result identity to the root. The root reconciles durable Harness/GitHub/Notion state.

## Efficient execution

Codex Local is preferred when work materially benefits from:

- exact local checkout and shell access;
- iterative compiler/test/debug feedback;
- multi-file or repository-wide refactoring;
- worktree-isolated parallel exploration/implementation;
- UI/E2E/runtime/performance tooling available only locally;
- Git graph, branch, rebase, conflict or repository hygiene operations.

Do not offload simple connector-safe governance/reconciliation work merely because Codex is available.

## Exit

Before ending the local Codex session, reconcile every claimed queue item and leave exact branch/SHA, validation result, blocker and next action. A background/child thread still running must have an explicit parent-owned continuation record rather than silently outliving the root session.
