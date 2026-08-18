# NewChoBo Harness Standard

This directory contains provider-neutral canonical role, protocol, profile, and checklist resources.

## Canonicality

The referenced Standard resource is operationally authoritative for the semantics it owns. `catalog.yaml` is authoritative for resource identity, kind, canonical path, representation metadata, decision provenance, and Decision-record authority metadata; it is not a second copy of operational behavior.

Architecture Decision Records preserve rationale, history, trade-offs, and provenance. When a Decision has an explicit Standard mapping, the mapped Standard resource controls operational conflicts. Unmapped Decision scope remains authoritative until governed mapping, supersession, or retirement.

Key mappings:

- Decision 0003 → `protocol/zero-runtime-operation`, `checklist/zero-runtime-session`;
- Decision 0005 → this README, `catalog.yaml`, and the anti-DSL boundary in `protocol/change-safety`;
- Decision 0007 → `protocol/execution-budget-resumability` and its control/checkpoint/zero-runtime integrations;
- Decision 0008 → `protocol/translation-localization`, `checklist/translation-review`;
- Decision 0009 → `protocol/adaptive-effort-convergence`, `profile/execution-depth`, and checklist/control integrations;
- Decision 0010 → `protocol/execution-outcome-receipt` and its checkpoint/control/truthfulness integrations;
- Decision 0011 → `profile/decision-autonomy` and its decision-safety/control integrations;
- Decision 0013 → `protocol/automation-operation` plus repository-owned Scheduled Task bootstrap/binding durability;
- Decision 0014 → `protocol/public-information-boundary` plus public-persistence review gates;
- Decision 0015 → `protocol/automation-operation` plus branch/integration lifecycle and release-tag governance.

Decision 0012 (`guided-project-setup`) remains a distinct proposed decision scope and is not repurposed by the public-boundary or automation/release decisions above.

If a change alters both a decision and its operational rule, update/supersede the Decision and canonical resource in the same reviewed candidate.

## Resource groups

- `roles/` — responsibility, authority, non-scope, evidence, and handoff contracts.
- `protocols/` — reusable operating sequences and invariants.
- `profiles/` — bounded defaults that compose inside delegated authority.
- `checklists/` — first-party and independent verification gates.

Structured resources remain declarative. Complex computation, retries, reconciliation, policy evaluation, and side effects belong in controller/runtime/adapter code behind explicit interfaces.

## Public and private composition

This public Standard contains only reusable public-safe semantics. Consumer canon, credentials, customer/project evidence, private runtime state, unpublished content policies, and sensitive domain overlays remain in their authorized private or consumer-owned source.

Private evidence can motivate a public Standard change only after it is minimized/generalized into public-safe evidence under `protocol/public-information-boundary`.

## Automation

Public physical task bindings are in [`.newchobo/harness/scheduled-task-bindings.md`](../.newchobo/harness/scheduled-task-bindings.md). They are thin entrypoints over canonical roles/protocols/checklists. Missing sources fail closed; they are never reconstructed from memory or a stale repository generation.

Material automation source changes use topic branch → validation → frozen candidate → producer-distinct review → adoption/merge → verified branch cleanup under `protocol/automation-operation`.

## Provider examples

Provider-specific examples are non-canonical projections for onboarding and interoperability. The Standard controls on conflict.

- General-chat zero-runtime quickstart: [`../examples/providers/gpt-general-chat/README.md`](../examples/providers/gpt-general-chat/README.md)
