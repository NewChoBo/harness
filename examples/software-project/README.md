# Software Project Example

This example is intentionally product-neutral. It demonstrates logical composition, not a mandatory schema.

## Composition

```text
Agent Harness base
+ software-development profile (optional)
+ repository overlay
+ issue-implementation task overlay
= effective workflow
```

A consumer entrypoint could declare conceptually:

```yaml
base:
  version: <exact-harness-release>
profile: software-development
projectOverlay: .project-control/harness/
taskOverlay: .project-control/workflows/issue-implementation/
```

The fields are illustrative; no executable expression language is implied.

## Project overlay owns

- branch/release policy;
- package/module ownership;
- repository-specific validation commands;
- protected paths and write scope;
- issue/PR conventions;
- product/security rules.

## Effective work flow

1. Supervisor restores current repository/issue state and routes one decision-ready item.
2. Worker implements on a non-protected candidate branch and self-checks.
3. Worker freezes `CANDIDATE_READY` with head + base/control identity and validation evidence.
4. Independent Reviewer performs PRE_ADOPTION_REVIEW.
5. Applicable Governor/maintainer adopts only after `REVIEW_PASSED`.
6. Later evidence determines whether a shared guidance change was effective.

Repository policy stays local; only reusable workflow semantics come from the shared Harness.
