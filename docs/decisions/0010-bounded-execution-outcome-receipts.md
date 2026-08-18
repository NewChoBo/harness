# Decision 0010 — Bounded execution outcome receipts

Status: proposed candidate; operational semantics are not adopted until the candidate passes PRE_ADOPTION_REVIEW and the appropriate adoption authority integrates it.

## Context

Agent Harness already defines:

- provider-neutral execution-budget/resumability semantics;
- adaptive effort, finite iteration, convergence, and unresolved-at-limit diagnosis;
- checkpoint/handoff and first-canary evidence obligations;
- post-adoption effect evaluation.

However, live consumer canaries demonstrated a state-model gap: a scheduled execution timestamp or completion summary does not prove which exact Harness/effective composition was consumed, whether the authoritative source was actually accessible, how many bounded passes occurred, why work stopped, what validation actually completed, or whether a limit exit was a normal resumable slice versus diagnostic non-convergence.

Without a compact run outcome contract, later effect evaluation can confuse missing evidence with zero, credit a run to a change it did not contain, reconstruct execution from conversation memory, or generate noisy per-run prose merely to preserve enough state.

## Decision

Adopt a provider-neutral `ExecutionOutcomeReceipt` semantic contract for material runs that need durable recovery/effect/audit evidence.

The bounded receipt may identify, when applicable:

- execution/work-item/target/control/binding/effective-Harness/effective-composition identity;
- authoritative source-access state and material capability limitations;
- evaluated change identity plus subject/currentness result for effect use;
- logical role/workflow/stage and selected execution profile;
- truthful clock/budget target/ceiling observation;
- iteration mode plus completed/target/max passes;
- actual validation state and evidence references;
- governing terminal state;
- a small bounded execution-control stop reason;
- residual material work;
- normal resumable versus diagnosis-required limit exit;
- stable blocker fingerprint and actual routed owner;
- exact evidence/provenance references.

The receipt is a semantic evidence envelope, not a frozen YAML representation or machine contract version. A later structured contract may implement and version the same semantics independently under the Harness contract/versioning model.

## Persistence decision

Do not persist a receipt for every ordinary run.

Require durable outcome evidence only when it materially supports:

- recovery/handoff;
- candidate/review/adoption state;
- blocker/limit-exit routing;
- effect evaluation;
- the first selected canary proof obligation after a material Harness change.

After the first required canary receipt exists, unchanged `NO_ACTION` runs remain noise-free unless a material state/effect delta or explicit bounded sampling need occurs.

The persistence adapter/store is not part of this decision.

## Source/currentness decision

A receipt intended for effect evidence must be able to distinguish:

```text
MATCHED
MISMATCHED
UNKNOWN
```

for the evaluated change against the exact consumed subject/composition.

A run that happened after adoption time is not automatically evidence for the adopted change. Pre-change, non-containing, stale, or otherwise inapplicable subjects are `MISMATCHED`; insufficient provenance remains `UNKNOWN`.

Likewise, naming a source in a prompt/binding is not proof that the execution actually accessed it. Source-access state remains separately recorded as readable, unavailable, or unknown according to actual evidence.

## Missing-evidence semantics

Unavailable evidence is never converted into a favorable value.

In particular:

- unavailable clock evidence is `CLOCK_UNAVAILABLE`, not an invented duration;
- unknown target/ceiling observation is `unknown`, not `false` merely because no timestamp exists;
- unavailable historical pass counts are unavailable/omitted, not zero;
- skipped/cancelled/unavailable validation is not PASS;
- unknown source/currentness is not silently treated as matched;
- a receipt's existence is not proof that every self-reported field is independently verified.

## Limit-exit decision

Preserve the adopted distinction from adaptive effort/convergence:

```text
LIMIT_REACHED_RESUMABLE
```

means the current approach still makes material progress and another known bounded semantic slice can resume without replaying failed work.

```text
LIMIT_REACHED_DIAGNOSIS_REQUIRED
```

means repeated/non-converging evidence requires bounded root-cause diagnosis before another identical attempt.

The receipt records this decision. It does not create a new timeout taxonomy or authorize an Issue/escalation by itself.

## Trust and authority

An `ExecutionOutcomeReceipt` transfers evidence/provenance only.

It does not grant:

- repository/tool capability;
- Worker/Reviewer/Adoption authority;
- independent-review status;
- publication permission;
- effect classification.

A self-authored receipt may require independent/tool/provider-verifiable corroboration before downstream decisions rely on the asserted fact.

## Privacy decision

Receipts are intentionally compact. Do not persist raw prompts/transcripts, private chain-of-thought, credentials/secrets, high-cardinality debug traces, or unnecessary consumer-private content.

When detailed private evidence supports a shared/public claim, preserve the detailed evidence in its private owner and expose only the generalized safe finding and minimum non-sensitive provenance needed for review/effect evaluation.

This makes the receipt contract usable by a public Harness distribution without requiring public consumers to access private canary/evidence stores.

## Alternatives considered

### Use Scheduled Task completion timestamps as effect evidence

Rejected. A timestamp proves only that an execution surface recorded a run, not which exact semantic subject/configuration was consumed or what bounded outcome occurred.

### Persist a verbose per-run Markdown report

Rejected as the default. It creates repository/comment noise, makes comparison harder, and increases privacy leakage risk.

### Build a full telemetry/event platform first

Rejected. Current need is a small exact-subject outcome envelope. Metrics backends, exporters, querying, dashboards, OpenTelemetry integration, or PKI/signing should be added only if real effect/trust requirements justify them.

### Wait for the Engine before defining receipt semantics

Rejected. Zero-runtime consumers already need the semantic contract and can persist a bounded textual/structured projection without a Harness-specific runtime.

## Consequences

### Benefits

- makes bounded execution/effect evidence comparable across zero-runtime and Engine-assisted providers;
- separates unavailable evidence from zero/success;
- prevents timestamp-only or stale-subject effect attribution;
- makes pass/stop/limit behavior observable without transcript persistence;
- supports deduplicated blocker routing and resumable handoff;
- creates a stable semantic target for future runtime/effect Engine/adapter implementation;
- enables first-canary proof without requiring noisy receipts on every later `NO_ACTION` run;
- supports a clean public/private evidence boundary for future distribution.

### Costs / risks

- adds another shared protocol and evidence concept;
- poor implementations may treat self-reported fields as independently trusted facts;
- excessive receipt persistence could become telemetry/log bureaucracy;
- stop-reason vocabulary could grow into a parallel lifecycle/taxonomy;
- source/composition provenance fields add some bookkeeping when used indiscriminately.

### Mitigations

- receipt emission is material/selected-canary only;
- record only applicable provenance fields;
- terminal lifecycle state remains separately owned by the governing workflow;
- stop reasons remain a small bounded execution-control vocabulary;
- the protocol explicitly separates self-report from corroborated evidence;
- unknown/unavailable values remain truthful;
- future extensions/exporters implement rather than redefine the semantic contract.

## Operational mapping

If adopted, this decision's operational semantics are mapped to:

- `standard/protocols/execution-outcome-receipt.md` as the sole operational owner of receipt fields, truthfulness, subject/currentness, first-canary/no-noise semantics, and trust boundaries;
- receipt/persistence integration in `standard/protocols/control-cycle.md` and `standard/protocols/checkpoint-handoff.md`;
- zero-runtime persistence-fallback and handoff integration in `standard/protocols/zero-runtime-operation.md`;
- truthfulness verification in `standard/checklists/agent-self-check.md`, `standard/checklists/pre-adoption-review.md`, and `standard/checklists/zero-runtime-session.md`.

For mapped semantics, those canonical Standard resources control on conflict; this Decision remains rationale/history/provenance.

## Effect / falsifier

Do not classify this mechanism EFFECTIVE merely because a receipt can be emitted.

Canaries should demonstrate that it:

- makes exact Harness/source/binding/composition and bounded execution outcome recoverable;
- establishes whether the evaluated change was actually present before effect credit;
- distinguishes missing evidence from zero/success;
- supports later underwork/overwork/convergence effect evaluation;
- reduces ambiguous handoffs and blind identical retries;
- does not create repetitive repository/comment noise;
- does not materially increase user micromanagement or operational bookkeeping.

Narrow or supersede the contract if agents spend disproportionate effort filling receipt fields, duplicate evidence elsewhere, or treat self-reported receipts as authority/trust.
