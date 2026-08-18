# ChatGPT Scheduled Task Bindings

Status: public repository-owned Harness runtime bootstrap source

This file is a thin projection over canonical Harness Standard resources. It does not own detailed automation policy.

## Common bootstrap

Every binding:

- freezes the current remote `main` exact SHA once at run start;
- loads `AGENTS.md`, `standard/catalog.yaml`, `protocol/automation-operation`, and the role-specific canonical resources from that same snapshot;
- restores only current public repository state needed for the selected work;
- fails closed when this binding or any required canonical source cannot be verified;
- never reconstructs a missing or moved path from memory, archive history, previous repository generations, old scheduler text, or another consumer;
- treats every repository/GitHub persistence surface as public;
- performs source mutations only through the role-appropriate candidate/PR lifecycle;
- does not change physical task population/cadence or widen authority merely because runtime tooling exposes those controls;
- permits `NO_ACTION` without persistence noise.

## governor

Load at minimum:

- `standard/roles/governor.md`
- `standard/protocols/adoption-lifecycle.md`
- `standard/protocols/automation-operation.md`
- `standard/checklists/pre-adoption-review.md`

Restore current public candidate/review/adoption state. Integrate only an exact candidate with fresh producer-distinct `REVIEW_PASSED`, satisfied validation, no unresolved material blocker, and applicable authority. Normal integration is merge of the exact reviewed PR. Do not directly author source on `main`.

When release/tag authority has been explicitly delegated, the Governor may create an applicable reviewed release tag only after confirming the exact integrated commit, release version/cohort, required validation, and repository release policy. Tagging is not implied by ordinary adoption authority.

## supervisor

Load at minimum:

- `standard/roles/supervisor.md`
- `standard/protocols/control-cycle.md`
- `standard/protocols/deep-audit-and-escalation.md`
- `standard/protocols/checkpoint-handoff.md`
- `standard/protocols/automation-operation.md`

Restore current public Issues/PRs/candidates/reviews/blockers, active topic branches, and material continuations. Reconcile ownership/dependencies/duplicate work, route the highest-value bounded control action, and ensure material child failure/recovery/blocker state remains visible upward. Do not implement source or write source files directly to `main`.

When a non-main branch is not actively owned but contains unfinished material work, route continuation to completion/review/merge before cleanup. Delete a branch only after verifying that its material delta is integrated, superseded, or intentionally abandoned under current authority.

## worker

Load at minimum:

- `standard/roles/worker.md`
- `standard/protocols/change-safety.md`
- `standard/protocols/automation-operation.md`
- `standard/checklists/agent-self-check.md`

Restore one current decision-ready public work item. Implement on a topic/candidate branch, run applicable validation, freeze the exact candidate, and open/update a PR for producer-distinct review. Never write source files directly to `main`, self-review formally, or self-adopt.

## independent-reviewer

Load at minimum:

- `standard/roles/independent-reviewer.md`
- `standard/protocols/adoption-lifecycle.md`
- `standard/protocols/automation-operation.md`
- `standard/checklists/pre-adoption-review.md`

Select one eligible frozen exact candidate, inspect its actual diff/effective resources and validation evidence, and persist a public-safe verdict/handoff. Do not modify candidate source, sync/rebase it, or write source files directly to `main`.

## Physical task bootstrap

A physical task must contain both the pointer values **and** the minimal executable bootstrap instruction required to obtain this file safely. The v0.x scheduler prompt cannot assume that instructions inside this file are already known before the file is loaded.

Minimum shape:

```text
repository: NewChoBo/harness
control_ref: refs/heads/main
prompt_source: .newchobo/harness/scheduled-task-bindings.md#<binding-key>

Freeze control_ref to one exact SHA before reading prompt_source. Load prompt_source and every canonical resource it requires from that same frozen snapshot, then execute the selected binding. If prompt_source or a required resource is absent, moved, unreadable, or unverifiable, fail closed; do not reconstruct it from memory, archives, previous repository generations, old task text, or another consumer.
```

Runtime-only values may be appended when genuinely necessary, but detailed automation policy stays in repository Standard/resources rather than becoming a second scheduler policy store.

Future policy edits change canonical repository resources first, then reconcile existing physical tasks in place. Moving or deleting this file is a material automation-contract migration and must update validation and physical pointers in the same reviewed change.
