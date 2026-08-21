# Contributing to NewChoBo Harness

NewChoBo Harness is developed publicly. Treat source files, commit messages, branch/tag names, Issues, Pull Requests, reviews/comments, workflow logs/artifacts, releases, examples, fixtures, and generated outputs as permanently public.

If information is not clearly safe for public disclosure, do not post it here. Use synthetic/minimized reproductions and keep private evidence in its authorized private source. The canonical rule is [`protocol/public-information-boundary`](standard/protocols/public-information-boundary.md).

## Licensing of contributions

By submitting a contribution to this repository, you agree that your contribution is provided under the project's MIT License. This does not transfer ownership of your original contribution; it establishes the license under which the contribution is accepted and redistributed as part of NewChoBo Harness.

## Change flow

Material changes follow:

1. establish goal, scope, owner, and authority;
2. restore an existing valid work branch/PR or create one short-lived topic branch from current `main`;
3. implement and run applicable checks;
4. freeze exact candidate identity and Worker self-check;
5. obtain producer-distinct review;
6. merge only through the applicable adoption authority;
7. verify `main`, close/update the owner when actually complete, and delete the merged branch;
8. observe material effect.

Do not push source directly to `main`. Do not create duplicate branches for the same work item. If a branch is interrupted, continue it only while its goal/owner/candidate remains valid; otherwise close/delete it after confirming no required unique delta remains.

## Issues and pull requests

Public Issues are not private support or incident channels. Remove secrets, private identities, internal paths/URLs, and unnecessary logs. A completion report or a green local check is not automatically Independent Review or adoption.

## Release changes

Version changes use a reviewed release PR. A release tag may be created only by the delegated release-tag authority after exact-main validation, version coherence, public-boundary review, and existing-tag/registry checks. Tag push triggers package publication and GitHub Release creation; contributors do not publish packages manually from a work branch.

## Security-sensitive reports

Do not post undisclosed vulnerabilities, credentials, or sensitive exploit evidence publicly. Follow [`SECURITY.md`](SECURITY.md).
