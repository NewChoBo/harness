# Harness Architecture Model

## Status and authority

This document is a **derived, non-authoritative architecture projection** of the Agent Harness Semantic Resource Model.

Operational shared behavior is defined by the canonical resources under `standard/`:

- `standard/roles/**` — role responsibility and authority semantics;
- `standard/protocols/**` — operating lifecycle and routing semantics;
- `standard/checklists/**` — verification gates;
- `standard/catalog.yaml` — resource identity, canonical path, representation, Decision provenance, and Decision-record authority/canonicality metadata only.

Architecture Decision Records under `docs/decisions/**` preserve rationale/history/provenance. They are not a second independently editable operational policy source.

If this document conflicts with a canonical Standard resource, **the Standard resource wins** and this projection must be corrected.

## Purpose

Agent Harness is a reusable governance/control-plane layer for agent workflows. It separates shared methodology from consumer-specific product/domain policy and lets multiple runtimes/schedulers implement the same semantic contract.

A useful conceptual split is:

```text
Trigger plane        -> when execution starts
Behavior plane       -> roles/protocols/checklists
Governance plane     -> intent, authority, review, adoption, recursive evolution
Evidence/state plane -> what happened, what remains, provenance/effect state
```

The Harness owns the semantics connecting these planes. A runtime, scheduler, Git provider, LLM SDK, MCP/A2A adapter, or controller may implement execution without becoming the source of behavior policy.

## Semantic Resource Model

The architectural abstraction is the **Semantic Resource Model**, not Markdown, YAML, JSON, TypeScript, Python, or another format.

Resource families may include:

- roles and authority;
- protocols/checklists;
- workflow/topology;
- consumer binding/profile/overlay;
- candidate/review/adoption state;
- result/checkpoint/evidence;
- schedule/topology desired state;
- evolution/effect records;
- compatibility/conformance/provenance metadata.

Different representations are valid when one authoritative source and the derivation/projection relationship are explicit.

## Canonical operational map

The current v0.x operational semantics are intentionally split into small loadable resources rather than duplicated here.

Use:

- `standard/protocols/change-safety.md` for Decision Safety and pre-change consequence analysis;
- `standard/protocols/adoption-lifecycle.md` for candidate/review/approval/adoption/effect state transitions;
- `standard/protocols/control-cycle.md` for Supervisor control flow;
- `standard/protocols/deep-audit-and-escalation.md` for focused deep audit and higher-authority routing;
- `standard/protocols/checkpoint-handoff.md` for durable handoff/evidence rules;
- `standard/checklists/agent-self-check.md` and `standard/checklists/pre-adoption-review.md` for verification gates;
- `standard/roles/*.md` for role-specific authority/non-scope.

Decision 0002/0004/0006 explain why these contracts exist and provide provenance; they do not independently govern execution.

## Role topology

Conceptually:

```text
User / Overmind
      |
   higher/root boundaries
      |
   Governor
      |
   Supervisor
   /   |    \
Worker Reviewer Researcher
```

Concrete deployments may combine/split physical tasks while preserving the canonical independence and authority semantics in `standard/**`.

The topology is therefore a composition model, not a requirement for a fixed number of scheduled agents.

## Consumer composition and convergence

Initial composition may be expressed as:

```text
Harness base
+ optional shared profile
+ minimal consumer binding
+ project/task custom overlays
= effective Harness
```

Consumer-local shared-policy copies are transitional, not the desired final state.

The long-term direction owned by issue #10 is:

```text
Harness-owned shared semantics
+ Harness-owned workflow/schedule desired state
      -> runtime/scheduler adapter reconciliation
      -> physical execution

consumer repository
      -> minimal Harness binding
      -> genuinely project-specific custom overlays only
```

Physical schedulers may remain as trigger infrastructure. The goal is to remove duplicated per-project schedule behavior/configuration and giant task prompts, not to remove timed execution when it is still required.

A project-specific schedule override remains local only when it is genuinely custom rather than a repeated shared default/profile.

Legacy removal is canary/effect/rollback-gated; the architecture does not endorse big-bang deletion.

## Declarative boundary

Structured Harness resources are declarative contracts, not an embedded programming language.

Avoid arbitrary expressions/eval, user-defined loops/control flow, scripts, executable templates/macros, dynamic code loading, implicit network execution, callbacks, or effectively general-purpose semantics in core configuration.

Complex reconciliation, computation, retry, policy evaluation, search, iteration, or side effects belong in explicit controller/runtime/policy-adapter implementations behind versioned interfaces.

A dedicated external policy/expression language, if ever adopted, is a separately governed integration rather than silent YAML/JSON feature accretion.

## Shared vs consumer ownership

Shared Harness artifacts must stay domain-neutral and data-minimized.

Consumer-owned material includes product/business/domain/canon policy, private identifiers, confidential knowledge, personal/sensitive data, credentials/secrets, and private operational evidence. Such material remains in the owning consumer/private system unless a safe generalized finding is promoted without leaking the source.

Customization and conformance are separate: a consumer may replace optional defaults, but must not claim conformance to a profile whose required invariants it replaced.

## Reproducibility and candidate identity

A reviewed effective candidate may depend on more than one commit. Relevant identity can include Harness version/ref, base/control SHA, profile/resource versions, custom-overlay identities, and schedule/topology desired-state identity.

The exact rules for review invalidation and adoption are canonical in `standard/protocols/adoption-lifecycle.md` and the PRE_ADOPTION_REVIEW checklist.

## Evolution direction

The Harness may recursively evolve its topology, representations, resources, adapters, and governance through its canonical change-safety/review/adoption/effect process.

Near-term work is to stabilize the Standard resources through real canaries. Structured schemas, conformance tooling, typed APIs/controllers, MCP/A2A/runtime adapters, and schedule reconciliation should be added when observed use justifies them rather than because a file-format roadmap demands them.
