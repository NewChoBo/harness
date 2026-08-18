# Public Information Boundary

Resource ID: `protocol/public-information-boundary`

This protocol governs every write to a public Harness repository or a derived public collaboration/output surface.

## Core invariant

Assume anything written to a public surface can become immediately world-readable, indexed, cached, forked, quoted, mirrored, and effectively irreversible.

Public surfaces include:

- source, documentation, examples, fixtures, snapshots, generated outputs, and package metadata;
- commit author metadata/messages and branch/tag names;
- Issues, Pull Requests, reviews, comments, labels, milestones, and public project metadata;
- workflow logs, artifacts, summaries, releases, release assets, registries, and generated documentation.

If information is not clearly safe for public disclosure, do not write it publicly.

## Bounded disclosure decision

Use only the distinction needed for persistence:

- `PUBLIC_SAFE` — intentionally public and reusable.
- `NON_PUBLIC` — secrets, personal/sensitive data, private consumer/project/customer/domain information, private coordinates, private evidence, internal state, or unpublished material.
- `UNKNOWN` — current evidence cannot establish public safety.

`UNKNOWN` is fail-closed and is treated like `NON_PUBLIC` for persistence. This is a write gate, not a general data-classification language.

Do not commit confidential denylists or inventories of private identities to enforce this protocol. Private environments may run additional local checks that never become public artifacts.

## Public write gate

```text
candidate information
-> establish disclosure status
-> PUBLIC_SAFE?
   yes -> continue the normal authority/review lifecycle
   no/unknown -> do not persist publicly
                 minimize/generalize or route privately
```

Repository capability, authority, review status, and public-safety status are separate. None overrides another.

## Private evidence to public finding

Private evidence may inform public Harness design, but raw private evidence does not become public provenance.

```text
private evidence
-> private analysis
-> minimize / generalize / anonymize
-> public-safe reusable finding
-> normal public candidate lifecycle
```

A public finding contains only what is needed to understand, reproduce with public/synthetic inputs where practical, evaluate, and maintain the shared rule. Do not include private repository names, private Issue/PR/branch/task coordinates, automation IDs, customer/product identities, unpublished domain material, internal paths/URLs, private logs, raw prompts/transcripts, or unnecessary operational detail.

## Public Issues and reporting

A public Issue is durable public work evidence, not a private incident or escalation channel.

When a failure or decision depends on non-public evidence:

- persist only a safe generalized public work item when useful;
- keep sensitive evidence at the authorized private source;
- route details through the applicable private reporting path;
- stop public persistence if a safe abstraction is insufficient.

Material failures must still reach the accountable higher agent; the reporting handoff must not copy the protected evidence.

## Role responsibilities

### Worker

Classify every proposed public artifact before writing it. Prefer synthetic/minimized examples and one topic branch/PR.

### Independent Reviewer

Treat disclosure uncertainty, LFS/unavailable payloads, hidden generated artifacts, copied private provenance, or dependency on non-public evidence as material review failures.

### Supervisor

Route private findings into public work only after safe abstraction. Never use the public repository as a private control log.

### Governor

Do not adopt, merge, tag, or release a candidate whose public-safety status is unresolved.

## Accidental disclosure

1. Stop further copying and automation propagation.
2. Notify the applicable private maintainer/security/higher-authority channel without repeating the content publicly.
3. Rotate/revoke credentials immediately when relevant.
4. Remove or sanitize the current surface where appropriate.
5. Evaluate history, logs, artifacts, releases, caches, forks, and mirrors; deleting the latest file does not reverse disclosure.
6. Persist only a public-safe remediation summary when a public record is useful.

## Validation

Use layered validation:

- author/Worker self-check;
- producer-distinct review for material candidates;
- public secret/static/path checks;
- private local checks for confidential identifiers that must not be committed.

A scanner is defense in depth. A green scanner does not prove public safety.
