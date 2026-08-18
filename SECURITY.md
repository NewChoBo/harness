# Security Policy

NewChoBo Harness is developed in a public repository. Public Issues, Pull Requests, reviews/comments, workflow logs/artifacts, releases, and repository files are disclosure surfaces.

Do not post credentials, tokens, private keys, session material, undisclosed exploit details whose publication would materially increase risk, personal/sensitive data, private repository/project/customer identities, internal infrastructure/operational evidence, or raw private logs that can be minimized/generalized.

The repository-wide information rule is `standard/protocols/public-information-boundary.md`.

## Sensitive reports

When GitHub private vulnerability reporting is available, use it for reports that cannot safely be disclosed publicly. Otherwise use an existing authorized private maintainer channel; do not paste sensitive details into a public Issue.

A public Issue may be created only when the report can be safely minimized so it contains no sensitive exploit/private-context details.

## Suspected credential exposure

If a credential or secret may have been exposed:

1. revoke or rotate it at the issuing system;
2. stop further copying or automated propagation;
3. notify the applicable private maintainer/security channel without repeating the value publicly;
4. sanitize the current public surface where appropriate;
5. evaluate history, logs/artifacts, release/package output, caches, forks, and mirrors rather than assuming latest-tree deletion reverses disclosure.

Never paste the leaked value into a report describing the leak.

Automated structural/secret checks are defense in depth; a passing scanner does not prove content is public-safe.
