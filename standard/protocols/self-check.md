# Agent Self-Check

Before claiming successful completion, the work owner verifies:

1. **Goal / acceptance** — the requested outcome is actually satisfied.
2. **Freshness** — relevant HEAD/source/candidate/dependency state was rechecked.
3. **Scope / ownership** — only the declared concern and write scope were changed.
4. **Validation** — required checks actually ran; skipped, cancelled, unavailable, and failed are not passed.
5. **Evidence** — exact SHA/identity and material validation evidence are present when applicable.
6. **Handoff / state** — another agent can continue from durable state without relying on conversation history.

A failed mandatory self-check changes the outcome to replan, revision, or blocked. Self-check is not independent approval.
