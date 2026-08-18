# Agent Harness

`agent-harness` is a reusable **agent/workflow governance and control-plane Harness** for GPT/Codex-style systems.

It defines shared workflow methodology, authority/review semantics, evidence/state conventions, install/overlay composition, and recursive improvement without absorbing consumer-specific product/domain policy.

## Authority of this README

This root README is a **human-readable overview/projection**, not an independently authoritative operational policy surface. It summarizes and links the current architecture and Standard for discoverability.

For shared operational role/protocol/checklist semantics, the canonical resources under [`standard/`](standard/README.md) control. `standard/README.md` defines the Standard/canonicality relationship and [`standard/catalog.yaml`](standard/catalog.yaml) identifies canonical resource paths, provenance metadata, and Decision-record authority/canonicality metadata. If this overview conflicts with a canonical Standard resource, the canonical Standard resource wins and this README must be corrected as a derived projection.

Architecture/decision documents remain governed by their explicitly declared canonicality/provenance relationship; this README does not supersede them.

## Semantic Resource Model first

Agent Harness is **not Markdown-first, YAML-first, JSON-first, or TypeScript-first** as an architectural rule.

The canonical abstraction is the **Semantic Resource Model**: resource identities, relationships, authority, lifecycle, state, evidence, composition, provenance, compatibility, and invariants.

```text
Semantic Resource Model
        +-> structured resources (YAML / JSON / equivalent)
        +-> typed models / APIs / controllers
        +-> Markdown / TXT narrative guidance and projections
```

During early v0.x, text may carry much of the working specification because it is cheap to author, review, diff, and consume directly. That is a bootstrap tactic, not permanent source-of-truth policy.

Stable machine-governed resources may move to structured canonical representation when structure materially improves reliability or interoperability. Narrative text remains appropriate for rationale, examples, research, long guidance, migration notes, and human-readable projections.

When multiple representations describe the same resource, exactly one authoritative representation and its provenance/derivation relationship must be explicit.

## Current v0.x goal: zero-runtime semantic bootstrap

The first usable Harness must work directly for GPT-style agents without requiring a Harness-specific runtime, package manager, resolver binary, or controller.

The immediate goal is to stabilize shared semantics through real consumer use.

## Core responsibilities

- **Governor / Higher Authority** — adopts or rejects material candidates after evidence and pre-adoption review.
- **Supervisor** — restores control state, routes ownership/dependencies, tracks evidence, and coordinates recursive improvement.
- **Worker / Implementer** — implements one authorized decision-ready change and stops at a candidate.
- **Independent Reviewer** — independently reassesses the frozen final candidate before adoption.
- **Researcher** — gathers evidence, alternatives, counterexamples, and uncertainty-reducing findings.

Consumers may use different names/topologies as long as the required authority and independence semantics remain explicit.

## Standard resources

The first reusable Standard Harness set lives under [`standard/`](standard/README.md).

- [`standard/catalog.yaml`](standard/catalog.yaml) is authoritative only for resource IDs, kinds, canonical paths, representation metadata, Decision provenance, and Decision-record authority/canonicality metadata declared under `spec.canonicality`.
- [`standard/roles/`](standard/roles/) defines the five initial responsibility families.
- [`standard/protocols/`](standard/protocols/) defines the shared control, change-safety, adoption, audit/escalation, and handoff semantics.
- [`standard/checklists/`](standard/checklists/) contains concise first-party and pre-adoption verification gates.
- [`examples/software-project/`](examples/software-project/README.md) and [`examples/fiction-media/`](examples/fiction-media/README.md) demonstrate neutral consumer composition.

The catalog does **not** duplicate role/protocol behavior. Each referenced narrative resource remains authoritative for its own semantics until a reviewed structured canonical representation explicitly supersedes it.

## Decision Safety Gate

Conversational input is not automatically an execution order.

Material input is interpreted with semantics equivalent to:

```text
DIRECTIVE / APPROVAL       -> may authorize mutation within delegated authority
PROPOSAL / QUESTION        -> analyze and recommend; no mutation by default
BRAINSTORM / AMBIGUOUS     -> exploratory analysis only
standing delegated mandate -> may authorize the work already covered by that mandate
```

Before an authorized material change, perform proportionate consequence analysis: benefits, drawbacks, side effects, alternatives, reversibility, compatibility/interoperability, maintenance complexity, validation/falsifier, and authority/security/privacy/resource impact.

This allows non-expert users to ask exploratory questions without accidentally rewriting project policy.

## Material change lifecycle

```text
input / evidence
-> intent classification
-> analysis only OR authorized change
-> pre-change consequence analysis
-> Worker implementation
-> Worker self-check
-> CANDIDATE_READY (frozen effective candidate)
-> PRE_ADOPTION_REVIEW
-> REVIEW_PASSED
-> Governor / higher-authority adoption decision
-> integration
-> post-adoption effect validation
```

`IMPLEMENTATION_COMPLETE`, `CANDIDATE_READY`, and `REVIEW_PASSED` are explicitly **not** adoption.

For material changes, the Producer/Worker and Independent Reviewer must be distinct identities/owners.

## Pre-Adoption Review

The final candidate is reassessed **after implementation is complete and before integration**.

Review covers the original goal/scope, actual diff/effective resources, validation, new drawbacks or regressions, complexity, alternatives visible after implementation, authority boundaries, producer/reviewer independence, interoperability, canonicality/provenance, rollback, anti-DSL constraints, and prior review findings.

A material change after PASS invalidates the review when it changes the effective candidate, including relevant head/base/control/resource/profile/overlay identities.

## Recursive self-evolution

Harness internals may evolve through the same governed path.

A role may propose changes to itself, but material changes to that role's responsibilities or authority require final adoption **above the role being changed**. Authority expansion likewise requires a higher authority.

The guardrail is explicit intent, hierarchical authority, independent pre-adoption review, provenance, rollback, and observed effect—not preservation of the current topology or file formats.

## Declarative structured-resource boundary

Structured Harness resources are configuration/state contracts, not a hidden programming language.

Core formats must not grow arbitrary `eval`/expressions, user-defined loops/control flow, embedded scripts, executable templates, dynamic code loading, implicit network execution, callbacks, or effectively Turing-complete semantics.

Bounded declarative composition is appropriate: stable references, enums, explicit precedence, finite selectors, schema constraints, and operations such as `extend`, `replace`, `disable`, and `add`.

Complex computation, policy evaluation, reconciliation, retries, iteration, search, or side effects belong in explicit controller/runtime/policy-adapter implementations behind versioned interfaces.

## Install + project overlay model

A consumer can install/pin the shared Harness without editing the upstream copy, then specialize it locally.

```text
installed Agent Harness base (consumer-read-only)
        +
optional shared profile
        +
project-local Harness overlay
        +
task / lane overlay
        =
effective Harness / workflow
```

A neutral default layout may look like:

```text
.agent-harness/
  harness.yaml or harness.md
  lock.yaml
  vendor/agent-harness/<version>/
  project/
  workflows/
  state/
```

Existing project-native layouts may remain in place and be mapped through a small consumer entrypoint. Agent Harness standardizes logical composition, not one mandatory directory structure.

Conceptual precedence:

```text
upstream base
-> selected profile
-> project overlay
-> task/lane overlay
```

## Publishing and private extensions

Current release layout:

- `@newchobo/harness` (public): shared base engine, canonical standard resources, and public workflow packages.
- private overlay project (separate repo): overlays only; add non-public constraints, sensitive workflow policies, and project-specific evidence policy.

After publishing `@newchobo/harness`, private consumers should add dependency and overlay composition:

```bash
npm i @newchobo/harness@^0.1.0-alpha.0
npm i @newchobo/harness-workflow-coding@^0.1.0-alpha.0 @newchobo/harness-workflow-novel@^0.1.0-alpha.0 @newchobo/harness-workflow-research@^0.1.0-alpha.0
```

`pnpm` users can switch this block to `pnpm add` without other changes.

Private-only rules should live in a separate private overlay repository and must never be copied into public workflow presets.

## Data boundary declaration

- This repository contains only public/shared methodology and does **not** include sensitive workflow rules, private evidence, explicit-content policy sets, or private operational data.
- Sensitive policy content (for example explicit/novel-domain guardrails) must be managed in an isolated private repository and imported only as local overlay inputs.

## Effective candidate identity

When multiple layers affect semantics, review the **effective candidate**, not only one commit.

Relevant identity may include candidate/head SHA, base/control SHA, Harness version/ref, profile identity, project/task overlay identities, and resource/schema versions.

This prevents a review from silently carrying over after the underlying effective policy changes.

## Open-source interoperability

Shared/public Harness material must remain organization- and consumer-neutral. Consumer-specific paths, identifiers, evidence, product policy, canon/domain rules, and private coordination stay in the consumer overlay.

The core must not require one repository provider, branch naming scheme, issue label set, scheduler/runtime, programming language, organization-specific authority name, or physical directory layout.

Customization and conformance are separate: a project may replace defaults and still use Agent Harness, but must not claim conformance to a profile whose required invariant it replaced.

## Repository and roadmap direction

Keep the evolving specification, standard resources, profiles, adapters, conformance material, examples, and reference tooling in one repository until genuinely independent lifecycle/ownership/toolchain/security boundaries justify extraction.

The roadmap follows semantic maturity rather than a file-format ladder:

```text
stabilize Semantic Resource Model
-> promote mature machine-governed resources to structured canonical data
-> add schema/conformance/reconciliation where observed failures justify it
-> expose typed/API/controller representations
-> add runtime/interoperability adapters
```

A tooling spike or reference implementation is evidence, not the architecture contract.

## Adoption and effect validation

Do not migrate every consumer workflow at once. Start with one reversible canary, compare effective semantics/authority, perform PRE_ADOPTION_REVIEW, adopt only after the applicable gate passes, observe real outcomes, and expand only when evidence supports it.

After adoption, material changes remain `PENDING_EFFECT_VALIDATION` until evidence supports `EFFECTIVE`, `INEFFECTIVE`, `REGRESSIVE`, or `INCONCLUSIVE`.

## Status

Early architecture/bootstrap. The Semantic Resource Model is being stabilized; no stable public machine schema/API has been released yet.
