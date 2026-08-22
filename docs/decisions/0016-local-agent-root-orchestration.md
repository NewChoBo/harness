# 0016 — Local Root Agent owns provider-native child orchestration

Status: Accepted

## Context

Harness-managed work is increasingly split between chat/session runtimes that are strong at planning, governance, evidence routing and repository coordination, and local/code-native runtimes that can perform exact checkout, build/test/debug, UI/E2E, performance, Git-graph and large refactor loops.

Codex Local and Claude Code can also create multiple local agents, worktrees, subagents or agent teams. Treating every provider-native child as a first-class central Logical Agent would duplicate transient topology in the control plane, while ignoring child behavior entirely would leave authority, collision and review boundaries underspecified.

Local coding runtimes are also operationally different from continuously scheduled services: an operator may start or stop them on demand, and their absence must not become a reason to park work that another authorized runtime can safely execute.

## Decision

Use the **Local Root Agent** as the Harness-managed code-native execution boundary, not as an automatic durable domain/work owner.

The accountable Logical Agent or other governing work owner retains responsibility unless authority is explicitly transferred through normal Harness semantics. The root may batch-process multiple eligible Coding Agent Work Queue items, may parallelize independent work, and remains accountable for claim takeover, collision prevention, final candidate validation, durable evidence, and session-exit reconciliation while it is active.

Local roots are on-demand execution capabilities. A positive local pulse expectation exists only when an exact expected-execution, lease, or run-expectation identity, an explicit expectation/observer source, and a bounded observation window or deadline can all be named. An active claim/session alone is insufficient. Without that complete operand, the idle/offline runtime is not classified as failed or `NO_SIGNAL`. Prefer Local only when a code-native loop materially improves execution/verification or when the remaining acceptance outcome truly depends on an unavailable local capability. Otherwise the accountable GPT/chat/session runtime continues every safe executable portion and leaves only the local-only residual gate.

When the checkpoint named by a verified active execution expectation is absent after its bounded window, classify the condition as `NO_SIGNAL / RECONCILIATION_REQUIRED`, not automatic failure or ownership release. Reconcile exact provider/runtime, claim, source and external side-effect state before retry or takeover. Reconciliation of stale/interrupted/abandoned coordination state can repair ownership metadata, but it does not by itself authorize conflicting successor mutation. Such mutation remains blocked until authoritative predecessor exclusion/fencing or an equivalent exact stale-writer-prevention invariant is established.

Provider-native children are ephemeral execution workers by default. They inherit a bounded parent delegation packet and do not receive independent durable authority merely because the provider creates a separate context, process, worktree or model instance.

Provider-specific behavior is expressed through thin profiles over a provider-neutral orchestration protocol.

A child created or directed by a producer root cannot satisfy a required producer-distinct Independent Review gate. Independent review remains separately governed.

Coordination should prefer exact reads when the work/claim/source identity is already known. Search/discovery and broad set aggregation are supporting capabilities, not universal prerequisites; inability to prove a required complete aggregate fails closed that aggregate conclusion without blocking unrelated exact work.

## Consequences

- GPT/OVERMIND or another accountable runtime can prepare and execute every safe work slice without pretending to possess unavailable local capabilities.
- One manually started local session can consume multiple prepared tasks rather than requiring one launch per Issue.
- Keeping a local agent continuously online is not a Harness requirement.
- Local absence does not turn GPT-executable work into a capacity blocker; only the true environment-bound residual remains local-gated.
- An interrupted local session is reconciled from exact state before recovery, reducing duplicate branch/PR/write and stale-owner risks.
- Codex worktrees, Claude Code subagents/teams and future provider features can be used without making provider topology canonical.
- Central control registries remain small and authority-oriented instead of mirroring transient workers.
- Root agents must publish truthful material checkpoints when a verified execution expectation is active; silent abandoned child work is invalid, while a manually stopped idle root without a positive run expectation is not itself a failure.
- Parallelism requires explicit collision reasoning; same-candidate/shared-state mutation remains serialized and fenced before conflicting takeover.
- Plan-limited or unavailable broad-query capability does not become a hidden dependency of exact single-work execution.

## Adoption and refinement

The base Local Root topology was adopted through merged PR #39. Later interrupted-execution/liveness work under the existing execution-reconciliation owner refines the local specialization without changing the core authority topology: on-demand Local lifecycle, explicit run-expectation operands, exact-state reconciliation, fenced takeover, and safe fallback remain provider-neutral consequences of this accepted decision.
