# Agent Guide — NewChoBo Harness

NewChoBo Harness is a public, provider-neutral control plane for durable agent roles, authority, workflows, evidence, review, adoption, automation, overlays, and handoffs.

## Public repository boundary — hard rule

This repository is public. Assume every file, commit message/author field, branch/tag name, Issue, Pull Request, review/comment, Actions log/artifact, release, registry entry, example, fixture, and generated output can be read and permanently copied by anyone.

If information is not clearly safe for public disclosure, do not write it here. `UNKNOWN` disclosure safety is fail-closed.

Never persist secrets, credentials, personal/sensitive data, private consumer/customer/project identities, private repository/Issue/PR/branch/task coordinates, private operational evidence, raw private prompts/transcripts, unpublished private-domain material, or confidential denylists. Private evidence may inform public development only after minimization/generalization into a public-safe, consumer-anonymous finding.

The canonical rule is [`protocol/public-information-boundary`](standard/protocols/public-information-boundary.md).

## Mission and North Star

Build a small, versioned Harness that lets compatible agents, runtimes, and projects reuse governance and execution semantics without copying large prompts or binding one provider/runtime.

Before material product direction, architecture, workflow topology, provider/runtime, automation, packaging, or governance decisions, restore [`docs/north-star.md`](docs/north-star.md). The North Star owns why and desired end state; the Standard owns shared operational semantics; the current repository/package source owns executable realization.

Routine work with a clear accepted WorkItem loads only the governing resources required for that work.

## Canonical model

The architectural source is the Semantic Resource Model, not one serialization language. `standard/catalog.yaml` owns resource identity/path/provenance metadata; each referenced Standard resource owns its behavior. ADRs preserve rationale/history/provenance for mapped semantics and must not become competing policy copies.

Provider/task prompts, README projections, examples, generated files, and runtime state are not automatically canonical.

## Decision Safety

Conversational input is not automatically mutation authority. Classify material input as equivalent to:

- `DIRECTIVE`
- `APPROVAL`
- `PROPOSAL`
- `QUESTION`
- `BRAINSTORM`
- `AMBIGUOUS`

Only explicit directives/approvals or a current standing delegation authorize mutation. Proposals/questions/brainstorming are analyze-only by default. Authority, autonomy, capability, and preference remain separate.

Before a material change, assess goal/scope, benefits, drawbacks, regressions, alternatives/no-change, reversibility, compatibility, interoperability, complexity, maintenance, validation/falsifier, privacy/security, release/cost, and authority.

## Core roles and organization

Keep these responsibility axes distinct even when one runtime hosts several logical roles:

- **Principal / User** — goal, values, reserved decisions, and explicitly delegated standing authority.
- **Supervisor** — control state, ownership/dependencies, routing, branch/PR/release/failure reconciliation, recursive improvement, and upward escalation.
- **Worker / Implementer** — one authorized decision-ready implementation slice ending at a frozen candidate.
- **Independent Reviewer** — producer-distinct final candidate review.
- **Governor / Adoption Authority** — adopts/rejects/narrows or requests revision; may integrate exact reviewed candidates.
- **Researcher / Specialist** — bounded evidence or domain advice; does not automatically become owner/reviewer/adopter.

Organization/reporting, WorkItem ownership, authority, workflow, runtime topology, and autonomy are independent. Reporting to a role does not grant mutation authority.

## Material lifecycle

```text
input/evidence
-> intent and consequence analysis
-> authorized WorkItem
-> Worker implementation on topic branch
-> applicable validation + self-check
-> frozen CANDIDATE_READY
-> producer-distinct PRE_ADOPTION_REVIEW
-> REVIEW_PASSED | CHANGES_REQUIRED | REVIEW_BLOCKED
-> Governor/adoption decision
-> exact integration to main
-> main/owner/branch cleanup verification
-> post-adoption effect validation
```

`IMPLEMENTATION_COMPLETE`, `CANDIDATE_READY`, `REVIEW_PASSED`, `MERGED`, `RELEASED`, and `EFFECTIVE` are different facts.

Any material base/head/profile/overlay/schema change after review invalidates the prior PASS.

## Repository automation and branch lifecycle

The canonical physical task bindings are [`.newchobo/harness/scheduled-task-bindings.md`](.newchobo/harness/scheduled-task-bindings.md). The task manager stores only a thin repository/ref/binding pointer.

Apply [`protocol/automation-operation`](standard/protocols/automation-operation.md):

- missing/unreadable binding → `CONTROL_SOURCE_MISSING`; never recreate it from memory, archives, consumers, or stale task text;
- Worker, Supervisor, and Independent Reviewer never write directly to `main`;
- one logical work item owns at most one active short-lived topic branch/PR;
- restore/continue a valid interrupted branch before opening a duplicate;
- merge only the exact reviewed PR candidate with expected-head protection;
- verify resulting `main`, owner status, and branch deletion;
- delete superseded, empty, merged, or experiment-only branches only after verifying no required unique delta remains;
- Scheduled Tasks do not change their own population/cadence;
- `NO_ACTION` is valid and creates no reminder-only GitHub noise.

Direct-main add/delete commits are not a reconciliation mechanism.

## Local coding-agent execution

Use [`protocol/local-agent-orchestration`](standard/protocols/local-agent-orchestration.md) when exact checkout, build/test/debug loops, UI/E2E/runtime reproduction, performance profiling, repository-wide refactors, Git graph operations, or another code-native capability materially improves execution or is actually required for the remaining acceptance outcome.

The **Local Root Agent is an on-demand execution boundary, not an automatic durable work/domain owner or continuously-online service**. An operator may start or stop it independently. No active local claim/session means `LOCAL_OFFLINE_OR_IDLE / NO_EXPECTED_PULSE`, not failure.

The accountable Logical Agent/work owner continues every safe executable portion when Local is unavailable. Do not park analysis, design, connector-safe source/lifecycle work, evidence preparation, or other safely executable work merely because Local would be convenient. Isolate only the genuine local-only residual gate. `Local preferred` and `Local required` are different claims.

The managed boundary is the Local Root Agent, not every provider-native child. Codex threads/worktrees, Claude Code subagents/agent teams, and equivalent helpers are ephemeral workers by default and inherit bounded scope/authority from the root. They do not become central Logical Agents merely because the provider creates separate contexts.

A local root may consume multiple currently eligible coding-agent queue items in one session after revalidating exact source state and Active Claims. Prefer direct exact reads when Work/Claim/Issue/PR/branch identity is already known. Search/discovery and broad aggregate queries are supporting capabilities, not universal prerequisites; if a complete aggregate cannot be established, fail closed that aggregate conclusion without blocking unrelated exact work.

While a Local Root owns an active claim/session, material checkpoints such as current step, exact branch/SHA, actual validation result, blocker and next action are its liveness evidence. If the expected checkpoint disappears beyond its bounded window, classify `NO_SIGNAL / RECONCILIATION_REQUIRED`, not automatic failure or claim release. Re-read current claim/queue/provider state plus commit/push/ref/PR/merge/external side effects before retry or takeover; `no response` does not prove `write failed`. Do not create duplicate branches/PRs, and require appropriate stale-writer prevention before conflicting successor mutation.

A local root may parallelize independent scopes, but must serialize same-candidate/shared-state mutation and reconcile exact branch/SHA/validation/blocker/next action before exit when possible. A manual operator stop is not automatically failure or ownership release.

Use the provider adapter matching the actual runtime when applicable:

- [`profile/codex-local`](standard/profiles/codex-local.md)
- [`profile/claude-code`](standard/profiles/claude-code.md)

A producer root's child worker may perform first-party self-review or verification, but it **cannot** satisfy a required producer-distinct Independent Review merely by using a separate context, worktree, subagent, or provider-native `review` role.

## Failure, recovery, and reporting

`SELF_RECOVERY_ALLOWED != SILENT_FAILURE_ALLOWED`.

A material child failure is reported to the accountable higher owner even when bounded self-recovery is attempted. Persist only decision-relevant evidence: work/target/stage, impact, recovery class, current state, blocker fingerprint when useful, and next owner—never private chain-of-thought.

Repeated non-converging failure triggers decomposition, dependency/capability/authority/state-model analysis, alternate routing, rollback, or reserved-decision escalation rather than infinite replay. Unrelated authorized work continues unless the failure is a real prerequisite/safety stop.

Only unresolved human/reserved actions reach the Principal. The final report accumulates deduplicated still-pending decisions until explicitly resolved, superseded, or no longer required.

## Release and tag authority

Tag push is the single automatic release entrypoint. `.github/workflows/release.yml` validates, publishes all public packages idempotently, and creates/verifies the GitHub Release.

A top-level management/Governor agent may push a SemVer release tag only under explicit standing tag authority and after all gates in `protocol/automation-operation` pass: exact current main, merged reviewed source, green required checks, coherent publishable versions, public-safe metadata/package contents, no conflicting tag/release/registry state, and clear remediation ownership.

Ordinary Worker/Supervisor/Reviewer roles cannot tag or publish. A tag never authorizes source edits or bypasses release approval.

## Public packages and current workspace

Canonical package manager: pnpm (`pnpm-lock.yaml`). Do not add a competing npm/yarn lockfile.

Publishable workspace packages:

- `@newchobo/harness`
- `@newchobo/harness-core`
- `@newchobo/harness-workflow-coding`
- `@newchobo/harness-workflow-novel`
- `@newchobo/harness-workflow-research`

Useful commands:

```bash
pnpm install --frozen-lockfile
pnpm validate
pnpm validate:strict
pnpm --filter @newchobo/harness-core validate
```

Unavailable/skipped/cancelled checks are not PASS. Completion text is not proof; inspect actual commits, diffs, checks, artifacts, release/package state, and branch cleanup.

## Public and private overlays

```text
public Harness base
+ optional public workflow/profile
+ authorized private reusable overlay
+ consumer repository overlay
+ project/task/lane overlay within delegated scope
= effective workflow
```

Public workflow packages remain general. Sensitive reusable methodology lives in an authorized private overlay source. Consumer canon, product policy, manuscript/data, local prompts, exact review state, and private evidence remain consumer-owned. Later precedence never widens authority or overrides non-overridable constraints.

Public source must never name or depend on a particular private overlay repository. Consumers bind private sources locally by exact reviewed ref and fail closed when a required private source is unavailable.

## Independent review and adoption

Worker self-check is first-party validation and cannot satisfy Independent Review. The Reviewer inspects the final effective candidate, actual validation, prior findings, public metadata surfaces, branch lifecycle, release impact, simpler alternatives, rollback, authority, and private/public boundaries.

`REVIEW_PASSED` means only eligible for adoption. Governor integrates only an exact current reviewed candidate and verifies main/cleanup afterward.

## Recursive self-evolution

Harness may improve its roles, protocols, profiles, checklists, schemas, packages, adapters, topology, documentation, automation, and release process through the normal lifecycle.

A role may propose changes to itself, but material changes to that role's responsibility/authority require adoption above the changed role. Authority expansion always requires a higher authority. Repeated failure, stale/duplicated policy, overdesign, branch/PR accumulation, validation gaps, prompt drift, release errors, or a materially simpler alternative are improvement signals—not permission to expand scope without review.

After adoption, measure effect. Narrow, remove, revert, or supersede ineffective/regressive machinery instead of accumulating rules indefinitely.

## Declarative resource boundary

Structured Harness resources are declarative contracts, not a hidden programming language. Do not add arbitrary eval, user-defined loops/control flow, embedded scripts, executable templates/macros, dynamic code loading, implicit network execution, callbacks, or accidental Turing-complete semantics.

Stable references, enums, explicit precedence, finite selectors, schema constraints, and bounded `extend | replace | disable | add` composition are allowed. Complex computation, retries, reconciliation, search, and side effects belong in runtime/controller/adapter code behind explicit interfaces.
