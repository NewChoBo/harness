# Decision 0014 — Public-by-default information boundary

## Context

NewChoBo Harness is developed in a public canonical repository. Public hosting exposes files plus branch/tag names, commit metadata, Issues, Pull Requests, comments/reviews, workflow logs/artifacts, releases, registries, and generated documentation.

Reusable design may be informed by private consumers or private overlays, but raw private context must never become public Harness provenance.

## Decision

- Every public persistence surface requires intentionally `PUBLIC_SAFE` content.
- `NON_PUBLIC` and `UNKNOWN` content fail closed.
- Private evidence may influence public Harness only after minimization/generalization into a consumer-anonymous finding.
- Public Issues and Actions output are disclosure surfaces, not private escalation channels.
- The public repository contains no confidential denylist or inventory of private identities.
- Worker, Reviewer, Supervisor, Governor, release automation, and contribution guidance preserve the same boundary.

The canonical operational semantics are `protocol/public-information-boundary`.

## Consequences

Private consumers remain useful canaries without becoming public provenance. Some investigations need a private companion channel, and scanners cannot replace semantic judgment. Deleting the latest file does not reverse an earlier disclosure.
