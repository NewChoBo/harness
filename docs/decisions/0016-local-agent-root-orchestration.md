# 0016 — Local Root Agent owns provider-native child orchestration

Status: Proposed

## Context

Harness-managed work is increasingly split between chat/session runtimes that are strong at planning, governance, evidence routing and repository coordination, and local/code-native runtimes that can perform exact checkout, build/test/debug, UI/E2E, performance, Git-graph and large refactor loops.

Codex Local and Claude Code can also create multiple local agents, worktrees, subagents or agent teams. Treating every provider-native child as a first-class central Logical Agent would duplicate transient topology in the control plane, while ignoring child behavior entirely would leave authority, collision and review boundaries underspecified.

## Decision

Use the **Local Root Agent** as the Harness-managed local execution boundary.

Provider-native children are ephemeral execution workers by default. They inherit a bounded parent delegation packet and do not receive independent durable authority merely because the provider creates a separate context, process, worktree or model instance.

The root may batch-process multiple eligible Coding Agent Work Queue items, may parallelize independent work, and remains accountable for claim takeover, collision prevention, final candidate validation, durable evidence, and session-exit reconciliation.

Provider-specific behavior is expressed through thin profiles over a provider-neutral orchestration protocol.

A child created or directed by a producer root cannot satisfy a required producer-distinct Independent Review gate. Independent review remains separately governed.

## Consequences

- GPT/OVERMIND can prepare plans, acceptance criteria and queue entries without pretending to possess local execution capability.
- One manually started local session can consume multiple prepared tasks rather than requiring one launch per Issue.
- Codex worktrees, Claude Code subagents/teams and future provider features can be used without making provider topology canonical.
- Central Notion/Agent registries remain small and authority-oriented instead of mirroring transient workers.
- Root agents must publish truthful exact state before exit; silent abandoned child work is invalid.
- Parallelism requires explicit collision reasoning; same-candidate/shared-state mutation remains serialized.
