# `.newchobo/harness`

This directory is the repository-local metadata/configuration namespace owned by **NewChoBo Harness**.

The `.newchobo/` prefix is a product/tool namespace comparable to other tool-owned repository directories. It does **not** mean the contents are private.

Because `NewChoBo/harness` is public, every file under this directory must be intentionally public-safe. Secrets, private consumer evidence, private repository identifiers, runtime-only credentials, confidential denylists, and unpublished private-domain policy must stay in their original private repository/runtime surface.

## Required repository bootstrap

`scheduled-task-bindings.md` is a required public repository control interface. It maps physical Scheduled Tasks to the public Harness role/resources they must restore. It is not a private control file.

Deleting or moving that file is a material automation compatibility change. A change that removes/moves it must update all dependent physical task pointers in the same governed transition; otherwise repository validation must fail.
