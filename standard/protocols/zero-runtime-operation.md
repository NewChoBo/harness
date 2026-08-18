# Zero-Runtime Operation

Resource ID: `protocol/zero-runtime-operation`

## Purpose

Run Harness semantics in a chat/session environment where a Harness-specific Engine, Node/npm, shell, filesystem, persistent workspace, deterministic validation, or enforced process timeout may be unavailable.

Zero-runtime operation is a first-class Harness mode. It is not permission to invent missing capabilities, weaken required gates, or report deterministic evidence that does not exist.

## Bootstrap contract

Before material work:

1. **Bind the authoritative source** — identify the Harness source/ref/snapshot actually available to the session. Prefer an exact immutable identity when available. A floating ref such as `main` must be freshly resolved before material mutation/review when the provider can resolve it.
2. **Verify source access** — distinguish a connected/readable source, an exact user-provided snapshot, and an unavailable source. Do not reconstruct unavailable current policy from model memory and call it authoritative.
3. **Load only the required resources** — start with `docs/north-star.md`, root `AGENTS.md`, `standard/catalog.yaml`, this protocol, the current role, and only the protocols/checklists needed for the routed stage. Load `protocol/execution-budget-resumability` when execution capacity can materially affect completion.
4. **Declare the session role** — for example Supervisor, Worker, Independent Reviewer, Researcher, or Adoption Authority. One session must not silently switch from material Producer into the Independent Reviewer for its own candidate.
5. **Declare observed capabilities and evidence limits** before claiming completion.

A session capability statement may be expressed textually or structurally. It should cover only relevant facts such as:

```text
source access: verified | provided-snapshot | unavailable
repository read/write: available | unavailable | unknown
external research: available | unavailable | unknown
deterministic execution/validation: available | unavailable | unknown
durable persistence: available | unavailable | unknown
fresh isolated review context: available | unavailable | unknown
clock: CLOCK_AVAILABLE | CLOCK_APPROXIMATE | CLOCK_UNAVAILABLE
execution budget/limit: known current value | unknown
hard-timeout enforcement: available | unavailable | unknown
budget source/currentness: user-configured | runtime-reported | observed | controller-configured | unknown
```

Provider or product names are not capability proof. A historical limit associated with a product/provider is not current evidence that the same limit applies to this session.

## Execution budget and bounded slices

When a chat/session may be long or externally bounded, use `protocol/execution-budget-resumability`.

- Re-resolve mutable runtime/session budget facts when they materially affect the run.
- Do not encode or infer shared constants such as `GPT = 50 minutes` from product identity.
- If a reliable budget exists, protect enough remaining capacity for required validation and a bounded Handoff Packet/checkpoint.
- Stop starting optional new material work when it is unlikely to reach a safe checkpoint without consuming those protected reserves.
- If the clock or limit is unavailable/approximate, choose smaller semantic slices and checkpoint more frequently instead of inventing elapsed/remaining minutes.
- A prompt-only chat can cooperate with a budget but cannot claim an enforced process kill unless the runtime/controller actually provides one.
- `SLICE_COMPLETE` is useful resumable progress, not `WORK_COMPLETE`.

A session ending because of budget pressure should preserve the exact current source/candidate/artifact, validation actually completed, validation still required, and next permitted slice/action. Budget exhaustion does not make skipped/incomplete validation PASS.

## Validation modes

Use the smallest truthful evidence mode required by the routed work.

### Semantic-only

The session reasons over the authoritative Harness resources and available candidate/evidence without claiming executable checks.

Semantic-only evidence is acceptable only when the governing acceptance/risk requirement permits it. If the work requires deterministic proof that the session cannot execute or obtain, return a precise validation block/handoff instead of PASS.

### Bridged evidence

A chat-only session may consume deterministic validation produced by another trusted execution environment only when the evidence identifies the exact current subject/candidate, is still current, and its provenance/limitations are known.

Evidence reuse does not transfer authority and does not satisfy Independent Reviewer isolation by itself.

### Deterministic available

If the chat environment actually provides a compatible deterministic execution capability, the session may use it and report what really ran. Tool availability still does not expand Harness authority.

## Chat-only material change flow

A zero-runtime material workflow may span multiple fresh chats and multiple bounded execution slices while preserving the canonical lifecycle:

```text
Producer chat / slice(s)
-> authorized goal + current source/state
-> bounded implementation/candidate production
-> truthful slice validation
-> Agent Self-Check
-> frozen CANDIDATE_READY + Handoff Packet

Fresh Reviewer chat / slice(s)
-> same authoritative Harness identity
-> original goal/scope + frozen candidate/base identity
-> actual available validation evidence + prior findings
-> independent PRE_ADOPTION_REVIEW
-> REVIEW_PASSED | CHANGES_REQUIRED | REVIEW_BLOCKED

Adoption Authority
-> verifies exact current candidate + fresh verdict + authority
-> ADOPT or reject/defer
```

For material work, a fresh Reviewer chat must not receive the Producer's private reasoning or an unbounded conversation dump. Provide only the original goal/acceptance, exact candidate/base/effective identity, actual candidate/diff/artifacts, validation evidence, prior findings, and decision-relevant handoff facts.

If a credible fresh/independent review context is unavailable where required, return `REVIEW_BLOCKED` rather than self-reviewing.

A Producer/Reviewer may use multiple slices when one session cannot safely finish the stage. The durable state must still make it clear whether only a slice is complete or the lifecycle stage itself is complete.

## Zero-runtime Handoff Packet

When durable provider state is unavailable, emit a compact packet for the user/connector/next session to persist. Do not claim persistence occurred unless it actually did.

Include only what is relevant:

```text
Harness source + exact identity/ref/snapshot
current role
current goal / accepted scope
current semantic slice; slice-complete vs work/stage-complete
material decisions already approved
current target/candidate + base/control identity
current lifecycle state
actual validation/evidence + explicit unavailable/incomplete checks
relevant clock/budget fact when it constrained the stop
prior review findings
blockers/dependencies
next permitted action/slice + next owner
one residual/systemic follow-up or NO_ACTION when material
```

Do not include private chain-of-thought, secrets, personal/sensitive data, or unnecessary conversation history.

## Migration / effect canary receipt integration

`protocol/execution-outcome-receipt` is the sole operational owner of outcome-receipt fields, truthfulness, subject/currentness, first-canary receipt requirements, no-noise behavior, and receipt trust boundaries.

This zero-runtime protocol does not define a second receipt field list or modify those semantics. It owns only the zero-runtime integration behavior needed when the required receipt must survive a chat/session boundary:

- if `protocol/execution-outcome-receipt` requires a durable receipt and durable persistence is available, persist the bounded receipt through the authorized provider/consumer-owned surface;
- if durable persistence is unavailable, do not claim the receipt obligation succeeded; emit the bounded receipt in the Handoff Packet and report `PERSISTENCE_UNAVAILABLE` / `HANDOFF_REQUIRED` as applicable;
- capability or persistence limitations remain execution facts and do not weaken the receipt protocol's exact-subject, currentness, validation, privacy, or trust requirements;
- zero-runtime handoff transfers evidence only and never transfers Harness, consumer, review, adoption, or publication authority.

## Source-access failure

If the session cannot access the authoritative current resources required for a material decision:

- do not silently substitute model memory;
- do not claim the current Harness was loaded;
- request/provide the smallest exact snapshot or connector access needed to continue;
- if the missing source affects review/adoption correctness, block that stage.

## Capability failure

Unavailable capability is an execution fact, not a semantic failure.

Use precise states such as:

- `VALIDATION_CAPABILITY_BLOCKED`
- `REVIEW_BLOCKED`
- `SOURCE_UNAVAILABLE`
- `PERSISTENCE_UNAVAILABLE`
- `HANDOFF_REQUIRED`

A budget-limited stop should normally use the existing handoff/validation states plus a precise reason rather than inventing a new lifecycle family. Do not claim a hard timeout occurred unless it was actually observed/enforced by the runtime/controller.

## Invariants

- zero-runtime does not mean zero-governance;
- chat convenience never collapses Producer, Reviewer, and Adoption Authority semantics;
- unavailable/skipped/incomplete validation is never PASS;
- model memory is not authoritative current repository state;
- tool/runtime capability is not Harness authority;
- provider-specific bootstrap text is a projection/example, not a second operational policy source;
- no giant prompt is required when authoritative resources are accessible: bootstrap should identify source, role, goal, current budget/capability facts when material, and current handoff, then load the required resources;
- protected validation/handoff capacity should not be consumed by optional new work merely because a session still appears active;
- `NO_ACTION` is valid when no material next step exists.

## Completion

A zero-runtime session is complete when its role-specific goal is satisfied or precisely blocked, or when a useful bounded slice is truthfully complete and handed off; its capability/budget/evidence claims are truthful; lifecycle state is unambiguous; and another fresh session can continue from the bounded Handoff Packet without the full prior conversation.

When `protocol/execution-outcome-receipt` requires durable receipt persistence for the run, zero-runtime completion of that evidence obligation additionally requires successful authorized persistence or an explicit `PERSISTENCE_UNAVAILABLE` / `HANDOFF_REQUIRED` handoff; this protocol does not redefine when that receipt is required or what it contains.
