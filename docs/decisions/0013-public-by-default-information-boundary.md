# Decision 0013 — Public-by-default information boundary

## Context

NewChoBo Harness is now developed in a public canonical repository. Public Git hosting exposes more than the current source tree: commit metadata, branch/tag names, Issues, Pull Requests, reviews/comments, workflow logs/artifacts, releases, package metadata, examples, fixtures, and generated outputs may all disclose information.

Private consumers and private operational evidence may still inform reusable Harness improvements, but the public repository must not become the persistence surface for that raw context.

## Decision

Adopt a fail-closed public information boundary:

- every public persistence surface must contain intentionally `PUBLIC_SAFE` information only;
- `NON_PUBLIC` and `UNKNOWN` information must not be persisted publicly;
- private evidence may influence public Harness only after minimization/generalization into a consumer-anonymous public-safe finding;
- public Issues/PRs/comments/logs are disclosure surfaces, not private escalation channels;
- confidential denylists and private identity inventories stay outside the public repository;
- Worker, Independent Reviewer, Supervisor, and Governor all preserve this boundary;
- public automation bootstrap must itself be public-safe.

The canonical operational semantics are `protocol/public-information-boundary`.

## Consequences

This prevents the public Harness from accumulating private consumer provenance while still allowing private canary evidence to improve shared semantics. It also means some investigations require a private companion evidence source and a generalized public work item.

Automated scanning is defense in depth and does not replace semantic disclosure judgment.
