# `@newchobo/harness-core`

Focused TypeScript implementation for loading, resolving, validating, and inspecting NewChoBo Harness catalogs/resources.

This package is the executable engine layer. Shared governance semantics remain canonical in the public Standard resources shipped by `@newchobo/harness`.

## Commands

```bash
pnpm --filter @newchobo/harness-core validate
```

## Public boundary

The package is built and published from the public `NewChoBo/harness` repository. It must not embed private consumer identities, private overlays/evidence, credentials, or private runtime state.
