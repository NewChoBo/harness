# Standard Harness

This directory contains the domain-neutral Standard Harness resources.

## Canonicality

The **Standard resources are the operational canonical representation** of the shared role/protocol/checklist/profile semantics they define.

`catalog.yaml` is authoritative only for resource IDs, kinds, canonical paths, representation metadata, decision provenance, and the Decision-record authority/canonicality metadata declared under `spec.canonicality`. It does not duplicate operational behavior.

Each referenced role/protocol/checklist/profile file is authoritative for its own operational semantics until a reviewed candidate explicitly supersedes that resource with another canonical representation.

Architecture Decision Records under `docs/decisions/` preserve decision rationale, history, and provenance. An ADR is **not a second independently editable operational policy surface for semantics that have an explicit canonical Standard mapping**.

Current mapped decisions include:

- Decision 0003 — zero-runtime/direct-GPT bootstrap -> `protocol/zero-runtime-operation` and `checklist/zero-runtime-session`;
- Decision 0005 — canonicality/representation -> this README + `catalog.yaml`; structured-resource/anti-DSL boundary -> `protocol/change-safety`;
- Decision 0007 — execution-budget/resumability -> `protocol/execution-budget-resumability` plus control/handoff integrations;
- Decision 0008 — translation/localization -> `protocol/translation-localization` + `checklist/translation-review`;
- Decision 0009 — adaptive effort/convergence -> `protocol/adaptive-effort-convergence` + `profile/execution-depth`;
- Decision 0010 — exact-subject outcome evidence -> `protocol/execution-outcome-receipt` plus its control/checklist integrations;
- Decision 0011 — selectable decision autonomy -> `profile/decision-autonomy` with change-safety/control-cycle integration;
- Decision 0013 — public-by-default information safety -> `protocol/public-information-boundary`;
- Decision 0014 — repository-owned scheduled automation and trusted-ref safety -> `protocol/automation-operation`.

Decisions without an explicit operational Standard mapping remain authoritative for their own decision scope until a governed candidate maps, supersedes, or retires that scope.

If a future change alters the underlying decision as well as the operational rule, update/supersede the relevant Decision record and canonical Standard resource in the same governed change so they cannot silently diverge.

## Resource groups

- `roles/` — responsibility, authority, non-scope, evidence, and handoff contracts.
- `protocols/` — reusable operating sequences and invariants, including public-information safety, scheduled-automation/trusted-ref safety, control, change safety, adoption, escalation, handoff, zero-runtime operation, execution-budget/resumability, adaptive effort/convergence, outcome evidence, and translation/localization.
- `profiles/` — reusable execution/domain specialization defaults that compose under delegated overlay rules without becoming a programming language.
- `checklists/` — concise first-party and independent verification gates.
- `presets/` — declarative workflow composition defaults. Presets do not supersede canonical role/protocol/checklist behavior.

Structured resources remain declarative. Complex executable logic belongs in controller/runtime/policy-adapter code.

`protocol/execution-outcome-receipt` is a **semantic evidence envelope**, not a requirement for per-run logging. Persistence does not make a receipt authoritative, nor does it create review/adoption/publication authority.

`protocol/public-information-boundary` governs every public persistence/collaboration/output surface. Private consumer evidence and confidential term inventories stay at their authorized private source; the public Harness receives only generalized public-safe findings.

`protocol/automation-operation` governs recurring execution independent of the physical scheduler. A Scheduled Task is a thin runtime binding, a missing canonical source fails closed, stale repository-generation paths are not reconstructed, ordinary Worker/Supervisor/Reviewer roles do not directly author the trusted integration ref, and scheduler population/cadence is not self-modified by normal runs.

Consumer/project-specific terminology, product/domain ownership, canon/content constraints, release policy, private operational/effect evidence, runtime-only credentials, and private automation state remain local overlays or private runtime state.

## Provider examples

Provider-specific examples are non-canonical projections for discoverability/onboarding. Shared operational behavior remains in the Standard resources above.

- Ordinary GPT-style/general chat zero-runtime quickstart: [`../examples/providers/gpt-general-chat/README.md`](../examples/providers/gpt-general-chat/README.md)

If an example conflicts with a Standard resource, the Standard resource controls.
