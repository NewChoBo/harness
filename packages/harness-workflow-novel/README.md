# Harness workflow: novel

Public shared workflow preset for fiction and narrative writing.

This package intentionally contains only general narrative workflow semantics. Sensitive or unpublished domain methodology belongs in an authorized private overlay source; project canon, characters, plot, prose, metadata, and exact review state remain consumer-owned.

Use this package when a project:

- wants bounded long-form production and recovery;
- needs explicit source/canon/write-scope ownership;
- separates Writer self-check from exact-candidate independent review;
- composes public defaults with optional private and project-local overlays.

Package contents:

- `preset.yaml` — general fiction workflow preset;
- `novel-overlay.md` — copy-editable public baseline overlay.

Conceptual composition:

```text
@newchobo/harness
+ @newchobo/harness-workflow-novel
+ optional authorized private reusable overlay
+ consumer/project canon and policy
+ task/lane overlay within delegated scope
= effective Novel workflow
```

This public package does not identify or require one private repository. Consumers pin any required private source by exact reviewed ref in their own private configuration. If a required private overlay is unavailable, sensitive-domain production/review fails closed; it must not reconstruct policy from memory or silently fall back to the public baseline.

Usage:

1. install/pin this package;
2. load `preset.yaml` and `novel-overlay.md`;
3. add authorized private/project overlays in the consumer repository;
4. record the exact effective public/private/project identities in the work/review handoff;
5. execute through the normal Writer → independent review → integration lifecycle.
