# Standard Harness

This directory contains the first domain-neutral Standard Harness resources.

## Canonicality

The **Standard resources are the operational canonical representation** of the shared role/protocol/checklist/profile semantics they define.

`catalog.yaml` is authoritative only for resource IDs, kinds, canonical paths, representation metadata, decision provenance, and the Decision-record authority/canonicality metadata declared under `spec.canonicality`. It does not duplicate operational behavior.

Each referenced role/protocol/checklist/profile file is authoritative for its own operational semantics until a reviewed candidate explicitly supersedes that resource with another canonical representation.

Architecture Decision Records under `docs/decisions/` preserve decision rationale, history, and provenance. An ADR is **not a second independently editable operational policy surface for semantics that have an explicit canonical Standard mapping**. Decisions 0002 through 0011 currently identify the Standard resources/surfaces that operationalize their mapped semantics; for those mapped semantics, the Standard resource controls on conflict.

In particular:

- Decision 0003's zero-runtime/direct-GPT bootstrap constraint is operationalized by `protocol/zero-runtime-operation` and `checklist/zero-runtime-session`;
- Decision 0005 maps canonicality/representation semantics to this README and `catalog.yaml`, and maps the operational structured-resource / anti-DSL boundary to `protocols/change-safety.md`;
- Decision 0007's provider-neutral execution-budget and bounded-resumability semantics are operationalized by `protocol/execution-budget-resumability`, with integrations in `protocol/control-cycle`, `protocol/checkpoint-handoff`, `protocol/zero-runtime-operation`, and `checklist/zero-runtime-session`;
- Decision 0008's source-canon / target-language-realization translation semantics are operationalized by `protocol/translation-localization` and `checklist/translation-review`, while Translator/Translation Reviewer reuse the existing Worker/Independent Reviewer authority model and translation publication remains consumer-local authority;
- Decision 0009's adaptive effort, bounded iteration, dual-lens review, and convergence semantics are operationalized by `protocol/adaptive-effort-convergence` and `profile/execution-depth`, with integrations in `protocol/control-cycle`, `checklist/agent-self-check`, and `checklist/pre-adoption-review`;
- Decision 0010's bounded exact-subject execution outcome evidence is operationalized by `protocol/execution-outcome-receipt`, with persistence/control integration in `protocol/control-cycle`, `protocol/checkpoint-handoff`, and `protocol/zero-runtime-operation`, and truthfulness checks in `checklist/agent-self-check`, `checklist/pre-adoption-review`, and `checklist/zero-runtime-session`. `protocol/execution-outcome-receipt` remains the sole owner of receipt fields/truthfulness/currentness/first-canary/no-noise semantics; zero-runtime owns only its capability/persistence-fallback/handoff integration;
- Decision 0011's selectable decision-autonomy semantics are operationalized by `profile/decision-autonomy`, with intent/authority integration in `protocol/change-safety` and runtime selection/routing integration in `protocol/control-cycle`. The profile also owns no-profile compatibility, durable pending-human-decision continuity, and bounded change-authorization semantics for explicit user/project decisions.

Decisions without an explicit operational Standard mapping are not implicitly demoted by this rule. They remain authoritative for their own decision scope until a governed candidate maps, supersedes, or retires that scope. This currently includes Decision 0001's exact-vendoring/reproducibility decision.

If a future change alters the underlying decision as well as the operational rule, update or supersede the relevant Decision record and the canonical Standard resource in the same governed change so they cannot silently diverge.

## Resource groups

- `roles/` — responsibility, authority, non-scope, evidence, and handoff contracts.
- `protocols/` — reusable operating sequences and invariants, including zero-runtime/chat operation, provider-neutral execution-budget/resumability, adaptive effort/convergence, bounded exact-subject execution outcome receipts, and source-faithful target-language translation/localization.
- `profiles/` — small reusable execution/domain specialization defaults that compose under the normal delegated overlay rules without becoming a programming language.
- `checklists/` — concise verification gates, including independent translation review and receipt truthfulness checks.

Structured resources must remain declarative. Complex executable logic belongs in controller/runtime/policy-adapter code.

`protocol/execution-outcome-receipt` is a **semantic evidence envelope**, not a requirement for per-run logging. It does not make a receipt authoritative merely because it was persisted, and it does not create review/adoption/publication authority. Physical receipt schemas/stores/exporters may be added later under the runtime/contract/extension owners without replacing the Standard semantics.

Consumer/project-specific glossaries, terminology, names, language-pair voice strategy, content/canon constraints, publication policy, task-specific execution-time overrides, and private operational/effect evidence remain local overlays; the shared Standard does not become a consumer configuration or telemetry database.

## Provider examples

Provider-specific examples are non-canonical projections for discoverability and onboarding. Shared operational behavior remains in the Standard resources above.

- Ordinary GPT-style/general chat zero-runtime quickstart: [`../examples/providers/gpt-general-chat/README.md`](../examples/providers/gpt-general-chat/README.md)

If an example conflicts with a Standard resource, the Standard resource controls.
