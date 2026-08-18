# GPT General-Chat Zero-Runtime Quickstart

This is a **provider-specific, non-canonical example** for using this public Harness template from an ordinary GPT-style chat without requiring the Harness Engine, Node/npm, shell, or a persistent coding workspace.

Shared operational behavior remains canonical under `standard/**`. If this example conflicts with a Standard resource, the Standard wins.

## 1. Make the authoritative Harness source available

Use one of these access paths:

- a connected repository source that can actually read the required private/public Harness files;
- an exact uploaded/vendored snapshot of the Harness resources;
- a minimal exact resource set supplied directly to the chat.

Do not give the chat only a repository name it cannot access and then assume it loaded the source.

For material work, prefer an exact commit/snapshot identity. If using a floating branch/ref, resolve it freshly when the environment can do so.

## 2. Producer chat bootstrap

A thin bootstrap can be:

```text
Use the public Harness template in zero-runtime mode.

Authoritative Harness source:
  <repository/ref/commit OR uploaded snapshot identity>

Role: Worker
Goal:
  <outcome-oriented goal>

Current handoff:
  <none OR compact prior Handoff Packet>

Load `protocol/zero-runtime-operation` from the authoritative Harness and then only the role/protocol/checklist resources it requires for this stage.
Before material action, state the source identity you actually loaded, your observed capabilities, and the validation evidence mode available to you.
Follow Decision Safety and the current accepted scope.
Stop at frozen CANDIDATE_READY; do not independently review or adopt your own material candidate.
Emit the bounded zero-runtime Handoff Packet for a fresh Reviewer chat.
```

The prompt is intentionally short. Common behavior is loaded from the Harness rather than copied into the prompt.

## 3. Reviewer chat bootstrap

Start a **fresh chat/context** for material PRE_ADOPTION_REVIEW.

Do not paste the Producer's private reasoning or the whole conversation. Supply the frozen handoff plus the actual candidate/artifact/diff and evidence needed for review.

```text
Use the public Harness template in zero-runtime mode.

Authoritative Harness source:
  <same exact repository/ref/commit OR snapshot identity>

Role: Independent Reviewer
Original goal / accepted scope:
  <goal and acceptance criteria>

Frozen candidate handoff:
  <Producer Handoff Packet>

Candidate/artifacts to inspect:
  <exact diff/files/text or accessible candidate reference>

Load `protocol/zero-runtime-operation`, the Independent Reviewer role, the adoption lifecycle, and the PRE_ADOPTION_REVIEW checklist from the authoritative Harness.
State the source identity and capabilities you actually have.
Independently inspect the candidate and evidence; do not rely only on the Producer summary.
Return exact-candidate REVIEW_PASSED, CHANGES_REQUIRED, or REVIEW_BLOCKED.
Do not modify, adopt, or integrate the candidate.
```

If the Reviewer cannot access the authoritative Harness or the actual candidate/evidence required for review, it should block rather than guess.

## 4. Adoption step

A user/Overmind/Governor with the required authority may consider a fresh `REVIEW_PASSED` for the unchanged exact candidate.

Keep these distinct:

```text
CANDIDATE_READY != REVIEW_PASSED != ADOPTED
ADOPT decision != mechanical integration
```

If the candidate changes after review, review again.

## 5. Handoff Packet example

A useful compact handoff looks like:

```text
Harness source: <public-harness-repo>@<exact-sha-or-snapshot>
Role completed: Worker
Goal: <goal>
Accepted scope/decisions: <bounded facts>
Candidate: <identity/reference>
Base/control: <identity when relevant>
State: CANDIDATE_READY
Validation/evidence:
- semantic checks: <what was actually checked>
- deterministic checks: unavailable | exact receipt/reference
Prior findings: <none or concise list>
Blockers/dependencies: <none or concise list>
Next owner/action: Fresh Independent Reviewer -> PRE_ADOPTION_REVIEW
Residual/systemic follow-up: NO_ACTION | <one routed follow-up>
```

Do not include private chain-of-thought or the entire transcript.

## 6. General-chat canary

Before resuming Engine-first development, prove at least one material but reversible workflow with this pattern:

1. Producer chat starts only from the thin bootstrap + authoritative Harness source + goal.
2. Producer records its actual capabilities and does not claim unavailable deterministic checks.
3. Producer emits a frozen candidate and Handoff Packet.
4. A separate fresh Reviewer chat loads the same exact Harness source and the bounded handoff/candidate.
5. Reviewer independently returns a verdict without receiving the Producer's private reasoning.
6. If revision is required, the Producer changes the candidate and a new fresh review is performed.
7. Adoption remains a separate authority decision.
8. A third fresh chat should be able to resume the next step from the final Handoff Packet without the earlier transcripts.

### Suggested reversible canary task

Use a small documentation/example improvement in a disposable branch or text-only candidate, rather than code requiring deterministic build/test proof. The canary should exercise Decision Safety, candidate freezing, review independence, handoff recovery, and `NO_ACTION`/improvement triage rather than testing shell tooling.

## 7. What this canary does not prove

A successful general-chat canary does not prove:

- npm/Engine correctness;
- repository write access;
- deterministic code validation;
- provider-specific persistence guarantees;
- automated cross-provider invocation.

Those remain separate capabilities. The point of this canary is to prove that the **shared semantic governance loop itself works without executable Harness infrastructure**.
