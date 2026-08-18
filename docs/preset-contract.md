# Workflow Preset Contract v1

This document fixes the initial deterministic composition rules for `schema_version: 1`.

## Resolution model

A preset is declarative configuration, not a workflow programming language.

1. The caller chooses one root directory and one preset path inside that root.
2. Every `extends` reference is resolved relative to the file that declares it.
3. Referenced role, protocol, checklist, and result-schema paths are also resolved relative to their declaring preset and normalized to root-relative paths.
4. Parent presets are resolved left-to-right. A later parent overlays an earlier parent.
5. The child preset overlays the fully merged parent result.
6. Cycles, absolute references, and references that escape the root fail closed.
7. Resolution produces a flattened effective workflow plus the ordered `resolved_from` preset list.

## Merge rules

- scalar values: child replaces parent;
- `role`: child role replaces parent role;
- `protocols`: parent then child, de-duplicated while preserving order;
- common and role checklists: parent then child, de-duplicated while preserving order;
- `delegation`, `review`, `state`, and `metadata`: shallow key overlay;
- `authority`: shallow key overlay; `write_scopes` and `forbidden_write_scopes` are replaced as whole arrays when the child supplies them;
- `source_gates`: merge by gate `id`, with the later definition overlaying the earlier definition;
- `public_boundary.forbidden_terms`: inherited terms are unioned in stable order;
- `result_schema`: child replaces parent when supplied.

The resolver does not evaluate expressions, execute scripts, read environment-dependent implicit includes, or fetch network resources.

## Semantic validation

After resolution, validation checks at least:

- one effective role exists;
- every referenced local file exists;
- Supervisor cannot inherit routine implementation or routine source-review authority;
- review-required output cannot delegate independent review to its own producer id;
- self-approval authority is forbidden for review-required output;
- allowed and forbidden write scopes do not overlap;
- enabled public-boundary forbidden terms do not appear in the effective workflow or referenced guidance;
- result evidence satisfies the result schema and exact reviewed candidate identity is consistent.

## Public-boundary field

`public_boundary.enabled` declares that the effective workflow expects public-safe persistence. It composes with the repository's canonical `protocol/public-information-boundary`; it is not a replacement for that semantic rule.

`public_boundary.forbidden_terms` is an optional bounded local guard for known literal terms. It is **not** a universal DLP mechanism and must not be treated as proof that content is safe merely because no listed term matched.

For a public shared Harness preset, do not publish real confidential customer/project/repository identifiers merely to populate `forbidden_terms`. Actual confidential term lists belong in an authorized private consumer/project overlay or private validation environment. Shared public examples should normally omit the list entirely or use clearly synthetic fixture-only terms when testing validator behavior.

## Consumer overlays

Consumer repositories may add product/domain ownership, validation lanes, source gates, write scopes, result extensions, public-boundary local guards, and routing policy. They must not edit vendored upstream Harness files; consumer changes belong in local overlays.

Private consumer evidence, confidential identifiers, runtime-only credentials, and private automation/control state remain private even when the consumer uses a public Harness base.

## Scheduler boundary

The Harness does not define cadence or active task population. Scheduler configuration answers **when**. The resolved preset answers **what**. Result/checkpoint state answers **what happened**.

Scheduled execution additionally follows `protocol/automation-operation`: the physical task remains a thin pointer, missing canonical control source fails closed, and ordinary role execution does not self-modify scheduler population/cadence.
