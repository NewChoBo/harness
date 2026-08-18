# Decision 0003 — v0.1 uses a zero-runtime text bootstrap

## Status

Accepted. Narrowed by Decision 0005. Zero-runtime operational semantics are now mapped to canonical Standard resources.

## Decision

The first usable Agent Harness release must be consumable directly by GPT-style chat/agent environments without requiring Node, pnpm, npm, a resolver binary, or another machine workflow runtime.

For the earliest v0.1 bootstrap, Markdown/TXT may carry much of the working specification because those formats are cheap to author, review, diff, and consume while semantics are still changing.

This decision **does not make Markdown the permanent architectural source of truth**.

Decision 0005 establishes that the Semantic Resource Model is canonical and serialization formats are representations of that model. Structured resources may become authoritative as soon as a resource's semantics are sufficiently stable and machine governance benefits from structure.

## Operational canonical resources

The zero-runtime/direct-chat operating contract is now defined by:

- `standard/protocols/zero-runtime-operation.md` — authoritative zero-runtime bootstrap, capability/evidence truthfulness, fresh-chat review separation, and handoff semantics;
- `standard/checklists/zero-runtime-session.md` — authoritative concise zero-runtime completion gate;
- the role/protocol/checklist resources referenced by those resources for the routed stage.

Provider-specific quickstarts/examples are projections only and do not become operational policy.

For the mapped zero-runtime semantics above, this ADR is rationale/history/provenance rather than a second independently editable operational policy source. If future evidence changes the underlying decision, update/supersede this ADR and the affected Standard resources in the same governed candidate.

## Rationale

The sequencing goal remains valid:

- prove shared semantics cheaply in ordinary chat environments;
- avoid coupling first adoption to package/runtime tooling;
- use real chat/consumer canaries to discover stable resource boundaries and deterministic pain points;
- structure/automate resources when the structure is justified by actual operational value.

## Design consequence

Current text should use stable identities and explicit sections/fields where useful so later structured resources can represent the same concepts without semantic redesign.

Narrative text may remain appropriate indefinitely for rationale, examples, research evidence, long-form guidance, migration notes, and human-readable projections.

A zero-runtime session must not claim executable validation, repository access, persistence, or review isolation it does not actually possess. Missing capability is routed/blocked explicitly rather than being hidden behind prompt text.

## Existing tooling spike

Draft PR #2 and the later Engine foundation work remain useful implementation evidence for future structured-resource/tooling milestones, but they are not v0.1 runtime dependencies. Zero-runtime GPT/general-chat canary evidence should precede Engine-first completion work unless the user explicitly reprioritizes it.
