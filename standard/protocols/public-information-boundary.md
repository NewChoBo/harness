# Public Information Boundary

Resource ID: `protocol/public-information-boundary`

This protocol governs persistence to the public Harness repository and any public collaboration or distribution surface derived from it.

## Core invariant

Assume anything written to a public repository can become immediately world-readable, indexed, cached, forked, quoted, mirrored, and effectively irreversible.

Public disclosure surfaces include source and documentation, commit messages, branch/tag names, Issues, Pull Requests, reviews/comments, workflow logs/artifacts, releases, examples, fixtures, generated outputs, package metadata, and published documentation/packages.

**If information is not clearly safe for public disclosure, do not write it to a public surface.**

## Bounded disclosure classes

Use only the distinction needed to decide whether public persistence is allowed:

- `PUBLIC_SAFE` — intentionally public/reusable information whose disclosure is acceptable.
- `NON_PUBLIC` — secrets, credentials, personal/sensitive data, private consumer/project/customer/domain information, private repository or operational coordinates, private evidence, internal control state, or other material not intended for public disclosure.
- `UNKNOWN` — disclosure safety cannot be established from current evidence.

`UNKNOWN` is fail-closed and is treated like `NON_PUBLIC` for persistence.

This is a write gate, not a general-purpose classification language. Do not store real private-name denylists, confidential inventories, or private provenance in the public Harness merely to enforce this rule. Private environments may apply additional local checks that never become public artifacts.

## Public write gate

Before any public mutation:

```text
candidate information
-> establish disclosure class
-> PUBLIC_SAFE ?
   yes -> continue the normal authority/review lifecycle
   no/unknown -> do not persist
                 minimize/generalize or route privately
```

Repository write capability, role authority, or review status does not waive this gate.

## Private evidence to public finding

Private evidence may inform public Harness development, but raw private evidence does not become public provenance merely because it influenced a reusable finding.

Preferred flow:

```text
private evidence
-> private analysis
-> minimize / generalize / anonymize
-> public-safe reusable finding
-> normal public candidate lifecycle
```

A public finding contains only what is necessary to understand and review the reusable rule. Do not copy private repository names, private Issue/PR/branch coordinates, private automation IDs, customer/product identities, unpublished private-domain material, internal paths/URLs, raw private logs, prompts, transcripts, or unnecessary operational details.

## Public collaboration surfaces

A public Issue, PR, review, comment, workflow log, or artifact is not a private escalation channel.

When a blocker or decision depends on non-public evidence:

- keep sensitive evidence at its authorized private source;
- create only a public-safe generalized work item when one is useful;
- route sensitive details through the applicable private organizational/reporting path;
- if a safe abstraction is insufficient to act, stop public persistence and escalate privately.

## Role responsibilities

### Worker / Producer

Classify proposed public content before mutation and prefer synthetic/minimized examples when private inputs are unnecessary.

### Independent Reviewer

Treat public-boundary leakage or unresolved disclosure safety as a material review failure. Review public metadata and collaboration surfaces as well as source files.

### Supervisor

Route private findings into public work only after safe abstraction. Do not copy private coordination state into public Issues for visibility.

### Governor / Adopter

Do not adopt a candidate whose public-safety classification is unresolved. Adoption authority cannot override `NON_PUBLIC` or `UNKNOWN` persistence status.

## Accidental disclosure

If potentially non-public information is written to a public surface:

1. stop further copying or automated propagation;
2. notify the applicable maintainer/security/higher-authority channel without repeating the sensitive material publicly;
3. rotate/revoke credentials immediately when credentials may have been exposed;
4. sanitize the current public surface where appropriate;
5. evaluate history, logs, artifacts, caches, mirrors, and release/package output rather than assuming latest-tree deletion reverses disclosure;
6. leave only a public-safe remediation summary when a public record is useful.

## Validation

Public-boundary validation is layered: author/Worker self-check, producer-distinct Independent Review for material candidates, ordinary public structural/secret checks, and optional private checks for confidential identifiers that must never be committed publicly.

Passing an automated scanner does not prove information is `PUBLIC_SAFE`.
