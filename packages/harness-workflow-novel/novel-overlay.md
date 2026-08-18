# Fiction / Narrative Overlay

## Primary intent

The shared base supplies governance and review semantics; this overlay preserves
long-form continuity, canon discipline, and author-centric cadence.

## Recommended defaults

- Require source/version lock checks before major chapter-level writes.
- Keep writer-safe checkpoints and explicit restoration points.
- Separate canon, draft, and published output scopes.
- Keep "source gate + acceptance gate" explicit before major transitions.

## Recommended source gates

- `exact_source_revision`: re-check exact source before material edits.
- `canon_boundary_check`: validate project-owned canon scope before publishing.
