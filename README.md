# NewChoBo Harness

> 직접 일하기 귀찮은 모두를 위해

NewChoBo Harness is a public, provider-neutral agent/workflow governance and control-plane system. It combines reusable semantic roles/protocols/checklists with a TypeScript reference engine, public workflow packages, repository-owned automation bindings, and exact-candidate review/adoption conventions.

## Source of truth

- [`docs/north-star.md`](docs/north-star.md) — why the product exists and its desired end state.
- [`standard/`](standard/README.md) — canonical shared operational semantics.
- [`standard/catalog.yaml`](standard/catalog.yaml) — resource identity/path/kind/provenance metadata.
- [`src/`](src/) and [`packages/engine/`](packages/engine/) — executable reference implementations.
- [`packages/`](packages/) — public workflow packages.
- [`.newchobo/harness/`](.newchobo/harness/) — public repository-owned Scheduled Task bootstrap sources.

This README is an overview. Canonical resources control on conflict.

## Public repository boundary

Everything in this repository and its GitHub/Actions/release/package surfaces is public. If information is not clearly safe for public disclosure, do not write it here.

Private consumer identities, customer/project evidence, credentials, raw private prompts, unpublished sensitive content policy, and private operational state remain in their authorized private or consumer-owned source. Private evidence may influence this repository only after safe minimization/generalization. See [`protocol/public-information-boundary`](standard/protocols/public-information-boundary.md), [`CONTRIBUTING.md`](CONTRIBUTING.md), and [`SECURITY.md`](SECURITY.md).

## Current public packages

All publishable packages share one version:

- `@newchobo/harness` — public Harness package, Standard resources, schemas, and primary CLI/API.
- `@newchobo/harness-core` — focused catalog resolver/validation engine.
- `@newchobo/harness-workflow-coding` — coding workflow preset.
- `@newchobo/harness-workflow-novel` — general Novel workflow preset; sensitive content methodology is intentionally excluded.
- `@newchobo/harness-workflow-research` — research workflow preset.

Canonical package manager: pnpm.

```bash
pnpm install --frozen-lockfile
pnpm validate
pnpm validate:strict
```

## Semantic model

The architecture is format-neutral. Markdown/YAML/JSON/TypeScript are representations or implementations of a Semantic Resource Model containing identity, authority, workflow, state, evidence, composition, provenance, compatibility, and invariants.

Structured resources remain declarative; complex computation and side effects live in explicit runtime/controller/adapter code rather than accidental configuration-language growth.

## Core roles

- **Supervisor** restores live control state, reconciles ownership/dependencies/branches/failures/releases, and routes work.
- **Worker** implements one authorized slice on a topic branch and produces a frozen candidate.
- **Independent Reviewer** reviews the final exact candidate without editing it.
- **Governor / Adoption Authority** adopts/rejects/narrows and integrates exact reviewed PR candidates.
- **Researcher / Specialist** reduces uncertainty or supplies bounded expertise.

Producer and Independent Reviewer are distinct for material changes. Authority, autonomy, capability, organization/reporting, WorkItem ownership, workflow, and runtime topology remain separate.

## Material change lifecycle

```text
intent/evidence
-> authorized WorkItem
-> topic branch implementation
-> validation + Worker self-check
-> frozen CANDIDATE_READY
-> producer-distinct PRE_ADOPTION_REVIEW
-> adoption decision
-> exact PR integration
-> main/owner/branch cleanup
-> effect validation
```

Completion, review, merge, release, and effectiveness are different claims.

## Repository-owned automation

Public task bindings live at [`.newchobo/harness/scheduled-task-bindings.md`](.newchobo/harness/scheduled-task-bindings.md). Physical scheduler prompts contain only a thin repository/ref/binding pointer.

Missing bindings fail closed and are never reconstructed from old prompts, archives, private consumers, or stale branches. Worker/Supervisor/Reviewer never write directly to `main`. Valid interrupted branches are resumed; merged/superseded branches are cleaned after verifying no required unique delta. Material failures are reported upward even when bounded self-recovery is attempted.

See [`protocol/automation-operation`](standard/protocols/automation-operation.md).

## Releases

A pushed SemVer tag is the automatic release entrypoint. Both conventional `v0.1.0-alpha.3` tags and legacy bare `0.1.0-alpha.3` tags are supported; pushing either form starts publication after the tag/version gates pass. The release workflow:

1. resolves the immutable tag commit, verifies it remains in `main` history, and binds the worktree to that exact commit;
2. validates the pnpm workspace, public boundary, engine, and package version coherence after removing an optional leading `v`;
3. publishes missing versions of all five public packages through npm Trusted Publishing/OIDC;
4. creates or verifies the matching GitHub Release, marking prerelease versions as prereleases.

A delegated top-level management/Governor agent may create a release tag only after exact-main, review, check, version, public-boundary, existing tag/release/registry, and rollback gates pass. Ordinary workers do not tag or publish.

Each npm package must configure `release.yml` as its trusted GitHub publisher.

## Public/private composition

```text
public Harness base
+ public workflow/profile
+ authorized private reusable overlay
+ consumer repository overlay
+ project/task overlay within delegated scope
= effective workflow
```

Public packages never identify a specific private overlay source. A private consumer pins the applicable public and private sources by exact reviewed ref, while project canon/data/policy remains local. If a required private source is unavailable, sensitive-domain work fails closed rather than falling back to public or remembered policy.

## Recursive improvement

Adopted mechanisms are observed for effect. Repeated early exit, overwork, failure silence, stale branches, duplicated prompts, direct-main writes, release drift, or overdesign become bounded improvement signals. Ineffective/regressive machinery is narrowed, removed, reverted, or superseded through the same lifecycle.

## Status

Experimental alpha. The public package/API/schema surface may change until a stable release is declared.
