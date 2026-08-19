# Public Automation Safety

Resource ID: `checklist/public-automation-safety`

Apply this checklist when a candidate or run can mutate a public repository, reconcile Scheduled Tasks, integrate branches, or create a release tag.

## Public persistence

- every changed file and associated commit/branch/Issue/PR/review/log/artifact/release/package surface is intentionally `PUBLIC_SAFE` under `protocol/public-information-boundary`;
- no private consumer/project/customer identity, private repository/task coordinate, private evidence, raw prompt/transcript, secret, credential, or confidential denylist is present;
- tracked payloads are actually readable; an unresolved Git LFS pointer or unavailable generated payload remains `UNKNOWN` and blocks PASS;
- a private finding was minimized/generalized before public persistence.

## Canonical source and task binding

- the physical task points to a current repository-owned binding and does not duplicate policy;
- a missing/unreadable binding caused `CONTROL_SOURCE_MISSING`, not reconstruction or restoration from memory, archives, private consumers, or stale branches;
- task population/cadence was not changed by the task itself;
- runtime capability did not widen authority.

## Branch and integration lifecycle

- material source work occurred on one short-lived topic branch/PR from a current base;
- Worker, Supervisor, and Independent Reviewer did not write directly to `main`;
- an existing valid branch/PR was restored before creating another for the same work item;
- interrupted work remains valid and has a durable continuation, or it was classified superseded/empty/merged/experiment-only;
- the reviewed candidate exactly matches the merge candidate;
- expected-head integration and resulting `main` were/will be verified;
- owner state and head-branch cleanup are explicit completion obligations;
- no required unique delta is being deleted during cleanup.

## Failure and reporting

- a material child failure/self-recovery was made discoverable to its accountable higher owner;
- recovery attempts were bounded, finite, and truthfully classified as `RECOVERED | DEGRADED | BLOCKED` or an equivalent state;
- repeated non-convergence triggered diagnosis/rerouting/rollback rather than blind replay;
- failure reports contain only decision-relevant evidence, not private chain-of-thought or protected evidence;
- unresolved human/reserved action is deduplicated and remains pending until actually resolved or no longer required.

## Release tagging

When a tag is in scope:

- explicit standing tag authority covers this repository and release class;
- tag target is the exact current `main` commit and all source changes were merged through reviewed PRs;
- required exact-SHA checks are green and no material review/blocker remains;
- all publishable package versions match the SemVer tag;
- public-boundary and package-content validation passes;
- tag, GitHub Release, and registry version state were checked for safe idempotence;
- the management agent pushes only the verified tag; the release workflow owns publication and GitHub Release creation;
- tagging is not represented as source-edit, deployment, or effect authority.

Any unresolved item blocks a success/PASS claim for the affected operation.
