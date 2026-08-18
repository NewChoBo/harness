# Decision 0007 — Execution budgets are runtime evidence and work is resumable by bounded semantic slices

- Status: Proposed candidate pending independent review/adoption
- Date: 2026-08-16
- Owner: #32

## Context

Chat/agent runtimes may impose execution windows that differ by service, plan, product mode, controller, or later policy change. Long work can be interrupted before validation or handoff. Hard-coding values such as `GPT = 50m` into shared policy would confuse product identity with current capability and become stale when provider policy changes.

A second risk is over-correcting with rigid per-stage quotas. Fixed minute allocations can waste unused capacity, starve validation, or turn the Harness into a scheduling DSL rather than an execution-governance layer.

## Decision

1. **Budget facts are runtime/session evidence.** Provider/product names do not prove a duration or timeout capability.
2. **Mutable limits are re-resolved when material.** Floating provider/runtime limits are not treated as permanent shared policy.
3. **Bounded semantic slices are first-class.** Long work is decomposed into independently useful units that can be validated and handed off.
4. **Stage budgets are soft.** Runtime/profile/task layers may use target budgets and soft ceilings while protecting later-stage validation/handoff reserves.
5. **Validation/handoff reserve is protected.** Earlier work should stop starting material actions when doing so would consume capacity required for truthful validation/checkpointing.
6. **Unknown clock means smaller slices, not invented minutes.** `CLOCK_UNAVAILABLE` or approximate clocks trigger conservative checkpointing.
7. **Cooperative timeout and enforced timeout are distinct.** Prompt-only behavior can voluntarily stop but cannot claim a hard process kill without controller/runtime enforcement.
8. **Budget exhaustion is resumable partial progress, not automatic failure or completion.** `SLICE_COMPLETE != WORK_COMPLETE`.
9. **v0.x stays declarative/provider-neutral.** No optimization solver, arbitrary expressions, executable scheduling rules, or provider-duration table is added to shared resources.
10. **Time is the first bounded resource dimension.** Other dimensions may reuse the model later only when concrete runtime constraints and use cases justify them.

## Consequences

### Benefits

- long chat/session work can preserve validation and handoff rather than failing abruptly;
- provider policy changes do not require editing shared Harness semantics;
- different work types can allocate effort differently without duplicating the lifecycle;
- fresh sessions can resume from bounded state rather than transcript reconstruction;
- translation, research, implementation, and review can share one resumability model.

### Drawbacks / risks

- budget bookkeeping adds cognitive/operational overhead;
- overly small slices can create checkpoint churn and reduce productive depth;
- inaccurate clocks/limits can still cause earlier-than-expected interruption;
- soft allocation can be inconsistently applied across runtimes without good profiles;
- resource-budget concepts can grow into unnecessary framework complexity if generalized prematurely.

### Mitigations

- require budget handling only when material to the work;
- prefer semantic boundaries over arbitrary file/time slicing;
- treat stage allocations as advisory and re-plannable;
- preserve a small set of capability states rather than provider-specific rules;
- expand beyond time only after observed demand/effect evidence.

## Alternatives considered

### Hard-code provider limits

Rejected. Simple, but stale and not portable; provider identity is not capability proof.

### Fixed percentage/minute template for every workflow

Rejected as shared policy. Useful as a runtime/profile default, but too rigid for research, implementation, fiction, translation, and review workloads.

### No budget semantics; rely only on ordinary handoff

Rejected. Handoff remains useful but does not reserve enough time to produce one before the runtime terminates.

### Build a general resource scheduler/optimizer now

Rejected. Premature complexity and anti-DSL risk.

## Validation / falsifier

The decision is supported if zero-runtime/general-chat canaries can stop at useful bounded slices, preserve required validation/handoff capacity, and resume without the full transcript while avoiding significant checkpoint/noise overhead.

Narrow or supersede the model if it materially increases bookkeeping/noise, repeatedly interrupts useful work too early, or fails to improve resumability under real runtime limits.

## Operational mapping

The canonical operational semantics are mapped to:

- `standard/protocols/execution-budget-resumability.md`;
- budget-aware additions in `standard/protocols/control-cycle.md`;
- budget-aware checkpoint semantics in `standard/protocols/checkpoint-handoff.md`;
- zero-runtime capability handling in `standard/protocols/zero-runtime-operation.md` and `standard/checklists/zero-runtime-session.md`.
