# Ownership and Dependency Routing

1. Identify the outcome and its current owner before mutation.
2. Detect duplicate in-flight work, overlapping branches, reviews, or queues.
3. Classify dependencies and block downstream work that requires an unavailable prerequisite.
4. Route implementation to the Worker, exact quality review to the Independent Reviewer, uncertainty reduction to the Researcher, and system coordination to the Supervisor.
5. Preserve consumer-specific ownership rules in consumer overlays; the shared harness does not invent product/domain ownership.
