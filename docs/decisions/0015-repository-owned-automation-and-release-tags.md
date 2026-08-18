# Decision 0015 — Repository-owned automation and release tagging

## Context

A physical scheduler prompt can drift from repository guidance, and a renamed/recreated repository can make a missing binding look like accidental deletion. Direct writes to the trusted integration ref turn that interpretation error into source loss or unintended restoration. Release tags also require a clear authority boundary because tag push starts public publication.

Decision 0013 already owns repository-owned Scheduled Task bootstrap/binding durability. This decision adds the branch/integration, failure-reporting, and release-tag governance that composes with that binding contract.

## Decision

- Scheduled-task policy lives in the repository; the physical task stores a thin pointer.
- Missing/unreadable bindings fail closed and are never recreated from memory, archives, private consumers, or stale branches.
- Material source work uses one short-lived topic branch and PR.
- Worker, Supervisor, and Independent Reviewer never author source directly on the trusted integration ref.
- Governor integrates only an exact reviewed PR candidate and verifies/cleans the branch lifecycle.
- Material child failure is reported upward even when bounded self-recovery is attempted.
- A top-level management/Governor agent may push a SemVer release tag, with or without a leading `v`, only under explicit standing tag authority and after exact-trusted-ref, review, check, version, public-boundary, and idempotence gates pass.
- Exact-trusted-ref applies at tag creation. The release workflow validates the immutable tag source and requires it to remain in trusted-ref ancestry so an in-flight release is not invalidated merely because a later reviewed change advances the trusted ref.
- Tag push, not a GitHub Release publication event, is the automatic release entrypoint. The release workflow publishes packages and creates the GitHub Release.

The canonical operational semantics are `protocol/automation-operation`.

## Consequences

Repository state becomes the durable source of automation truth. Incorrect self-healing cannot silently restore obsolete files, ordinary roles cannot bypass review through direct trusted-ref commits, and release publication has one deterministic trigger. Branch protection/rulesets remain a hosting-level defense in depth requirement.
