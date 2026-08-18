# Zero-Runtime Session Check

Resource ID: `checklist/zero-runtime-session`

Before a zero-runtime chat/session reports a material stage or bounded slice complete, verify:

- **Authoritative source** — the session can name the Harness source/ref/snapshot it actually used; unavailable current policy was not reconstructed from memory.
- **Role** — the session's logical role is explicit and has not silently changed to bypass Producer/Reviewer/Adoption separation.
- **Capabilities** — relevant repository/tool/research/deterministic-validation/persistence/isolation capabilities are stated from observation or explicit provider facts, not guessed from product name.
- **Execution budget truthfulness** — when execution capacity matters, relevant `clock`, current budget/limit source, and hard-timeout enforcement capability are observed/declared without provider-name assumptions or stale constants.
- **Bounded slice** — long work has a useful semantic slice boundary; `SLICE_COMPLETE` is not reported as `WORK_COMPLETE`.
- **Validation/handoff reserve** — optional material work did not knowingly consume capacity required for mandatory validation or a bounded handoff. If reliable remaining time is unavailable, the session used smaller slices/checkpoints rather than fabricated minutes.
- **Overlay authority** — if profile/project/task/lane/runtime overlays are effective, precedence was used only within already-delegated scope; a later overlay did not widen authority or override repository/project/profile reserved constraints. Cross-boundary requests are blocked/escalated rather than silently winning by precedence.
- **Validation truthfulness** — semantic-only, bridged, or deterministic evidence is described accurately; unavailable/skipped/incomplete checks are not PASS.
- **Candidate identity** — material candidate/base/effective identities are recorded as precisely as the provider/source permits.
- **Fresh review** — material Producer output is routed to a distinct/fresh Reviewer context when required; private reasoning/context dump is not used as review input.
- **Persistence truthfulness** — a Handoff Packet is emitted when durable state is unavailable; the session does not claim it persisted data it could not persist.
- **Budget-limited handoff** — if the run stops because remaining execution capacity is insufficient, the checkpoint identifies the completed slice, incomplete work, validation done/still required, relevant budget capability fact, and next permitted slice/action.
- **Canonical outcome receipt** — when recovery/effect/audit or a selected canary requires a bounded run receipt, use `protocol/execution-outcome-receipt` as the canonical field/truthfulness contract rather than inventing a provider-specific receipt shape. Exact target/control/effective-Harness identity, applicable profile/pass evidence, validation, terminal state/stop reason, residual work, and limit-exit routing are recorded only to the degree actually known.
- **Unavailable evidence** — zero-runtime limitations remain explicit: missing clock/target/ceiling/pass/validation evidence is represented as unavailable/unknown under the receipt protocol, never converted to zero/false/PASS or reconstructed from provider identity.
- **Effect-canary proof** — when this is the first selected migration/effect canary run that requires durable proof, one bounded `ExecutionOutcomeReceipt` is persisted even if the ordinary terminal result is `NO_ACTION`; its existence is self-reported evidence/provenance, not independent proof that the named Harness was loaded or that reconstruction/judgment was correct.
- **Effect subject/currentness** — before a canary receipt is counted as evidence for a named adopted change, the consumed Harness identity is verified to contain the relevant evaluated semantics. A pre-change/non-containing subject is recorded as mismatched/not-applicable, not as positive or negative effect evidence based on run time alone.
- **No-noise receipt policy** — after the first required bounded receipt exists, unchanged later `NO_ACTION` runs do not create repetitive receipts; material source/composition/blocker/effect deltas or an explicit bounded sampling requirement may justify another receipt.
- **Limit-exit distinction** — `LIMIT_REACHED_RESUMABLE` is used only when the current approach still makes material progress and the next bounded slice is known; repeated/non-converging evidence uses `LIMIT_REACHED_DIAGNOSIS_REQUIRED` and routes through the normal root-cause/ownership process before identical retry.
- **Evidence is not authority** — outcome/canary/bridged receipts do not transfer Harness, consumer, reviewer, adoption, publication, or tool authority.
- **Privacy** — handoff/evidence excludes private chain-of-thought, secrets, personal/sensitive data, consumer-private operational evidence, raw prompts/transcripts, and unnecessary conversation history.
- **Lifecycle** — `CANDIDATE_READY`, `REVIEW_PASSED`, `ADOPTED`, blocked states, `SLICE_COMPLETE`, `WORK_COMPLETE`, and `NO_ACTION` are not conflated with execution-control stop reasons.
- **Resume test** — another fresh session could identify the current goal, source/candidate state, completed slice, actual evidence, blocker, and next permitted action without the full transcript.

This checklist supplements role-specific self-check/review checklists; it does not replace them.
