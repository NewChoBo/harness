# ChatGPT Scheduled Task Bindings

Status: **REQUIRED public repository-owned Harness runtime bootstrap**

This file is intentionally public-safe. It is a thin runtime projection over the current Harness repository and does not own detailed product/domain policy.

**Do not delete or relocate this file as a private-control cleanup.** `.newchobo/harness/` is the public NewChoBo Harness repository metadata namespace. Removing/moving this binding is a material automation compatibility change and requires all dependent physical task pointers to be migrated in the same governed transition.

## Common bootstrap

Every binding:

- freezes the current remote `main` exact SHA once at run start;
- loads `AGENTS.md`, `standard/catalog.yaml`, and the binding-specific canonical role/protocol/checklist resources from that same snapshot;
- restores only current public repository state needed for the selected work;
- fails closed when this binding or any required canonical source is missing, moved, unreadable, or unverifiable;
- never reconstructs a missing binding/path from memory, archives, old Scheduled Task text, previous repository generations, or private consumer repositories;
- treats source files, commit/branch/tag metadata, Issues, PRs, reviews/comments, workflow logs/artifacts, releases, and package outputs as public disclosure surfaces;
- persists only intentionally public-safe information;
- does not change physical Scheduled Task population/cadence merely because the runtime exposes scheduler controls;
- permits `NO_ACTION` without persistence noise.

## governor

Load at minimum:

- `standard/roles/governor.md`
- `standard/protocols/adoption-lifecycle.md`
- `standard/protocols/change-safety.md`
- `standard/checklists/pre-adoption-review.md`

Restore current public candidate/review/adoption state. Integrate only an exact candidate with fresh producer-distinct review, satisfied validation/authority gates, and no unresolved material blocker. Normal integration is merge of the exact reviewed PR. Do not directly author source files on `main`.

## supervisor

Load at minimum:

- `standard/roles/supervisor.md`
- `standard/protocols/control-cycle.md`
- `standard/protocols/deep-audit-and-escalation.md`
- `standard/protocols/checkpoint-handoff.md`

Restore current public Issues/PRs/candidates/reviews/blockers and material continuations. Reconcile ownership/dependencies/duplicate work and route one highest-value control action. Material child failure/self-recovery/blocker state must remain visible to the applicable control owner. An Issue is durable evidence, not completion of organizational reporting. Do not implement source or write source files directly to `main`.

## worker

Load at minimum:

- `standard/roles/worker.md`
- `standard/protocols/control-cycle.md`
- `standard/protocols/change-safety.md`
- `standard/checklists/agent-self-check.md`

Restore one current decision-ready public work item. Implement on a topic/candidate branch, run applicable validation, freeze the exact candidate, and open/update a PR for producer-distinct review. Never write source files directly to `main`, self-review formally, or self-adopt.

## independent-reviewer

Load at minimum:

- `standard/roles/independent-reviewer.md`
- `standard/protocols/adoption-lifecycle.md`
- `standard/checklists/pre-adoption-review.md`

Select one eligible frozen exact candidate, inspect its actual diff/effective resources and validation evidence, and persist a public-safe verdict/handoff. Do not modify candidate source, sync/rebase it, or write source files directly to `main`.

## Physical task pointer

A physical Scheduled Task should contain only the runtime pointer plus truly runtime-only values:

```text
repository: NewChoBo/harness
control_ref: refs/heads/main
prompt_source: .newchobo/harness/scheduled-task-bindings.md#<binding-key>
```

Repository policy changes here first and physical task pointers are reconciled afterward. If this source is unavailable, the correct behavior is fail-closed, not recreation from historical/private state.
