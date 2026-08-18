## Harness workflow: novel

Shared workflow preset for fiction and narrative writing.

Use this when the project:
- wants facilitator-style narrative progression,
- has source/canon ownership boundaries,
- needs deterministic checkpoint/recovery style for long-form writing.

What this package provides:
- `preset.yaml`: baseline workflow preset for fiction domains
- `novel-overlay.md`: copy-editable overlay defaults

Usage pattern:
- copy `preset.yaml` and `novel-overlay.md` into a consumer workflow directory,
- layer with project-owned canon and write-scope policy, then
- apply via `agent-harness` CLI.
