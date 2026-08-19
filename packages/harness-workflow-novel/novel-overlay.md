# Fiction / Narrative Overlay

## Primary intent

The shared base supplies governance and review semantics; this overlay preserves
long-form continuity, canon discipline, publication-surface separation,
reader-facing naturalness, and author-centric cadence.

Do not place explicit-content policies, banned-phrase dictionaries, sexual-content
boundaries, private editorial thresholds, customer/business rules, or
project-specific style guides in this package. Keep those rules in private or
consumer-owned overlays.

## Recommended defaults

- Require source/version lock checks before major chapter-level writes.
- Keep writer-safe checkpoints and explicit restoration points.
- Separate canon, draft, presentation metadata, and published story-body scopes.
- Keep "source gate + acceptance gate" explicit before major transitions.
- Apply `narrative-surface-integrity.md` before accepting a material narrative candidate.
- Apply `narrative-naturalness.md` as a reader-facing review/repair baseline without authorship-detector scoring or cosmetic humanization recipes.
- Treat internal chapter/episode IDs as presentation metadata, not diegetic prose, unless the project explicitly enables metafiction.
- Require both diegetic provenance and local context continuity for newly introduced facts, objects, memories, and state changes.
- After a material naturalness repair, freeze a new exact candidate and require fresh independent review.

## Recommended source gates

- `exact_source_revision`: re-check exact source before material edits.
- `canon_boundary_check`: validate project-owned canon scope before publishing.
- `narrative_surface_integrity`: separate presentation/production information from story body and verify context continuity.
- `narrative_naturalness`: review reader-visible over-explanation/patterning and re-realize the causal beat/window when material.
