# Roadmap

This document is a compact human-readable projection of the current Agent Harness portfolio. It sequences work toward the canonical [`North Star`](north-star.md) without redefining the North Star, the operational Standard, or concrete WorkItem acceptance criteria.

Detailed capability semantics, current work state, and acceptance criteria remain with the corresponding GitHub Issues and exact candidate/evidence records. Portfolio decisions are owned by [#46](https://github.com/<template-org>/<template-repo>/issues/46); this file records only horizon, lane, outcome, owner, and the gate that would justify promotion or demotion.

## Planning horizons

- **NOW** — actively sequenced outcome with a credible owner and prerequisite path.
- **NEXT** — decision-ready outcome that should follow current gates.
- **LATER** — valid capability or architecture intentionally deferred until stronger need exists.
- **RESEARCH** — unresolved question or opportunity requiring evidence before commitment.
- **PARKED / REJECTED** — duplicate, superseded, overdesigned, or currently unjustified direction.

Use dependency/evidence gates rather than arbitrary dates. Issue creation, a new paper, or a newly named capability does not by itself promote work.

## Current portfolio projection

| Horizon | Lane / outcome | Primary owner(s) | Gate / promotion condition |
| --- | --- | --- | --- |
| **NOW** | Correctness / Evidence — verify recently adopted Harness semantics before broad expansion | [#23 Effect Evaluation](https://github.com/<template-org>/<template-repo>/issues/23), with applicable evidence from [#14](https://github.com/<template-org>/<template-repo>/issues/14), [#36](https://github.com/<template-org>/<template-repo>/issues/36), [#43](https://github.com/<template-org>/<template-repo>/issues/43) | Require current-subject evidence coherent enough to support the next investment decision. `ADOPTED != EFFECTIVE`; stale/unavailable evidence does not satisfy the gate. |
| **NEXT** | Public Product — prepare a clean public preview surface | [#40 Public Release](https://github.com/<template-org>/<template-repo>/issues/40), supported by [#9](https://github.com/<template-org>/<template-repo>/issues/9), [#19](https://github.com/<template-org>/<template-repo>/issues/19), [#20](https://github.com/<template-org>/<template-repo>/issues/20) | Current effect/correctness gates and exact publication gates must be satisfied. Internal adoption is not publication approval; do not expose the private control/evidence history in place. |
| **NEXT** | Capability Evidence — portable regression scenarios before broad provider/agent/context expansion | [#48 EvalScenario / RegressionCase](https://github.com/<template-org>/<template-repo>/issues/48) | Promote only after the current higher-priority gate permits it and a small cross-provider/runtime proof is decision-relevant. Keep this portable evidence, not a benchmark/test platform. |
| **NEXT** | Product Discovery — evidence-backed problem/demand input before broad autonomously inferred feature generation | [#50 Problem / Demand Discovery](https://github.com/<template-org>/<template-repo>/issues/50) -> [#25 Solution Discovery](https://github.com/<template-org>/<template-repo>/issues/25) -> [#46 Roadmap](https://github.com/<template-org>/<template-repo>/issues/46) | Needed when autonomous product-demand inference becomes material. Explicit user-directed work continues through normal Decision Safety. Treat this as optional product capability, not mandatory Core. |
| **NEXT** | Capability Development — minimum Agent/Domain/Skill/Context composition | [#42 AgentDefinition](https://github.com/<template-org>/<template-repo>/issues/42), [#38 Domain Harness](https://github.com/<template-org>/<template-repo>/issues/38), [#39 Skills](https://github.com/<template-org>/<template-repo>/issues/39), [#47 ContextSource](https://github.com/<template-org>/<template-repo>/issues/47) | Order by proven dependency and smallest useful contract. Do not promote merely because an abstraction is named; optional capabilities remain composable rather than universal Core unless cross-context evidence justifies otherwise. |
| **NEXT** | Consumer / Interoperability Adoption — exact binding, minimal local overlay, and staged convergence | [#6 Consumer Binding](https://github.com/<template-org>/<template-repo>/issues/6), [#10 Consumer Convergence](https://github.com/<template-org>/<template-repo>/issues/10), [#24 Desired/Observed & Interop](https://github.com/<template-org>/<template-repo>/issues/24) | Promote only with exact binding/provenance, preserved consumer-owned policy, and a reversible canary/migration path. Do not infer that all #24 work is deferred merely because broad reconciliation/runtime machinery remains LATER. |
| **NEXT** | Delivery & Operations — CI/build evidence, then bounded promotion/deployment integration when applicable | [#51 Software Delivery / CI-CD](https://github.com/<template-org>/<template-repo>/issues/51), with [#17](https://github.com/<template-org>/<template-repo>/issues/17), [#19](https://github.com/<template-org>/<template-repo>/issues/19), [#40](https://github.com/<template-org>/<template-repo>/issues/40) as applicable | CI evidence may mature before CD mutation. Promotion/deployment requires explicit applicable authority after adoption/integration; public release additionally remains under #40. Treat software delivery as optional capability, not universal Core. |
| **LATER** | Runtime / Infrastructure — broad Engine, provider/extension ecosystem, reconciliation/apply machinery | [#11 Harness Engine](https://github.com/<template-org>/<template-repo>/issues/11) / Draft PR [#28](https://github.com/<template-org>/<template-repo>/pull/28), [#15 ExecutionProvider](https://github.com/<template-org>/<template-repo>/issues/15), [#17 Extensions](https://github.com/<template-org>/<template-repo>/issues/17), [#24 Reconciliation](https://github.com/<template-org>/<template-repo>/issues/24) | Keep deferred until a real canary or adopted dependency proves that zero-runtime semantics or provider-native mechanisms are insufficient. Narrow contract slices may be promoted independently when evidence supports them. |
| **RESEARCH** | Evidence Horizon — track material ecosystem/research changes and unresolved memory semantics | [#43 Continuous Evidence Horizon](https://github.com/<template-org>/<template-repo>/issues/43) plus the current routed research owner | Research may confirm, narrow, supersede, reject, or leave the roadmap unchanged. Memory remains research until existing ContextSource/ToolAdapter/Evidence/Agent primitives are shown insufficient. |
| **PARKED / REJECTED** | Overdesign boundaries — broad platforms without demonstrated independent value | [#45 Maintenance / Engineering Health](https://github.com/<template-org>/<template-repo>/issues/45) / [#46 Roadmap](https://github.com/<template-org>/<template-repo>/issues/46) | Keep separate technology-specific Core families, duplicate security/artifact platforms, marketplaces, generic schedulers/controllers, evaluator/pipeline DSLs, and similar infrastructure parked unless cross-context evidence demonstrates a durable need. |

Maintenance / Engineering Health work such as [#45](https://github.com/<template-org>/<template-repo>/issues/45), [#16](https://github.com/<template-org>/<template-repo>/issues/16), and [#18](https://github.com/<template-org>/<template-repo>/issues/18) may run in parallel when a bounded correctness/maintenance payoff is clear, without silently promoting deferred feature work.

## Portfolio relationship

When the full opportunity-to-effect chain is applicable, keep owners connected without turning the relationship into a second lifecycle:

```text
#43 Technology / Research Horizon
-> #50 Problem / Demand Discovery
-> #25 Solution Discovery
-> #46 Roadmap / Portfolio
-> capability-specific owner
-> #48 EvalScenario / RegressionCase
-> #51 CI / build evidence when applicable
-> #5 Independent Review
-> Governor / applicable adoption authority
-> integration
-> #51 promotion / deployment when applicable
-> #23 Effect Evaluation
```

This relationship grants no implementation, adoption, publication, or deployment authority. `REVIEW_PASSED` is only eligibility for adoption consideration. Publication remains under #40 where applicable, and post-deployment health remains distinct from #23 longer-horizon effect.

## Always-preserved gates

- Runtime/provider capability never grants Harness authority. Route authority/policy to [#12](https://github.com/<template-org>/<template-repo>/issues/12), executable/provider trust to [#17](https://github.com/<template-org>/<template-repo>/issues/17), context trust to [#47](https://github.com/<template-org>/<template-repo>/issues/47), reusable adversarial regression evidence to [#48](https://github.com/<template-org>/<template-repo>/issues/48), and material independent review to [#5](https://github.com/<template-org>/<template-repo>/issues/5) when applicable.
- Shared/public Harness material stays downstream-consumer anonymous; private control/evidence stays on its authorized surface.
- Structured resources, roadmap/configuration, eval, context, policy, and delivery surfaces must not become general-purpose execution/expression DSLs.
- Candidate/review/adoption/publication/deployment/effect identities remain distinct; stale or subject-mismatched evidence cannot justify a later state.
- Before adding a package/resource/role/state/workflow, prefer reuse, consolidation, removal, a bounded local solution, or a provider/native standard when it already satisfies the need.

## Roadmap maintenance

Update this projection only on material strategic deltas: a prerequisite/effect/publication gate changes, ownership consolidates, evidence changes sequencing, or a capability is promoted/demoted/parked. Detailed requirement, security, context, evaluation, delivery, research, and implementation semantics stay in their owner Issues/resources rather than being copied here.

If nothing material changed, leave the roadmap unchanged.

