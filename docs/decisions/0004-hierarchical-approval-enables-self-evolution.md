# Decision 0004 — Hierarchical approval enables recursive self-evolution

## Status

Accepted. Operationalized by the Standard Harness resources listed below.

## Context

Agent Harness is intended to improve itself from observed outcomes. Freezing roles, workflow topology, governance structure, or resource representations would prevent meaningful recursive development. The material risks are unreviewed authority escalation, producer/reviewer collapse, self-approval, and irreversible change without rollback/effect evidence.

## Decision

Agent Harness may recursively redesign its internal methodology and structure when material changes pass the applicable change-safety, independent-review, authority, adoption, rollback, and effect-validation gates.

Authority is hierarchical. A role may propose changes to itself, but a material change to that role's own responsibilities or authority requires adoption **above the role being changed**. Authority expansion likewise requires higher approval.

Within explicitly delegated scope, a Governor or equivalent higher authority may adopt ordinary internal Harness changes after independent review.

**Any root-constitution change is always reserved to the applicable higher/root authority and is not covered by ordinary standing delegation to the current Governor.**

Other high-risk effects—such as publication/visibility, security/privacy boundary change, destructive/irreversible operation, or unbounded commitment—remain higher-gated unless the relevant higher authority has explicitly delegated that specific class of decision.

## Operational canonical resources

The following Standard resources are the operational source of truth for this decision:

- `standard/roles/governor.md`
- `standard/roles/supervisor.md`
- `standard/roles/worker.md`
- `standard/roles/independent-reviewer.md`
- `standard/roles/researcher.md`
- `standard/protocols/adoption-lifecycle.md`
- `standard/protocols/deep-audit-and-escalation.md`

This Decision record preserves rationale and provenance. It is **not a second independently editable operational rule set**. If future governance changes alter the underlying decision, update/supersede this ADR and the affected canonical Standard resources in the same governed candidate.

## Reserved higher-authority examples

Always higher/root-gated:

- any root-constitution change.

Higher approval remains appropriate unless the relevant higher authority explicitly delegated that specific class of decision:

- material security/privacy boundary changes;
- destructive or irreversible operations;
- external/public publication or visibility decisions;
- unbounded monetary/resource commitments;
- authority expansion beyond the currently delegated ecosystem.

## Consequence

The Harness may evolve substantially without preserving its initial topology. Compatibility and safety come from explicit authority, independent review, canonical provenance, rollback, and observed effect—not architectural immutability.
