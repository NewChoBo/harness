# Security Policy

This repository and its GitHub collaboration, workflow, release, and package surfaces are public disclosure channels.

## Do not disclose sensitive material publicly

Do not place credentials, tokens, private keys, session material, personal/sensitive data, undisclosed vulnerability details, private consumer/customer/repository identities, internal infrastructure, private logs, raw private prompts, or confidential evidence in a public file, commit, branch/tag name, Issue, PR, review/comment, log, artifact, release, or package.

The repository-wide rule is [`protocol/public-information-boundary`](standard/protocols/public-information-boundary.md).

## Reporting

Use GitHub private vulnerability reporting when available. Otherwise contact a maintainer through an existing authorized private channel before disclosing sensitive detail. Create a public Issue only after the report can be minimized to public-safe information.

## Suspected exposure

1. Revoke or rotate exposed credentials immediately.
2. Stop automated propagation and further quoting/copying.
3. Notify the applicable private security/maintainer channel without repeating the value publicly.
4. Sanitize the current public surface where appropriate.
5. Assess commit history, workflow logs/artifacts, releases, registries, caches, forks, and mirrors.
6. Keep any public remediation report minimized and public-safe.

Never paste the leaked value into a report describing the leak.

Static scanners are defense in depth and do not prove public safety. Material security/privacy-boundary changes still require exact-candidate review.
