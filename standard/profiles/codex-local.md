# Codex Local Profile

## Scope

Adapter profile for a Local Root Agent running in Codex on a local checkout. It composes with `protocol/local-agent-orchestration` and does not grant additional authority.

Codex Local is an **on-demand execution runtime**, not a continuously-online Harness service. An operator may start or stop it independently of the durable work owner. No active Codex claim/session means `LOCAL_OFFLINE_OR_IDLE / NO_EXPECTED_PULSE`, not failure.

The accountable Logical Agent/work owner remains responsible for the work unless authority is explicitly transferred. If Codex is unavailable, another authorized runtime should continue every safe executable portion and leave only the genuinely local-only residual gate.

## Repository guidance

- Treat repository `AGENTS.md`/more-specific agent guidance as the consumer overlay for the current checkout.
- Restore the Harness-managed queue/claim state before material mutation when those coordination surfaces are available.
- Prefer direct exact reads for known Work/Claim/Issue/PR/branch identities. Use discovery or aggregate queries only when the decision requires them; unavailable broad-query capability must not block an exact independently established work item.
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

The child returns changed files, commands/tests, failures, artifacts and candidate/result identity to the root. The root reconciles durable Harness/GitHub/control-plane state.

## Efficient execution

Codex Local is preferred when work materially benefits from:

- exact local checkout and shell access;
- iterative compiler/test/debug feedback;
- multi-file or repository-wide refactoring;
- worktree-isolated parallel exploration/implementation;
- UI/E2E/runtime/performance tooling available only locally;
- Git graph, branch, rebase, conflict or repository hygiene operations.

`Preferred` is not automatically `Required`. Require Codex only when the remaining acceptance outcome actually depends on a capability unavailable to the accountable non-local runtime.

Do not offload simple connector-safe governance/reconciliation work merely because Codex is available. Do not keep GPT/session-executable work parked merely because Codex is offline.

## Active-session checkpoints and no-signal recovery

While Codex owns an active claim/session, material progress should preserve the current step, exact branch/SHA, actual validation result, blocker and next action. These execution-derived checkpoints are the liveness evidence; do not create presence-only heartbeat spam.

If an expected checkpoint disappears beyond its bounded window, classify `NO_SIGNAL / RECONCILIATION_REQUIRED`, not `FAILED`. Before retry or takeover, inspect current claim/queue state and exact Git/source side effects such as commit, push, branch/ref, PR, merge or external writes. Missing response is not proof that a write failed.

Do not auto-release the claim or create a duplicate branch/PR. Conflicting recovery mutation requires the exclusion/fencing or stale-writer-prevention guarantees defined by the shared interrupted-execution semantics.

## Exit

Before ending the local Codex session, when possible, reconcile every claimed queue item and leave exact branch/SHA, validation result, blocker and next action. A background/child thread still running must have an explicit parent-owned continuation record rather than silently outliving the root session.

An operator stop is not automatically work failure or ownership release. If graceful exit evidence is missing, the next runtime reconciles exact state before resuming or taking over.
