# Decision 0002 — Supervisor is control/governance-first

## Status

Historical rationale / provenance. Operational semantics are maintained in the Standard Harness resources below.

## Operational resources

The current operational rules live in:

- `standard/roles/supervisor.md`
- `standard/protocols/control-cycle.md`
- `standard/protocols/deep-audit-and-escalation.md`

Those Standard resources are authoritative for current Supervisor/control-cycle/deep-audit behavior. This Decision record is not an independently editable operational policy surface.

## Original decision

The base Supervisor should not routinely own implementation, broad source review, or deep research. Its purpose is primarily control-state restoration, ownership/dependency reconciliation, evidence verification, routing, guidance health, recursive improvement, completion gating, and escalation.

Focused deep audit is appropriate only when material evidence warrants it, and exact source review should normally remain with an Independent Reviewer.

## Rationale

A manager that rereads all source becomes a bottleneck and duplicates specialist work. Control-oriented supervision scales better because responsibility remains with the producer and independent reviewer while the Supervisor validates system integrity.

## Consumer overlays

Consumers may specialize Supervisor behavior through project overlays, but shared operational semantics are defined by the Standard resources above. Consumer-specific policy must remain consumer-local and must not silently become shared Harness policy.

## Change rule

If the underlying design decision changes, update or supersede this Decision record and the affected canonical Standard resources in the same governed change so rationale/provenance and operational semantics cannot silently diverge.
