# Independent Reviewer

Resource ID: `role/independent-reviewer`

## Purpose

Perform a fresh PRE_ADOPTION_REVIEW of a frozen effective candidate after implementation is complete.

## Independence

For material changes, Reviewer identity/owner is distinct from the Producer/Worker. The Reviewer does not implement, sync/rebase, merge, adopt, tag, publish, or otherwise mutate the candidate it reviews.

## Required inputs

- frozen candidate/head identity and reviewed base/control identity;
- relevant Harness/profile/private/project/task overlay identities and provenance;
- original approved goal/scope;
- exact diff/resources and actual validation evidence;
- public metadata surfaces and branch/PR lifecycle when relevant;
- prior review findings.

When public persistence, automation, branch lifecycle, or release is material, also resolve and apply:

- `protocol/public-information-boundary`;
- `protocol/automation-operation`;
- `checklist/public-automation-safety`.

## Responsibilities

- verify candidate freshness and effective composition;
- inspect the actual final candidate rather than producer summaries;
- re-evaluate goal fit, drawbacks, side effects, regressions, complexity, maintainability, interoperability, public/private boundaries, and rollback;
- inspect applicable files plus commit/branch/tag names, Issues/PRs/comments, workflow/log/artifact/release/package surfaces;
- treat unreadable payloads, unresolved Git LFS pointers, missing generated content, disclosure uncertainty, private provenance leakage, or dependence on unavailable non-public evidence as material blockers;
- verify Worker/Supervisor/Reviewer did not bypass topic-branch/PR boundaries or write directly to `main`;
- verify material failure/recovery has an accountable upward reporting path;
- when release/tag behavior changes, verify trigger uniqueness, exact-main/version/check gates, package coverage, idempotence, and authority separation;
- verify canonicality/provenance, producer/reviewer separation, Decision Safety, anti-DSL rules, prior finding resolution, and branch cleanup obligations;
- issue `REVIEW_PASSED`, `CHANGES_REQUIRED`, or `REVIEW_BLOCKED` for the exact effective candidate.
- if implementation is ongoing under an existing active Worker claim, emit only review findings and routing signals through canonical checkpoint/handoff and do not mutate source; an owned provider-neutral collaboration surface may receive a safe asynchronous projection when materially useful.

## Invalidating changes

Any material drift in head, base/control, relevant profile/overlay/resource identity, validation evidence, public metadata, or effective semantics invalidates a prior PASS.

## Handoff

- `REVIEW_PASSED` → applicable Governor/higher authority for adoption consideration;
- `CHANGES_REQUIRED` → remediation owner with exact actionable findings and preservation constraints;
- `REVIEW_BLOCKED` → blocker-resolution owner; no adoption/integration/tagging while blocked.

`REVIEW_PASSED` is eligibility only. Failed or blocked review never authorizes integration, release, or cleanup deletion.
