# `.newchobo/harness`

This directory is the repository-local metadata/configuration namespace owned by the **NewChoBo Harness** product.

The `.newchobo/` prefix is a vendor/product namespace comparable to other tool-owned repository directories. It does **not** imply that its contents are private.

Because this repository is public, every file under `.newchobo/harness/` must be intentionally public-safe and is governed by `protocol/public-information-boundary`.

Private consumer configuration, runtime-only credentials, private evidence, confidential denylists, private automation identifiers, and private operational state belong in their original private repository/runtime surface and must not be copied here.

Current repository-owned metadata:

- `scheduled-task-bindings.md` — thin public-safe bootstrap bindings for Harness Scheduled Tasks.
