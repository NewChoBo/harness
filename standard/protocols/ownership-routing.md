# Ownership and Dependency Routing

1. **Restore current control state first** before selecting next mutation. This includes control/base identity, active owned work claims, and source/control freshness.
2. **Run duplicate detection before mutation**: any overlapping active claims, branches, reviews, queues, or stale open handoffs for the same effective concern are treated as in-scope conflict.
3. If a same-concern active claim exists, route to the current owner or reconcile/merge only with explicit ownership transfer.
4. **Classify dependency blockers** and halt downstream claims that require missing or invalid prerequisites.
5. Route implementation to the Worker, exact quality review to the Independent Reviewer, uncertainty reduction to the Researcher, and system coordination to the Supervisor.
6. Preserve consumer-specific ownership rules in consumer overlays; shared Harness semantics do not invent product/domain policy.
7. A Controller records each routing decision and outcome in a provider-neutral conference-room surface so another authorized owner can resume from the latest state.
