# Fiction / Media Project Example

This example is intentionally genre- and product-neutral. It demonstrates how a domain Harness can remain local while reusing shared control semantics.

## Composition

```text
Agent Harness base
+ fiction/media profile (optional)
+ project/domain overlay
+ manuscript-review task overlay
= effective workflow
```

A consumer entrypoint could declare conceptually:

```yaml
base:
  version: <exact-harness-release>
profile: fiction-media
projectOverlay: .project-control/domain-harness/
taskOverlay: .project-control/workflows/manuscript-review/
```

The fields are illustrative and declarative only.

## Project/domain overlay owns

- canon and source-of-truth hierarchy;
- manuscript/episode ownership;
- genre/style/reveal constraints;
- character/location/prop continuity;
- publication and adaptation rules;
- project-specific review rubrics.

## Effective work flow

1. Supervisor restores exact source/canon/review state and routes one eligible unit.
2. Writer/Worker changes only its authorized manuscript or adaptation scope and self-checks.
3. The unit is frozen as `CANDIDATE_READY` with exact source/candidate identity.
4. A distinct Reviewer fresh-reads the final candidate against current canon/project policy and shared PRE_ADOPTION_REVIEW semantics.
5. The project authority adopts/rejects the candidate according to local canon/publication policy.
6. Repeated review or production failures may become shared-guidance candidates only after cross-context evidence shows the issue is domain-neutral.

The shared Harness never decides story canon, genre taste, reveal policy, or publication authority for the consumer.
