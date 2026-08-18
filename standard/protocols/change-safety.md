# Change Safety

Resource ID: `protocol/change-safety`

## Purpose

Prevent exploratory language or attractive ideas from becoming accidental mutations, require proportionate consequence analysis before material authorized changes, preserve project/privacy boundaries during persistence, and apply the effective decision-autonomy profile without confusing autonomy with authority.

## Intent classification

Use semantics equivalent to:

- `DIRECTIVE` — explicit request to execute/change/apply;
- `APPROVAL` — explicit approval of a concrete candidate/decision;
- `PROPOSAL` — suggestion for evaluation;
- `QUESTION` — request for analysis/comparison/recommendation;
- `BRAINSTORM` — exploratory idea generation;
- `AMBIGUOUS` — material intent cannot be safely resolved.

Only a directive/approval or standing delegated mandate authorizes mutation. Proposal/question/brainstorm/ambiguous input is analyze-only by default.

A selected `profile/decision-autonomy` changes how choices **inside an already authorized goal/scope** are resolved; it does not convert unrelated proposal/question/brainstorm input into mutation authority.

## Material consequence analysis

Before implementation, cover the decision-relevant subset of:

- objective and scope;
- benefits;
- drawbacks/costs;
- side effects, regressions, failure modes;
- alternatives including no-change/defer;
- reversibility/rollback;
- compatibility and consumer impact;
- interoperability/open-source impact;
- complexity/maintenance cost;
- validation/falsifier/evidence;
- authority/security/privacy/destructive/release/resource impact.

## Decision autonomy

When a material authorized goal leaves multiple valid choices, resolve the effective `profile/decision-autonomy` if one is selected.

- `ASSISTED` — prepare the evidence/recommendation and stop for user selection when a material discretionary choice remains.
- `DELEGATED` — complete ordinary/reversible evidence-supported choices automatically; escalate only genuinely reserved, hard-to-reverse/high-cost, externally consequential, conflicting-directive, or unresolved user-value/preference decisions.
- `AUTONOMOUS` — proportionally research/compare/select the best-supported valid option and continue through the lifecycle stages actually authorized; do not stop merely because multiple reasonable alternatives exist.

If no decision-autonomy profile is selected, preserve the pre-profile parent control-cycle behavior: ask only when a decision cannot be resolved inside delegated authority or an explicitly reserved boundary applies. Omission is not an implicit `ASSISTED` selection and must not create new routine human stops for existing consumers.

For `AUTONOMOUS`, use the bounded selection/tie-break discipline defined by `profile/decision-autonomy`. A stable autonomous selection is decision provenance, not approval/adoption authority. `AUTONOMOUS_SELECTION` and `AUTONOMOUS_TIE_BREAK` never bypass validation, Independent Review, adoption, publication/deployment, privacy/security, destructive-operation, cost, or other reserved gates.

### Explicit decision protection

An explicit user/project decision remains authoritative current truth inside the decision scope owned by that authority. `DELEGATED` or `AUTONOMOUS` does not silently replace it.

Material new evidence may justify a bounded `CHANGE_RECOMMENDATION`. When applying that recommendation would alter user-owned scope, require `CHANGE_AUTHORIZATION_REQUIRED` unless a current scoped standing delegation explicitly permits that class of revision. Preserve the current decision and continue unrelated authorized work while the change decision is unresolved.

Rejecting a recommendation leaves the current decision authoritative. Do not repeatedly resurface the same rejected recommendation on unchanged evidence. Durable pending-decision continuity and revalidation behavior are owned by `profile/decision-autonomy`; persistence of a request does not grant authority or imply approval.

## Authority and overlay precedence

Composition precedence resolves competing behavior or values only **inside authority that is already delegated to the overriding layer**. Precedence does not grant authority.

Rules:

- a project, task, lane, runtime, provider, or temporary overlay may narrow behavior inside its delegated scope;
- a later/higher-precedence overlay must not widen write, review, adoption, release/publish, security/privacy, destructive-operation, validation, or other reserved authority merely because it is later in the composition order;
- a task/lane overlay must not override repository/project/profile invariants that are explicitly non-overridable or outside that task/lane's ownership;
- `replace` / `disable` semantics apply only to resources that the current authority is allowed to replace/disable; they are not an authority-escalation mechanism;
- when an overlay requests behavior outside its delegated scope, do not resolve the conflict by precedence. Return `POLICY_CONTRADICTION`, an equivalent blocked state, or route to the authority that owns the boundary.

Consumer bindings should make reserved/non-overridable authority explicit when omission could make the effective workflow ambiguous. Disabling or dropping a required profile invariant never preserves conformance by itself. Replacing the implementation/resource that realizes a required invariant may preserve conformance only when the governing contract explicitly permits that substitution, an actual approved substitute is present, and the substitute still satisfies the required invariant or an explicitly defined equivalent guarantee. Replacing or weakening the invariant itself is distinct from substituting its implementation and does not silently retain profile conformance.

Decision-autonomy precedence follows the same rule: a lower overlay may select or narrow autonomy only inside its delegated decision scope. Selecting `AUTONOMOUS` never widens the authority available to that layer.

## Data and privacy boundary

Shared/public Harness persistence must not contain consumer/project-specific confidential knowledge, personal data, sensitive operational information, credentials/secrets, private repository identifiers, private coordination evidence, or other information whose disclosure is not required by the shared contract.

Rules:

- keep project/domain knowledge in the owning consumer repository or private overlay;
- use neutral placeholders/examples in shared/public resources;
- never commit passwords, tokens, API keys, credentials, private keys, or equivalent secrets;
- minimize evidence copied into shared checkpoints: record only the abstract finding/provenance needed to justify a shared rule;
- when evidence is sensitive, link/reference the private owner when safe instead of copying the sensitive content;
- if classification is uncertain, treat the information as non-public/sensitive until reviewed.

A shared rule may be derived from private evidence only after the rule can be expressed without disclosing that evidence or consumer-specific facts.

## Structured-resource boundary

Core structured resources remain declarative. Do not embed arbitrary expressions/eval, loops/control flow, scripts, executable templates/macros, dynamic code loading, callbacks, implicit network execution, or effectively general-purpose semantics.

Decision autonomy must not introduce a weighted scoring language, arbitrary decision expressions, or a hidden planner DSL. Complex behavior belongs behind an explicit controller/runtime/policy-adapter interface.

## Outcome

Proceed only when mutation authority, material consequences, decision-autonomy behavior, and persistence/privacy boundaries are sufficiently clear. Otherwise return analysis, recommendation, and only the exact decision/blocker that genuinely remains unresolved under the effective mode.
