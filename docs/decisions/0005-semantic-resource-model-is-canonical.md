# Decision 0005 — Semantic Resource Model is canonical

## Status

Accepted. Operationalized by the Standard Harness resources listed below.

## Context

Agent Harness needs to remain interoperable across Markdown, YAML/JSON, typed models, APIs, controllers, and future runtimes without making the first serialization format the permanent architecture.

At the same time, multiple independently editable representations of the same rule create canonicality drift, while incrementally adding expressions, loops, scripts, or hidden execution semantics to structured configuration risks creating an accidental workflow/policy language.

## Decision

Agent Harness is architecturally **format-neutral**. The canonical abstraction is the **Semantic Resource Model**: resource identity, relationships, lifecycle, authority, state, evidence, composition, provenance, compatibility, and invariants.

Each operational resource family must identify its authoritative representation and any companion/projection relationship. Structured resources remain declarative and bounded. Non-trivial computation, policy evaluation, reconciliation, scheduling, retries, search, iteration, or side effects belong behind explicit controller/runtime/policy-adapter interfaces rather than being embedded into resource syntax.

Promotion from narrative to structured canonical representation is driven by semantic maturity and demonstrated machine-governance value, not by a mandatory file-format ladder.

## Operational canonical resources

The following Standard surfaces operationalize this decision:

- `standard/README.md` — canonicality relationship between Standard resources, catalog metadata, and Decision records;
- `standard/catalog.yaml` — authoritative resource identity, kind, canonical path, representation metadata, Decision provenance, and Decision-record authority/canonicality metadata declared under `spec.canonicality`; operational behavior remains in the referenced resources;
- `standard/protocols/change-safety.md` — operational structured-resource / anti-DSL boundary applied during change decisions.

Each referenced role/protocol/checklist resource remains authoritative for its own operational semantics as declared by the Standard. Future structured replacements must explicitly supersede the prior authoritative representation rather than creating a second editable source of truth.

This Decision record is **rationale/history/provenance, not a second independently editable operational canonicality or anti-DSL specification**. If future evidence changes the underlying decision, update or supersede this ADR and the affected canonical Standard resources in the same governed candidate.

## Consequence

The Harness can evolve from a zero-runtime narrative bootstrap into machine-governed structured resources and runtime tooling without changing its architectural model or accidentally growing a hidden programming language. Canonical operational rules remain localized in the Standard resources, while this ADR preserves why that boundary exists.
