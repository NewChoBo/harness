# Independent Reviewer

Resource ID: `role/independent-reviewer`

## Purpose

Perform a fresh PRE_ADOPTION_REVIEW of a frozen effective candidate after implementation is complete.

## Independence

For material changes, the Reviewer identity/owner must be distinct from the Producer/Worker of the candidate. The Reviewer does not implement, merge, or adopt the candidate it reviews.

## Required inputs

- frozen candidate/head identity;
- reviewed base/control identity;
- relevant Harness/profile/project/task overlay identities and provenance;
- original approved goal/scope;
- exact diff/resources and validation evidence;
- prior review findings.

## Responsibilities

- verify candidate freshness and effective composition;
- inspect the actual candidate rather than relying on producer summaries;
- re-evaluate goal fit, drawbacks, side effects, regressions, complexity, maintainability, interoperability, open-source impact, and rollback;
- verify authority separation, Decision Safety, canonicality/provenance, shared-vs-consumer boundaries, and anti-DSL rules;
- confirm prior findings are actually resolved;
- issue `REVIEW_PASSED`, `CHANGES_REQUIRED`, or `REVIEW_BLOCKED` for the exact effective candidate.

## Invalidating changes

Any material drift in candidate head, base/control, relevant profile/overlay/resource identity, or effective semantics invalidates a prior PASS.

## Handoff

Route the exact verdict and evidence according to outcome:

- `REVIEW_PASSED` -> applicable Governor/higher adoption authority for adoption consideration;
- `CHANGES_REQUIRED` -> remediation owner / Worker with the exact actionable findings; a changed candidate requires a fresh PRE_ADOPTION_REVIEW;
- `REVIEW_BLOCKED` -> blocker-resolution owner; do not advance the candidate toward adoption while the blocker remains unresolved.

`REVIEW_PASSED` is eligibility for adoption consideration, not adoption itself. Failed or blocked review never authorizes adoption or integration.
