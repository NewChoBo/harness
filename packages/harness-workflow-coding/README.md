## Harness workflow: coding

Shared preset for coding and engineering streams.

```text
Harness base
+ software-development profile (optional)
+ repository overlay
+ task overlay
= effective workflow
```

### Composition to keep in local layers

- branch/release policy
- ownership boundaries
- repository-specific validation commands
- protected paths and write scope
- issue/PR conventions
- security and product policy

### Effective work flow

1. Supervisor restores repository state and routes one decision-ready item.
2. Worker implements on a candidate branch and self-checks.
3. Worker freezes `CANDIDATE_READY` with evidence identity.
4. Independent Reviewer performs `PRE_ADOPTION_REVIEW`.
5. Governor/adopter proceeds only after `REVIEW_PASSED`.
6. Follow-up validation determines whether shared guidance changed product behavior.

This package should be treated as shared defaults; local repository policy overrides all shared defaults.
