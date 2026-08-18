# `.newchobo/harness`

This directory is the public, repository-owned runtime/bootstrap namespace for NewChoBo Harness.

Everything in this directory is intentionally public. It must never contain secrets, private consumer identities, private repository or Issue/PR coordinates, customer or manuscript evidence, raw private prompts, confidential denylists, or private runtime state.

## Canonical ownership

- shared automation behavior is defined by canonical resources under `standard/`;
- this directory contains only thin repository/runtime projections over those resources;
- `scheduled-task-bindings.md` is the repository-owned bootstrap source for the standard Harness Scheduled Task roles;
- the external task manager stores only a thin repository/ref/binding pointer and truly runtime-only values;
- private consumer evidence, credentials, private runtime state, private identifiers, and consumer-specific policy remain at their authorized source and must not be copied here.

## Required bootstrap and fail-closed rule

The presence and section contract of `scheduled-task-bindings.md` are repository invariants covered by validation tests.

If this source is missing, unreadable, moved without a compatible migration, or unverifiable, execution returns `CONTROL_SOURCE_MISSING`, `CONTROL_SOURCE_UNVERIFIED`, or an equivalent blocked handoff. It must not reconstruct, restore, delete-and-recreate, or replace this directory from memory, old Scheduled Task text, archive history, an earlier repository generation, a stale branch, or another consumer.

Removing, relocating, or replacing the binding source is a material automation-contract migration. It requires an explicit reviewed candidate that updates the source path, repository documentation, validation, and physical scheduler pointers together.

## Public/private composition

The public Harness owns reusable public methodology and packages. Sensitive or consumer-specific behavior remains in the applicable authorized source and may influence this repository only after safe minimization and generalization.
