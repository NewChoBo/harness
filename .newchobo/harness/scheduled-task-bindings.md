# ChatGPT Scheduled Task Bindings

Status: public repository-owned Harness runtime bootstrap source

This file is a thin projection over canonical Harness Standard resources. It does not own detailed automation policy.

## Common bootstrap

Every binding:

- freezes the current remote `main` exact SHA once at run start;
- loads `AGENTS.md`, `standard/catalog.yaml`, `protocol/automation-operation`, and the role-specific canonical resources from that same snapshot;
- inspects current open Issues/PRs relevant to the role's scope before selecting new work;
- restores explicitly routed/assigned owned Issues and their branch/PR/review/CI/dependency state before creating duplicate work;
- continues valid unfinished owned work and, after verifying the Issue's actual acceptance/done criteria plus any required linked source-change review/integration gate, closes the owned Issue when capability and authority permit;
- keeps a source-change Issue open while its required linked PR review/integration is unresolved unless the Issue explicitly defines a durable implementation-only handoff as completion;
- never closes another role's Issue merely because it is related; route/handoff foreign ownership instead;
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

Restore current public adoption-owned Issues plus candidate/review/adoption state. Integrate only an exact candidate with fresh producer-distinct `REVIEW_PASSED`, satisfied validation, no unresolved material blocker, and applicable authority. Normal integration is merge of the exact reviewed PR. Do not directly author source on `main`.

If an adoption/release Issue is owned by the Governor, reconcile it against the resulting trusted-ref/release evidence and close it only when its acceptance criteria are actually satisfied.

When release/tag authority has been explicitly delegated, the Governor may create an applicable reviewed release tag only after confirming the exact integrated commit, release version/cohort, required validation, and repository release policy. Tagging is not implied by ordinary adoption authority.

## supervisor

Load at minimum:

- `standard/roles/supervisor.md`
- `standard/protocols/control-cycle.md`
- `standard/protocols/deep-audit-and-escalation.md`
- `standard/protocols/checkpoint-handoff.md`
- `standard/protocols/automation-operation.md`

Restore current public Issues/PRs/candidates/reviews/blockers, active topic branches, and material continuations. Reconcile ownership/dependencies/duplicate work, route the highest-value bounded control action, and ensure material child failure/recovery/blocker state remains visible upward. Do not implement source or write source files directly to `main`.

The Supervisor closes only Issues it actually owns, such as resolved coordination/topology/ownership work. It must not close a Worker/Reviewer/Governor-owned Issue on that role's behalf merely because the downstream action finished; it verifies/reroutes stale ownership instead.

When a non-main branch is not actively owned but contains unfinished material work, route continuation to completion/review/merge before cleanup. Delete a branch only after verifying that its material delta is integrated, superseded, or intentionally abandoned under current authority.

## worker

Load at minimum:

- `standard/roles/worker.md`
- `standard/protocols/change-safety.md`
- `standard/protocols/automation-operation.md`
- `standard/checklists/agent-self-check.md`

Before selecting new implementation, inspect relevant open implementation Issues and restore the current owned work item/branch/PR state. Implement one current decision-ready owned work item on a topic/candidate branch, run applicable validation, freeze the exact candidate, and open/update a PR for producer-distinct review. Never write source files directly to `main`, self-review formally, or self-adopt.

When the Worker-owned Issue's acceptance criteria or repository lifecycle require downstream review/integration, leave it open with the exact handoff state until those gates are met. When its criteria and required linked integration state are fully verified within current authority, close it in the same run rather than leaving completed implementation Issues stale.

## independent-reviewer

Load at minimum:

- `standard/roles/independent-reviewer.md`
- `standard/protocols/adoption-lifecycle.md`
- `standard/protocols/automation-operation.md`
- `standard/checklists/pre-adoption-review.md`

Inspect relevant open review Issues/requests and select one eligible frozen exact candidate. Inspect its actual diff/effective resources and validation evidence, then persist a public-safe verdict/handoff. Do not modify candidate source, sync/rebase it, or write source files directly to `main`.

If a review Issue/request is owned by the Reviewer, close that review work item after the exact candidate verdict and required review evidence are durably persisted. The Reviewer must not close the producer's implementation Issue; return or route that Issue to its owning role for final lifecycle reconciliation.

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
