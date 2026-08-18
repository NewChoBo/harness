# Decision 0001 — Prefer exact vendored Harness releases for initial reproducible consumers

## Status

Accepted as the preferred initial reproducibility model; tooling details remain optional.

## Context

Scheduled and interactive GPT workflows must reliably read the Harness contract. A runtime can theoretically read both a consumer repository and an exact Agent Harness release directly, but that creates a two-source bootstrap/provenance problem.

Initial consumers also need reviewable Harness upgrades and straightforward rollback.

## Decision

For the first reproducible canaries, prefer an **exact reviewed Agent Harness tag/release copied or vendored into the consumer repository**, with the applied upstream version/ref and provenance recorded by the consumer.

The consumer keeps project-specific overlay files separate from the installed upstream base.

Illustrative logical structure:

```text
consumer entrypoint
installed upstream Harness snapshot
project-local Harness overlay
task/lane overlay
```

A neutral default physical layout may be:

```text
.agent-harness/
  harness.md
  lock.md or lock.yaml
  vendor/agent-harness/<version>/**
  project/**
  workflows/**
```

Existing repositories may keep a different local layout and expose it through the consumer entrypoint.

## v0.1 zero-runtime constraint

**Machine sync/integrity tooling is not required for v0.1.**

An exact snapshot may be copied or vendored using a reviewed manual/repository-native process as long as the source release/ref is identifiable and rollback remains possible.

Later tooling may automate:

- install/update;
- integrity verification;
- upstream/local diff;
- lock metadata;
- rollback assistance.

Those are convenience and hardening layers, not prerequisites for GPT consumption.

## Consequences

### Benefits

- one reproducible consumer repository snapshot where vendoring is used;
- straightforward rollback;
- Harness upgrades are visible in consumer review;
- GPT only needs ordinary repository file reads;
- project/private overlays remain local;
- no mandatory runtime cross-repository import resolver.

### Costs

- vendored files can create repository churn;
- consumers explicitly choose when to upgrade;
- manual vendoring before tooling exists requires provenance discipline;
- duplicated upstream snapshots may increase repository size.

## Consumer ownership rule

Installed upstream files are treated as upstream-owned/read-only from the consumer's perspective.

Consumer modifications belong in project/task overlays. Upgrades replace/update the installed base while preserving local overlays separately.

## Alternative: exact cross-repository reference

A consumer may reference `agent-harness` by exact tag/commit when its runtime can reliably freeze, authorize, and audit both sources.

This is architecturally valid and may be preferable for some external projects, but it is not the initial reproducibility default because provenance and two-source snapshot handling are more complex.

## Falsifier / revisit condition

Revisit the default when multiple consumer environments demonstrate that exact cross-repository loading provides simpler provenance, rollback, and collaboration than vendoring.
