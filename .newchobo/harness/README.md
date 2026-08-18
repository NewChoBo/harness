# `.newchobo/harness`

This directory is the repository-local metadata and bootstrap namespace owned by **NewChoBo Harness**.

The `.newchobo/` prefix identifies NewChoBo-owned repository tooling metadata. It does **not** mean the contents are private. In this public repository, every file under `.newchobo/harness/` must be intentionally public-safe.

## Canonical ownership

- shared automation behavior is defined by canonical resources under `standard/`;
- this directory contains only thin repository/runtime projections over those resources;
- physical scheduler configuration may point here, but scheduler text is not a second policy store;
- private consumer evidence, credentials, private runtime state, private identifiers, and consumer-specific policy remain at their authorized private source and must not be copied here.

## Required repository bootstrap

`scheduled-task-bindings.md` is the repository-owned bootstrap source for the standard Harness Scheduled Task roles. Its presence and section contract are repository invariants and are covered by validation tests.

Removing or moving it is a material automation-contract change. A cleanup, migration, or recursive-improvement run must not delete or reconstruct it implicitly. Such a change requires an explicit reviewed candidate that updates the binding path, repository documentation, validation, and physical scheduler pointers together.
