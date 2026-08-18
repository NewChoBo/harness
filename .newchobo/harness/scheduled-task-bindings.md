# ChatGPT Scheduled Task Bindings

Status: public repository-owned Harness runtime bootstrap source

This file is a thin projection over canonical Harness Standard resources. It does not own detailed automation policy.

## Common bootstrap

Every binding:

- freezes the current remote `main` exact SHA once at run start;
- loads `AGENTS.md`, `standard/catalog.yaml`, `protocol/public-information-boundary`, `protocol/automation-operation`, and the role-specific canonical resources from that same snapshot;
- restores only current public repository state needed for the selected work;
- fails closed when the binding or any required canonical source cannot be verified;
- never reconstructs a missing path from memory, archive history, prior Scheduled Task text, or another repository generation;
- treats every repository/GitHub persistence surface as public;
- executes at most one material item unless an adopted Standard resource explicitly requires otherwise;
- does not change physical task population/cadence or widen authority;
- permits `NO_ACTION` without persistence noise.

## governor

Load:

- `standard/roles/governor.md`
- `standard/protocols/adoption-lifecycle.md`
- `standard/checklists/pre-adoption-review.md`

Restore public candidate/review/adoption state and select at most one adoption-ready exact candidate. Integrate only a candidate with fresh valid producer-distinct review and satisfied authority, validation, rollback, and public-information gates. Normal integration is merge of the exact reviewed PR; do not directly author source on `main`.

## supervisor

Load:

- `standard/roles/supervisor.md`
- `standard/protocols/control-cycle.md`
- `standard/protocols/deep-audit-and-escalation.md`
- `standard/protocols/checkpoint-handoff.md`

Restore current public Issues/PRs/candidates/reviews/blockers and material continuations. Reconcile ownership/dependencies/duplicate work, route one highest-value control action, and ensure material child failures remain visible through the reporting path. Do not implement source or write source files directly to `main`.

## worker

Load:

- `standard/roles/worker.md`
- `standard/protocols/change-safety.md`
- `standard/checklists/agent-self-check.md`

Restore one current decision-ready public work item. Implement on a topic/candidate branch, run applicable validation, freeze the exact candidate, and open/update a PR for producer-distinct review. Never write source files directly to `main`, self-review formally, or self-adopt.

## independent-reviewer

Load:

- `standard/roles/independent-reviewer.md`
- `standard/protocols/adoption-lifecycle.md`
- `standard/checklists/pre-adoption-review.md`

Select one eligible frozen exact candidate, inspect its actual diff/effective resources and validation evidence, and persist a public-safe verdict/handoff. Do not modify candidate source, sync/rebase it, or write source files directly to `main`.

## Physical task pointer

A physical task should contain only the runtime pointer shape plus runtime-only values that cannot safely/canonically live here:

```text
repository: NewChoBo/harness
control_ref: refs/heads/main
prompt_source: .newchobo/harness/scheduled-task-bindings.md#<binding-key>
```

Future policy edits change canonical repository resources first, then reconcile existing physical tasks in place.
