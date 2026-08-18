# Decision 0014 — Repository-owned automation and trusted-ref safety

## Context

During the clean public-repository cutover, an existing scheduled Worker retained an obsolete repository-owned binding path. Because repository and branch names were reused while the source layout changed, the missing old binding was misinterpreted as state to restore and was recreated directly on the public `main` branch. A later remediation removed it.

The incident showed that scheduler prompts, conversational memory, old repository generations, and archives must never be treated as fallback policy sources, and that ordinary automation must not have a direct source-edit path to the trusted integration ref.

## Decision

- physical Scheduled Tasks remain thin runtime pointers;
- canonical automation behavior lives in current repository Standard/resources plus a public-safe repository-owned binding;
- missing or unverifiable control source fails closed and is never reconstructed from memory/archive/old prompts;
- repository replacement or source-layout cutover requires fresh compatibility resolution rather than automatic restoration of removed paths;
- Worker source mutation uses a candidate/topic branch and PR;
- Supervisor and Independent Reviewer do not directly modify trusted-ref source;
- Governor integrates only the exact reviewed candidate through the repository integration mechanism;
- material failures remain visible to the organizational/control owner even when bounded self-recovery is attempted;
- a durable Issue is evidence, not a substitute for upward reporting;
- task population/cadence is not self-modified by ordinary role runs.

The canonical operational semantics are `protocol/automation-operation`.

## Consequences

A stale automation can fail closed instead of mutating a newly replaced repository. Recovery becomes explicit and reviewable, and `main` mutations preserve the Worker -> Independent Review -> Governor integration lifecycle.
