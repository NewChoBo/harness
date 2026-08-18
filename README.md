# NewChoBo Harness

NewChoBo Harness is a reusable **agent/workflow governance and control-plane Harness** for compatible AI agents, runtimes, and workflow systems.

It combines a zero-runtime-readable Semantic Harness with optional executable validation/composition tooling. The repository is the public canonical source for reusable Harness semantics and public package candidates; consumer-specific product/domain policy remains in consumer overlays.

## Public repository boundary

This repository is public. Treat source files, commit/branch/tag metadata, Issues, Pull Requests, reviews/comments, workflow logs/artifacts, releases, examples, fixtures, generated outputs, and package/documentation metadata as public disclosure surfaces.

If information is not clearly safe for public disclosure, do not persist it here. Private consumer/project/customer evidence, credentials, runtime-only private state, raw private prompts/transcripts, private repository/automation coordinates, and unpublished private-domain material stay at their authorized private source.

The canonical operational rule is [`protocol/public-information-boundary`](standard/protocols/public-information-boundary.md).

## Authority of this README

This README is a human-readable projection. Shared operational role/protocol/checklist/profile semantics are canonical under [`standard/`](standard/README.md), with resource identity/provenance indexed by [`standard/catalog.yaml`](standard/catalog.yaml).

If this overview conflicts with a canonical Standard resource, the Standard resource controls and this projection should be corrected.

## Semantic Resource Model first

The architectural source of truth is the **Semantic Resource Model**: resource identities, relationships, authority, lifecycle, state/evidence, composition, provenance, compatibility, and invariants.

```text
Semantic Resource Model
        +-> Standard narrative/structured resources
        +-> workflow presets and consumer overlays
        +-> typed models / validators / CLIs
        +-> provider/runtime projections
```

Markdown/YAML/JSON/TypeScript are representations, not the architecture itself. Stable machine-governed resources may become more structured when that materially improves reliability/interoperability, without creating a competing policy model.

## Current repository architecture

The repository is a pnpm workspace.

```text
standard/                         canonical shared semantics
schemas/                          workflow/result schemas
src/ + test/                      repository/reference preset CLI + tests
packages/engine/                  @newchobo/harness-core
packages/harness-workflow-coding/ public coding workflow package candidate
packages/harness-workflow-novel/  public generic fiction/narrative workflow package candidate
packages/harness-workflow-research/ public research workflow package candidate
.newchobo/harness/                public-safe NewChoBo Harness repository metadata/bootstrap
.github/workflows/                CI validation
```

### Root workspace

The root `@newchobo/harness` package is currently private and acts as the repository development/validation workspace plus the reference `agent-harness` preset CLI. It is not the public package publication contract merely because it has package metadata.

### Core package

`packages/engine` is the public package candidate `@newchobo/harness-core`. It validates/resolves canonical Harness catalog resources. Package publication remains a separately governed release action.

### Workflow packages

The coding, novel, and research packages provide generic declarative workflow defaults. Project-specific branch/release rules, customer/product policy, private evidence, canon, style, validation commands, and secret/private term inventories remain consumer-local.

The generic novel package is intentionally fiction/narrative-neutral; private or specialized genre extensions belong in separate consumer/domain extensions rather than public Core defaults.

## Zero-runtime remains first-class

Packageization does **not** make a runtime/package manager mandatory for the semantic Harness. Compatible agents can still consume the Standard resources directly. Executable tooling is an optional validation/composition projection over the same semantics.

## Core responsibilities

- **Governor / Higher Authority** — adopts/rejects material exact candidates after evidence and independent review.
- **Supervisor** — restores control state, routes ownership/dependencies, aggregates failure/escalation state, and coordinates recursive improvement.
- **Worker / Implementer** — implements one authorized decision-ready candidate and stops at `CANDIDATE_READY`.
- **Independent Reviewer** — independently reassesses the frozen exact candidate before adoption.
- **Researcher** — reduces uncertainty with evidence, alternatives, counterexamples, and falsifiers.

Producer and Independent Reviewer remain distinct for material candidates.

## Material lifecycle

```text
input / evidence
-> intent + authority classification
-> consequence analysis
-> Worker candidate
-> Worker self-check
-> CANDIDATE_READY
-> producer-distinct PRE_ADOPTION_REVIEW
-> REVIEW_PASSED
-> Governor/adopter integration
-> post-adoption effect validation
```

Implementation completion and review PASS are not adoption.

## Scheduled automation boundary

Recurring execution follows [`protocol/automation-operation`](standard/protocols/automation-operation.md).

Physical Scheduled Tasks are thin pointers into current repository-owned public-safe bindings under [`.newchobo/harness/`](.newchobo/harness/). Missing/unverifiable canonical control source fails closed; old paths are never reconstructed from memory/archive/previous repository generations.

Worker source changes use candidate branches/PRs. Supervisor and Independent Reviewer do not directly author source on `main`. Governor integrates only the exact reviewed candidate through the repository integration mechanism. Failure self-recovery does not hide the failure from the organizational/control reporting path.

## Install + overlay model

```text
installed/pinned NewChoBo Harness base
+ optional shared profile/workflow package
+ project-owned overlay
+ task/lane overlay
= effective workflow
```

Installed upstream resources remain upstream-owned/read-only from the consumer perspective. Consumer-specific policy/evidence belongs in local overlays and does not flow back into shared defaults without public-safe generalization and the normal candidate/review/adoption lifecycle.

## Workflow preset contract

Workflow preset v1 is documented in [`docs/preset-contract.md`](docs/preset-contract.md) and validated against [`schemas/preset.schema.json`](schemas/preset.schema.json).

The preset format is declarative and bounded. It does not provide arbitrary eval, loops, embedded scripts, dynamic code loading, or hidden network execution.

## Validation

Repository validation uses pnpm as the lockfile/package-manager source of truth:

```bash
pnpm install --frozen-lockfile
pnpm validate
```

The aggregate validation checks repository formatting/type/test/build, `@newchobo/harness-core`, every `packages/harness-workflow-*` preset, and public-boundary structural rules.

Automated checks are evidence, not proof of semantic correctness or public safety. Material candidates still require exact producer-distinct review.

## Effect validation

Material adopted changes remain subject to effect evaluation:

- `PENDING_EFFECT_VALIDATION`
- `EFFECTIVE`
- `INEFFECTIVE`
- `REGRESSIVE`
- `INCONCLUSIVE`

Ineffective/regressive mechanisms should be narrowed, reverted, or superseded instead of accumulating policy indefinitely.

## Status

Early v0.x architecture and package bootstrap. Public package metadata is experimental and does not by itself mean a release has been published or compatibility guarantees have stabilized.
