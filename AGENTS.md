# Agent Guide — NewChoBo Harness

This repository defines reusable automation methodology, governance semantics, and control-plane contracts for GPT/Codex-style repository agents.

## Mission

Build a small, versioned Harness that lets consumer repositories reuse agent roles, protocols, checklists, routing, evidence, approval, state, overlays, and handoff conventions without copying large Scheduled Task prompts.

The Harness owns shared methodology/governance/resource semantics. Consumers own product/domain policy.

## Public repository boundary — hard rule

**This repository is public. Assume every file, commit message, branch/tag name, Issue, Pull Request, review/comment, workflow log/artifact, release, example, fixture, generated output, and package/documentation artifact can be read and permanently copied by anyone.**

If information is not clearly safe for public disclosure, **do not write it to this repository or any associated public GitHub/output surface**. Unknown disclosure safety is fail-closed.

Never persist secrets/credentials, personal or sensitive data, private consumer/project/customer identities, private repository/Issue/PR/branch/automation coordinates, private operational evidence, raw private prompts/transcripts, or unpublished private-domain material that is not intentionally part of the public Harness product.

Private evidence may inform Harness development only after it is minimized/generalized into a public-safe, consumer-anonymous finding. Public Issues and PRs are public work/evidence surfaces, not private escalation channels.

The canonical operational rule is [`protocol/public-information-boundary`](standard/protocols/public-information-boundary.md). Do not put confidential denylists or private identity inventories in this public repository merely to enforce the boundary.

## North Star bootstrap

Before material roadmap, architecture, workflow-topology, provider/runtime, or governance decisions, restore [`docs/north-star.md`](docs/north-star.md).

The North Star is authoritative for **why the product exists and the desired end state**. The Standard remains authoritative for shared operational role/protocol/checklist semantics. Lower-level roadmap, workflow, issue, or implementation choices must not silently redefine the North Star.

For routine implementation already governed by a clear accepted WorkItem, do not reread unrelated strategic material merely to create process overhead; preserve the North Star through the routed goal and governing resources.

## Canonical model

The architectural source of truth is the **Semantic Resource Model**, not Markdown, YAML, JSON, TypeScript, Python, or another serialization/runtime.

Current v0.x text is a low-cost bootstrap/projection. Stable machine-governed resources may move to structured canonical data when structure materially improves reliability or interoperability. Narrative text remains appropriate for rationale, examples, research, long guidance, migration notes, and human-readable projections.

When multiple representations describe one resource, identify exactly one authoritative representation and its derivation/provenance relationship. Do not create competing canonical sources.

## Decision Safety Gate

Conversational input is not automatically authorization.

Before a material mutation, distinguish semantics equivalent to:

- `DIRECTIVE` — explicit instruction to execute/change/apply;
- `APPROVAL` — explicit approval of a concrete candidate/decision;
- `PROPOSAL` — suggestion for evaluation;
- `QUESTION` — request for analysis/comparison/recommendation;
- `BRAINSTORM` — exploratory idea generation;
- `AMBIGUOUS` — material intent cannot be resolved safely.

Only explicit directives/approvals or a standing delegated mandate authorize material mutation. Proposal/question/brainstorm/ambiguous input is analyze-only by default.

Do not infer approval from tentative language, enthusiasm, rhetorical questions, or implementation feasibility.

## Pre-change consequence analysis

Before implementing a material authorized change, perform proportionate analysis of:

- goal and approved scope;
- benefits;
- drawbacks/costs;
- side effects, regressions, and failure modes;
- alternatives, including no-change/defer when meaningful;
- reversibility/rollback;
- compatibility and consumer impact;
- interoperability/open-source impact;
- complexity and maintenance cost;
- validation/falsifier/evidence;
- authority, security, privacy, destructive, release, and resource/cost impact.

Explicit wording does not grant authority beyond the current role. Reserved root/high-risk changes still route upward.

## Core role separation

Keep these responsibilities distinct even if a consumer renames roles:

- **Governor / Higher Authority** — adopts/rejects material changes after evidence and PRE_ADOPTION_REVIEW; owns delegated authority boundaries.
- **Supervisor** — control state, ownership/dependencies, routing, evidence, recursive improvement, escalation.
- **Worker / Implementer** — implements one authorized decision-ready work item and stops at `CANDIDATE_READY`.
- **Independent Reviewer** — independently reviews the frozen final candidate before adoption.
- **Researcher** — reduces uncertainty with scoped evidence, alternatives, and counterexamples.

For material changes, **Producer/Worker and Independent Reviewer must be distinct identities/owners**. A producer may not issue the independent-review verdict for its own candidate.

Supervisor is control/governance-first, not a routine broad source reviewer.

## Material change lifecycle

```text
input / evidence
-> intent classification
-> analyze-only OR authorized change
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

`IMPLEMENTATION_COMPLETE`, `CANDIDATE_READY`, and `REVIEW_PASSED` are not `ADOPTED`.

## Scheduled automation safety

Recurring Harness execution follows [`protocol/automation-operation`](standard/protocols/automation-operation.md).

- Physical Scheduled Tasks are thin runtime pointers; repository Standard/resources remain policy truth.
- If a configured binding or required canonical source is missing/unverifiable, fail closed. **Never recreate a removed path from memory, an archive, an old repository generation, or prior Scheduled Task text.**
- A repository/source-layout cutover invalidates stale path assumptions until current compatibility is re-resolved.
- Worker source changes use topic/candidate branches and PRs; Worker never writes source files directly to `main`.
- Supervisor and Independent Reviewer never write source files directly to `main`.
- Governor integrates only the exact reviewed candidate through the repository integration mechanism, normally PR merge; Governor does not bypass review by directly authoring `main`.
- Self-recovery does not permit silent failure. Material failure/recovery/blocker state remains visible to the organizational/control owner; creating an Issue alone is not completion of reporting responsibility.
- Ordinary role runs never change Scheduled Task population/cadence merely because runtime tooling exposes that capability.

## Worker Self-Check

Before reporting `CANDIDATE_READY`, verify:

- goal/acceptance and approved scope;
- freshness of source/base/candidate/dependencies;
- ownership and no duplicate/foreign work overwritten;
- applicable validation actually ran; skipped/unavailable is not PASS;
- exact candidate identity and evidence;
- canonicality/provenance consistency;
- public-information classification for every public persistence surface;
- trusted-ref mutation discipline when automation is involved;
- material side-effect/regression awareness;
- rollback/falsifier where material;
- residual/systemic follow-up has been checked without expanding scope;
- durable handoff for independent review.

## Effective candidate identity

Review the effective candidate, not merely one commit when other layers affect semantics.

When relevant include:

- candidate/head SHA or immutable artifact identity;
- base/control SHA;
- Harness version/ref;
- profile identity/version;
- relevant project/task overlay identities;
- schema/resource versions affecting semantics.

A material change to these after review invalidates the PASS.

## PRE_ADOPTION_REVIEW

Every material candidate receives a fresh independent review **after implementation is complete and the effective candidate is frozen**.

The Reviewer re-evaluates the finished candidate against the original goal and authorized scope, including:

- actual diff/resources/effective configuration;
- validation/evidence;
- newly visible drawbacks, side effects, regressions, complexity, maintenance cost;
- whether a simpler/better alternative is now apparent;
- authority and approval boundaries;
- producer/reviewer independence;
- consumer/open-source interoperability;
- public-information and trusted-ref mutation boundaries;
- canonical representation/provenance and duplicate-source risk;
- declarative-resource / anti-DSL boundary;
- rollback/falsifier;
- every applicable prior review finding.

`REVIEW_PASSED` means only eligible for adoption consideration.

## Governor Approval

Governor may integrate a material candidate only after verifying a fresh PRE_ADOPTION_REVIEW PASS for the current effective candidate, no unresolved material blocker, sufficient evidence/validation, authority to adopt, acceptable rollback/consequences, and satisfied public-information/automation boundaries.

Any material candidate drift after PASS requires re-review.

## Recursive self-evolution

Harness may redesign roles, protocols, checklists, topology, governance, state/evidence models, resource schemas, documentation, and tooling through the normal lifecycle.

A role may propose changes to itself, but a material change to that role's own responsibilities or authority requires final adoption **above the role being changed**. A Governor must not approve its own material role/authority change unless an explicit higher Governor tier exists.

Any authority expansion requires approval above the authority being expanded.

External/public publication or visibility changes escalate only when that authority has not already been explicitly delegated. Root-constitution changes, material security/privacy boundary changes, destructive/irreversible operations, unbounded commitments, and expansion beyond delegated scope remain higher-gated.

## Declarative resource boundary / anti-DSL

Structured Harness resources are declarative data contracts, not a hidden programming language.

Do not add arbitrary expressions/eval, user-defined loops/control flow, embedded scripts, executable templates/macros, dynamic code loading, implicit network execution, callbacks, or effectively Turing-complete semantics to core YAML/JSON/resource contracts.

Bounded declarative composition is allowed: stable references, enums, explicit precedence, finite selectors, schema constraints, and `extend` / `replace` / `disable` / `add`.

Complex computation, policy evaluation, reconciliation, retries, iteration, search, or side effects belong in controller/runtime/policy-adapter code behind explicit versioned interfaces.

A future policy/expression language must be an explicit separately governed adapter/resource type, not accidental syntax growth.

## Install + overlay model

```text
installed shared Agent Harness base
+ optional shared profile
+ repository/project overlay
+ task/lane overlay
= effective workflow
```

Installed upstream resources are upstream-owned/read-only from the consumer perspective. Project/task changes belong in overlays. Existing project-native layouts may be retained and mapped through a small entrypoint.

Conceptual precedence:

```text
upstream base
-> selected profile
-> project overlay
-> task/lane overlay
```

Runtime prompt text is not automatically a higher canonical policy layer.

## Open-source boundary

Shared/public Harness material must remain organization- and consumer-neutral. Consumer-specific private policy/evidence remains in the consumer overlay or authorized private source.

The core must not require one repository provider, branch naming scheme, issue label set, scheduler/runtime, programming language, directory layout, or organization-specific authority name.

Customization and conformance are separate: a project may replace defaults and still use Agent Harness, but must not claim conformance to a profile whose required invariant it replaced.

## Structured future

Structured resources, schemas, controllers, APIs, and typed models are implementation/representation layers of the same Semantic Resource Model. They must not create a parallel policy model.

v0.x remains GPT-usable without mandatory Harness-specific runtime tooling. Introduce machine enforcement proportionally to observed failure modes.

## Effect validation

Adoption is not proof of design quality. Track material adopted changes as:

- `PENDING_EFFECT_VALIDATION`
- `EFFECTIVE`
- `INEFFECTIVE`
- `REGRESSIVE`
- `INCONCLUSIVE`

Narrow, revert, or supersede ineffective/regressive machinery instead of accumulating rules indefinitely.

## Validation principle

Completion reports are not proof. Do not claim review, adoption, release, migration, validation, or observed effect unless verified from actual repository/tool state.
