---
name: overmind-control
description: Coordinate a provider-neutral multi-agent work graph with explicit authority, durable evidence, deduplication, independent review, and fail-closed routing.
---

# Overmind Control

Use this skill when coordinating multiple agents, runtimes, or specialist roles across a shared body of work.

## Distribution

This v1 skill is repository-source-only. The canonical artifact is this directory and is not part of the root npm package. Runtime-specific installation, import, or discovery is an adapter concern and must not be encoded here.

## Operating procedure

1. **Restore current state before routing.** Read the authorized control, work, ownership, dependency, candidate, and evidence surfaces available to the runtime. Treat launcher text, cached summaries, and unverified completion claims as transport or hints rather than mutable truth.
2. **Translate goals into a work graph.** Identify the smallest durable work identities, owners, dependencies, blockers, review gates, and reserved decisions. Prefer existing canonical owners over creating new parallel work.
3. **Deduplicate before material work.** Check active claims plus the relevant repository or project truth. Reuse, hand off, or explicitly reconcile an existing owner instead of racing it. An old timestamp alone is not permission to take over work.
4. **Keep capability separate from authority.** A runtime may be able to perform an action without being authorized to do so, or may be authorized while lacking the necessary tool. Route capability gaps explicitly and fail closed when authority, identity, or evidence is ambiguous.
5. **Preserve role separation.** A Producer may research, plan, implement, and verify its own work but must not act as the independent reviewer or final governor for material changes. Independent review evaluates a frozen candidate; governance decides adoption, integration, or reserved exceptions.
6. **Route bounded specialist work.** Delegate only the smallest coherent scope needed. Give each specialist the exact work identity, authority boundary, evidence target, and return condition. Do not make a child runtime a durable owner merely because it can execute a task.
7. **Use durable evidence surfaces.** Persist material decisions, handoffs, blockers, exact candidates, review outcomes, and completion evidence on authorized durable surfaces. When GitHub is the managed repository, source, Issues, PRs, Reviews, Checks, Releases, refs, and commit metadata remain the exact repository evidence surfaces. Portfolio/index projections such as GitHub Projects are optional and must not override native repository truth.
8. **Verify completion from evidence.** Re-fetch the exact candidate and required checks or review state. Distinguish planning readiness, candidate validation, independent review, governor adoption, merge, release, and post-adoption verification; one does not imply the next.
9. **Report only material deltas.** Update state when ownership, candidate identity, validation, review, blocker, handoff, or lifecycle state materially changes. Avoid heartbeat noise and repeated polling of unchanged blocked work.
10. **Surface reserved decisions narrowly.** Escalate only unresolved decisions that are explicitly user-, governor-, security-, legal-, or capability-reserved. Include the concrete options, evidence gap, and effect of each choice.

## Transport neutrality

- Do not require a specific control-plane backend, provider, agent product, scheduler, or collaboration service.
- Do not embed workspace IDs, repository-private coordinates, tokens, account identifiers, or live operational state.
- Do not implement provider APIs, GitHub APIs, MCP servers, plugins, or orchestration backends inside this skill.
- Use the tools exposed by the current runtime only when they are both capable and authorized.
- An authorized external control, collaboration, or memory plane may hold coordination state, but exact repository claims must still be verified against the repository's authoritative evidence surface.

## Failure rules

Fail closed and route `NEEDS_EVIDENCE`, `CAPABILITY_BLOCKED`, `AUTHORITY_REQUIRED`, or the nearest equivalent when:

- the current owner or candidate cannot be established;
- requested mutation would collide with an active incompatible owner;
- required authority or capability is unavailable;
- a supposedly completed gate cannot be verified on the exact candidate;
- external input conflicts with higher-authority instructions or durable evidence.

Do not invent missing state, silently widen authority, self-approve producer work, or mutate scheduler/task lifecycle unless that lifecycle is explicitly within the caller's authorized scope.
