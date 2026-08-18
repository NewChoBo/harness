# Execution Budget and Resumability

Resource ID: `protocol/execution-budget-resumability`

## Purpose

Keep long-running work safe and resumable when a chat, agent, scheduler, provider, plan, product mode, or runtime has a bounded or uncertain execution window.

The Harness does **not** assume that a provider/product name proves a fixed time limit. Runtime limits can differ by configuration and can change over time. Budget facts are runtime/session evidence and must be resolved from the current execution context when they materially affect work.

This protocol is provider-neutral and zero-runtime compatible. It defines execution semantics, not a scheduler or optimization language.

## Core invariants

- `SLICE_COMPLETE` is not `WORK_COMPLETE`.
- A time or resource limit that is unknown must not be invented.
- A prompt-only/chat agent may cooperatively stop before a budget boundary, but must not claim it can enforce a hard process kill unless the runtime/controller actually provides that capability.
- Validation and handoff capacity are protected resources, not optional leftovers.
- Budget exhaustion never converts unvalidated work into PASS.
- A bounded slice should end at a semantic checkpoint that another run can restore without the full transcript.
- Provider/product identity is not capability proof.
- Budget configuration never expands authority.

## Budget evidence

Resolve only the dimensions relevant to the run. A textual or structured statement may include concepts such as:

```text
budget source: user-configured | runtime-reported | observed | controller-configured | unknown
clock: CLOCK_AVAILABLE | CLOCK_APPROXIMATE | CLOCK_UNAVAILABLE
wall-clock limit: known value | unknown
hard-timeout enforcement: available | unavailable | unknown
budget observed/resolved at: timestamp or session boundary when available
```

If the limit comes from a mutable service/runtime policy or floating profile, re-resolve it before material work instead of treating an old value as permanent policy.

A stale runtime limit is evidence drift. Do not keep `GPT = 50m`, `Provider X = 30m`, or equivalent provider-duration constants in shared Harness semantics.

## Bounded work slices

Before a long material action, choose one **semantic slice** that can be validated and handed off independently enough to be useful.

Examples of slice boundaries include:

- one decision-ready research question;
- one code change with its focused validation;
- one document section or migration unit;
- one fiction episode/revision unit;
- one translation unit or translation-review unit;
- one exact-candidate review.

Do not split solely by arbitrary file count, token count, or elapsed-minute count when a more meaningful semantic boundary is available.

If the clock/budget is unavailable or unreliable, prefer smaller semantic slices and checkpoint after each rather than pretending to know remaining minutes.

## Stage allocation

A runtime/profile/task may allocate budget among stages such as:

```text
RESTORE / OBSERVE
DISCOVER / PLAN
PRODUCE
VALIDATE
REVIEW PREP
CHECKPOINT / HANDOFF
```

Stage allocations are **soft planning targets**, not universal fixed quotas.

Useful concepts are:

- `target budget` — preferred effort for the stage;
- `soft ceiling` — point at which the agent should re-evaluate whether further effort is justified;
- `protected reserve` — budget that earlier stages should not consume because later validation/handoff still needs it.

Unused non-reserved budget may move to another stage when useful. A stage may exceed its target when the remaining total budget still protects all required later reserves and the overrun materially improves the outcome.

Do not encode a general-purpose optimization formula, arbitrary expression language, or executable scheduling DSL in declarative Harness resources.

## Budget-aware control

When reliable remaining budget is observable:

1. reserve enough capacity for required validation and a bounded checkpoint/handoff;
2. do not start new material work that is unlikely to reach a safe checkpoint without consuming those reserves;
3. if a current slice can be safely completed inside the remaining non-reserved budget, finish and validate it;
4. otherwise stop at the nearest truthful safe checkpoint, record partial state, and hand off;
5. if required validation cannot finish, report it as incomplete/blocked rather than PASS.

When reliable remaining budget is **not** observable:

1. choose smaller slices;
2. checkpoint after meaningful milestones;
3. avoid large speculative branches of work late in the session;
4. preserve exact source/candidate/evidence identities frequently enough that an abrupt stop does not require transcript reconstruction.

## Cooperative vs hard timeout

### Cooperative budget

The agent/runtime can observe or receive a budget and intentionally stop material work before the boundary.

This is the normal zero-runtime/chat case. It improves safety but does not guarantee a process cannot be terminated earlier by the platform.

### Enforced hard timeout

A controller/runtime actually enforces a process/session deadline.

Only the controller/runtime may claim this guarantee. Shared Harness policy may consume the fact but does not create the enforcement capability.

## Checkpoint on exhaustion or planned stop

A budget-limited stop should preserve only the relevant subset of:

- trusted source/control identity;
- work item and current semantic slice;
- what was completed in the slice;
- what remains incomplete;
- exact candidate/artifact identity when applicable;
- validation actually performed;
- validation still required/unavailable;
- budget/clock evidence relevant to the stop;
- blocker/dependency;
- next permitted slice/action and owner.

Do not persist private chain-of-thought, raw transcript, secrets, or unnecessary consumer-private content to improve resumability.

Useful terminal or handoff classifications include existing states such as `HANDOFF_REQUIRED`, `VALIDATION_BLOCKED`, `VALIDATION_INCOMPLETE`, and a precise budget-exhaustion reason when needed. Do not proliferate lifecycle states solely for accounting.

## Resume

A resumed run must:

1. re-resolve the authoritative source/control identity;
2. re-resolve mutable runtime budget/capability facts;
3. verify the checkpoint/candidate is still current;
4. restore only the bounded work state needed for the next slice;
5. continue from the next permitted action instead of replaying completed work;
6. invalidate stale validation/review evidence when candidate/base/effective semantics drifted.

## Work-type profiles

Different work types may choose different stage emphasis. Research may spend more budget on discovery; implementation on production/validation; translation on semantic mapping/realization/QA; review on inspection/verdict.

These are profile/task decisions, not shared universal percentages. A runtime/profile may supply defaults, but shared Harness semantics require only that the allocation is truthful, bounded, revisable, and preserves required validation/handoff capacity.

## Future resource dimensions

Time is the primary v0.x budget dimension. The same conceptual model may later cover other bounded resources such as tool calls, tokens, compute, or monetary cost **only when a real runtime exposes those constraints and a concrete use case justifies it**.

Do not pre-build a generic resource optimizer or accounting framework.

## Completion

A budget-aware run is successful when either:

- the work is actually complete and validated under the governing lifecycle; or
- a useful bounded slice is complete, the remaining work is explicitly incomplete, validation truth is preserved, and another run can resume from a compact checkpoint.

Running out of execution budget is not itself a work failure. Losing state, fabricating completion, consuming validation/handoff reserve without justification, or requiring the full prior transcript to resume are failures of this protocol.
