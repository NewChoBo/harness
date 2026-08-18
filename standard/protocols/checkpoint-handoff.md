# Checkpoint and Handoff

Resource ID: `protocol/checkpoint-handoff`

## Purpose

Preserve enough durable state for another agent or later run to continue without relying on conversational memory, while minimizing sensitive/private persistence. A checkpoint may represent a whole work item or one bounded semantic slice; those states must not be conflated.

`protocol/execution-outcome-receipt` owns the shared semantic fields and truthfulness rules for compact material run-outcome receipts. This protocol owns **when/how that outcome is persisted or handed off resumably**. Do not maintain a second competing receipt field definition here.

## Material checkpoint fields

Use only what is relevant:

- trusted control/base identity;
- current goal and owner;
- current semantic slice and whether only the slice or the whole work item is complete;
- candidate/review/adoption/effect state;
- exact candidate/provenance identity when applicable;
- validation/review evidence actually produced;
- required validation still incomplete/unavailable;
- blockers and dependencies;
- relevant execution budget/clock evidence when it caused or constrained the stop;
- next action or next slice and next owner;
- unresolved upward decision, if any;
- exact `ExecutionOutcomeReceipt` identity/reference when the governing workflow/effect owner requires one.

## Execution outcome receipt integration

When `protocol/execution-outcome-receipt` applies, build the receipt from the exact final run state **before durable persistence** and preserve only the applicable bounded fields defined by that protocol.

The checkpoint/handoff must not reinterpret or improve the receipt after the fact. In particular:

- unavailable clock/pass/validation evidence remains unavailable/unknown rather than being converted to zero/false/PASS;
- terminal state and stop reason remain distinct;
- `SLICE_COMPLETE` remains distinct from `WORK_COMPLETE`;
- normal resumable limit exit remains distinct from diagnosis-required non-convergence;
- a blocker fingerprint does not itself create Issue/escalation authority;
- a self-authored receipt remains bounded evidence/provenance, not independent proof of every claim.

For a selected first migration/effect canary, one durable outcome receipt may be required even when the ordinary terminal state is `NO_ACTION`. The exact receipt semantics are owned by `protocol/execution-outcome-receipt`; this protocol only ensures that the required receipt is durably persisted or explicitly handed off as unresolved persistence work.

## Budget-limited checkpoint

When `protocol/execution-budget-resumability` applies, checkpoint **before** optional material work consumes protected validation/handoff capacity.

A budget-limited checkpoint should make the following distinction explicit:

```text
completed slice: yes | no
whole work complete: yes | no
validation complete for the claimed state: yes | no | unavailable
remaining work: bounded next slice/action
```

If a runtime ends before required validation completes, persist the candidate/partial artifact identity and mark validation incomplete/blocked. Do not upgrade the state to PASS merely because the execution window ended.

When reliable time/clock data is unavailable, do not fabricate elapsed/remaining minutes. Record only the observed capability limitation and the semantic checkpoint reached.

When an outcome receipt is required for the same stop, use `CLOCK_UNAVAILABLE` / `unknown` semantics from `protocol/execution-outcome-receipt` rather than inventing negative or zero values.

## Handoff rules

- hand off facts/evidence and selected decisions, not private chain-of-thought;
- do not copy consumer/project-specific confidential knowledge, personal/sensitive data, credentials/secrets, private identifiers, raw prompts/transcripts, or private operational evidence into shared/public checkpoints;
- when sensitive evidence is relevant, record only the generalized non-sensitive finding and a safe reference to the private owner when appropriate;
- distinguish completed work from planned work and `SLICE_COMPLETE` from `WORK_COMPLETE`;
- distinguish unavailable/skipped/incomplete validation from PASS;
- never call a candidate adopted before adoption/integration is verified;
- an outcome/canary receipt transfers evidence only, never authority or reviewer independence;
- do not credit a receipt to a named adopted change when the exact consumed Harness subject is pre-change, non-containing, stale, or otherwise not applicable; wall-clock ordering alone is not subject/currentness proof;
- avoid repetitive no-change comments when durable state is unchanged, except that the first successful selected migration/effect canary must persist its one bounded outcome receipt when required by the effect owner.

## Outcome receipt idempotency

The first required durable receipt is bounded self-reported evidence/provenance. Durability establishes that the bounded assertion was persisted; it does not independently verify that the named Harness was actually loaded, that reconstruction was correct, or that semantic judgment/validation was independently trustworthy.

When a later review/effect decision requires stronger assurance for a receipt field, require independent or tool/provider-verifiable corroboration appropriate to that fact.

After the first required receipt exists, unchanged later `NO_ACTION` runs should remain silent. Persist another receipt only when:

- a material target/control/effective-Harness composition changes;
- a material validation/blocker/limit-exit/routing state changes;
- a governing effect evaluation requests another bounded comparable sample;
- recovery/handoff would otherwise lose material state.

If durable persistence is unavailable, emit the same bounded receipt fields in the Handoff Packet and mark the persistence/effect-evidence obligation unresolved. Do not claim the durable receipt exists until an owned persistence surface actually contains it.

## Idempotency

Before creating new work, search existing owners/candidates. Continue or supersede the existing item when it owns the same concern. `NO_ACTION` is valid when there is no meaningful delta.

A resumed bounded slice must not repeat already completed work solely because the previous run ended. Re-validate freshness/currentness first, restore the prior outcome/checkpoint when material, then continue from the recorded next permitted action.

## Completion

A handoff is sufficient when the next owner can identify the exact current state, the completed slice vs remaining work, non-sensitive evidence, validation truth, blocker/dependency, and next permitted action without reconstructing the prior conversation or exposing private consumer content.

When an outcome receipt is required, completion as recovery/effect evidence additionally requires either:

- the durable exact-subject receipt defined by `protocol/execution-outcome-receipt`; or
- an explicit unresolved persistence handoff containing the same bounded truth without claiming durability that did not occur.