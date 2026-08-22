# Roadmap

This document is a compact human-readable projection of the current NewChoBo Harness portfolio. It sequences work toward the canonical [`North Star`](north-star.md) without redefining the North Star, the operational Standard, or concrete WorkItem acceptance criteria.

Detailed capability semantics and acceptance criteria remain with the corresponding public GitHub Issues and exact candidate/evidence records. [Issue #22](https://github.com/NewChoBo/harness/issues/22) is the durable public owner of this roadmap projection.

Issue links in this file are **current semantic owners**, not numeric aliases or template coordinates. Live GitHub object existence, type, state, and current ownership are external evidence and must be reverified when a decision depends on them; deterministic repository validation must not pretend that frozen source can prove mutable GitHub state.

## Planning horizons

- **NOW** — actively sequenced outcome with a credible owner and prerequisite path.
- **NEXT** — decision-ready outcome that should follow current gates.
- **LATER** — valid capability or architecture intentionally deferred until stronger need exists.
- **RESEARCH** — unresolved question or opportunity requiring evidence before commitment.
- **PARKED / NEEDS_OWNER** — potentially useful direction without a current semantically matching public owner or sufficient promotion evidence.

Use dependency/evidence gates rather than arbitrary dates. Issue creation, a new paper, or a newly named capability does not by itself promote work.

## Current portfolio projection

| Horizon | Lane / outcome | Current public owner | Gate / promotion condition |
| --- | --- | --- | --- |
| **NOW** | Agent Security Boundary — keep untrusted input, memory, tool use, authority, and egress fail-closed | [#32](https://github.com/NewChoBo/harness/issues/32) | Promote external/community ingestion or broader autonomous tool exposure only after executable security-boundary evidence and producer-distinct review. |
| **NOW** | Standard catalog / corpus integrity — make normative resource identity and discovery self-validating | [#24](https://github.com/NewChoBo/harness/issues/24) | Reconcile canonical resources/projections and make deterministic validation reject orphan, duplicate, stale, or invalid registration. New normative resources must pass this gate. |
| **NOW** | Roadmap / owner-map currentness — keep the public strategic projection semantically aligned with live owners | [#22](https://github.com/NewChoBo/harness/issues/22) | Update only on material owner/gate/sequencing changes. Reverify mutable GitHub owner state externally before relying on it. |
| **NEXT** | Provider/runtime adapters and read-only external-auditor projection | [#25](https://github.com/NewChoBo/harness/issues/25) | Preserve role-first/provider-second composition; #24 remains the catalog prerequisite for new normative resources and #32 governs untrusted/external input and privileged-tool exposure. |
| **NEXT** | Organization, durable reporting, dependency routing, and escalation semantics | [#27](https://github.com/NewChoBo/harness/issues/27) | Prefer refinement of existing ownership-routing, supervisor, escalation, and receipt resources; use #24 if normative registration changes. |
| **NEXT** | Execution liveness and interrupted-work reconciliation | [#42](https://github.com/NewChoBo/harness/issues/42) | `NO_SIGNAL` must be bound to an exact positive execution expectation; conflicting takeover remains blocked without authoritative fencing/stale-writer prevention. Broader executable synthetic-regression acceptance remains with #42. |
| **NEXT** | Repository / CI / release supply-chain hardening | [#35](https://github.com/NewChoBo/harness/issues/35) | Enforce the repository-native protection, immutable workflow dependency, least-privilege, provenance, dependency/license, and release controls required by the exact release boundary. |
| **NEXT** | Legal/IP/publication governance | [#33](https://github.com/NewChoBo/harness/issues/33) | Publication remains held until the applicable rights/provenance, protected-disclosure, contributor/dependency, brand, and higher legal-review conditions are explicitly cleared. |
| **RESEARCH** | Evidence horizon / prior-art testing | **No permanent numeric owner projected here.** | Use an explicit current Research Topic or public Issue when a bounded question is active. Research may confirm, narrow, supersede, reject, or leave roadmap assumptions unchanged; activity alone is not progress. |
| **PARKED / NEEDS_OWNER** | Product / demand discovery pipeline | **No current semantically matching public owner.** | Do not reuse #25 as “Solution Discovery”; #25 owns provider/runtime adapter semantics. Create/promote a public owner only when autonomous demand discovery becomes a demonstrated need. |
| **PARKED / NEEDS_OWNER** | Broader extension / tool / trigger ecosystem | **No current semantically matching public owner.** | Do not reuse historical PR #17 as an Extensions owner. #25 may own provider/runtime adapter concerns only where they actually match. Promote broader ecosystem machinery only from concrete cross-provider/consumer evidence. |
| **PARKED / NEEDS_OWNER** | Generic `AgentDefinition` Core abstraction | **No separate owner.** | Portable Agent composition remains existing role + resolved workflow preset/composition semantics. Do not reuse #42 (liveness) or broaden #25/#27 unless concrete evidence justifies a distinct owner. |
| **PARKED / NEEDS_OWNER** | Generic software-delivery / CD platform | **No current `#51` owner.** | Keep release/deployment mechanics bounded to existing repository/release gates until a distinct reusable delivery capability is justified. |

## Delivered foundations are not live owner aliases

Closed Issues and merged PRs remain provenance, not current owner-map slots. For example, [#38](https://github.com/NewChoBo/harness/issues/38) delivered the Local Root Agent orchestration/provider-profile baseline through merged PR #39. Historical object numbers must not be relabeled to satisfy a roadmap table.

## Portfolio relationship

When the full path is applicable, keep the relationship simple:

```text
bounded research / current evidence
-> #22 roadmap sequencing
-> exact capability Issue owner
-> exact candidate validation / regression evidence
-> producer-distinct independent review
-> governor / applicable adoption authority
-> integration
-> #35 repository/release gate when applicable
-> #33 publication/legal-IP gate when applicable
-> current effect evidence
```

This relationship grants no implementation, review, adoption, publication, deployment, or release authority by itself. A PASS at one stage is evidence for the next decision, not proof that later gates are satisfied.

## Always-preserved gates

- Runtime/provider capability never grants Harness authority.
- Shared/public Harness material stays consumer-anonymous; private control/evidence stays on its authorized surface.
- [#24](https://github.com/NewChoBo/harness/issues/24) owns normative catalog/corpus integrity; roadmap projection does not redefine resource identity.
- [#32](https://github.com/NewChoBo/harness/issues/32) owns the cross-cutting Agent Security Boundary for untrusted-input/tool/memory/egress transitions.
- [#35](https://github.com/NewChoBo/harness/issues/35) owns concrete GitHub/release/supply-chain hardening, while [#33](https://github.com/NewChoBo/harness/issues/33) owns legal/IP/publication governance.
- Candidate, validation, review, adoption, integration, publication, release, and effect identities remain distinct; stale or subject-mismatched evidence cannot justify a later state.
- Before adding a package/resource/role/state/workflow, prefer reuse, consolidation, removal, a bounded local solution, or a provider/native standard when it already satisfies the need.

## Roadmap maintenance

Update this projection only on a material strategic delta: a prerequisite/effect/publication gate changes, ownership consolidates, evidence changes sequencing, or a capability is promoted/demoted/parked. Detailed requirement, security, context, evaluation, delivery, research, and implementation semantics stay in their owner Issues/resources rather than being copied here.

If a candidate owner is absent, ambiguous, closed, a PR rather than an Issue, or semantically mismatched, mark the lane `PARKED / NEEDS_OWNER` (or omit it) instead of inventing/reusing a numeric alias. If nothing material changed, leave the roadmap unchanged.
