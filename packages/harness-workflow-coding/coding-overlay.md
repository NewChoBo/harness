# Coding Consumer Overlay

## Intent

- Keep repository-specific implementation policy local.
- Preserve shared control semantics from `@newchobo/harness-core`.

## Recommended defaults

- Rebuild validation sequence (typecheck + tests + lint/format gate) before handoff.
- Keep each decision-ready change scoped to a single concrete intent.
- Keep private/private-control policy in repository overlays, not this shared package.
- Preserve asynchronous review coordination by recording Controller routing, worker progress, and review/evidence snapshots in a provider-neutral collaboration room.

## Suggested source gates

- `exact_control_ref`: re-check source control reference before writing material.
- `evidence_bundle_present`: attach the validation artifact bundle with PR or handoff.
