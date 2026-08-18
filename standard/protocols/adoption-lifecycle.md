# Adoption Lifecycle

Resource ID: `protocol/adoption-lifecycle`

## Purpose

Separate implementation, independent review, adoption, and post-adoption effect validation.

## Lifecycle

```text
approved/routed change
-> Worker implementation
-> Agent Self-Check
-> frozen CANDIDATE_READY
-> distinct Independent Reviewer PRE_ADOPTION_REVIEW

PRE_ADOPTION_REVIEW outcome:
  REVIEW_PASSED
    -> PENDING_APPROVAL
    -> Governor/higher-authority decision

      ADOPT
        -> integration verification
        -> PENDING_EFFECT_VALIDATION
        -> EFFECTIVE / INEFFECTIVE / REGRESSIVE / INCONCLUSIVE
        -> keep / narrow / revert / supersede

      REJECT
        -> REJECTED / no integration

      REQUEST_REVISION
        -> return to Worker
        -> revised candidate
        -> new frozen CANDIDATE_READY
        -> fresh PRE_ADOPTION_REVIEW

      NARROW
        -> if effective candidate semantics or material adoption scope change,
           produce a narrowed candidate and run fresh PRE_ADOPTION_REVIEW
        -> if the narrowing is only a review-covered, non-material administrative
           scope reduction and the reviewed effective candidate remains unchanged,
           record the reduced administrative scope and return to an explicit ADOPT
           decision for that same reviewed effective candidate
        -> NARROW itself never authorizes integration

  CHANGES_REQUIRED
    -> return to Worker
    -> revised candidate
    -> new frozen CANDIDATE_READY
    -> fresh PRE_ADOPTION_REVIEW

  REVIEW_BLOCKED
    -> remain blocked
    -> resolve the blocker or obtain missing evidence
    -> fresh PRE_ADOPTION_REVIEW before any approval
```

Only `REVIEW_PASSED` may advance to `PENDING_APPROVAL`, and only an explicit `ADOPT` decision for the reviewed effective candidate may advance to integration.

## Candidate freeze

Record the effective candidate identity. Include when relevant:

- candidate/head SHA or immutable identity;
- base/control SHA;
- Harness/resource version;
- selected profile identity/version;
- project/task custom-overlay identities;
- schedule/topology desired-state identity when it affects behavior;
- authoritative resource provenance.

Material drift invalidates prior review PASS.

## PRE_ADOPTION_REVIEW

The final candidate is reassessed against the original goal and current consequences, including newly introduced drawbacks, regressions, complexity, interoperability, authority, canonicality/provenance, anti-DSL rules, rollback, data/privacy boundaries, and prior review findings.

Producer and Independent Reviewer are distinct for material changes.

## Adoption authority

A material change to a role's own responsibilities/authority requires adoption above that role. Authority expansion requires a higher authority.

Any root-constitution change always routes to the applicable higher/root authority. Other reserved high-risk boundaries route upward unless that specific decision class has already been explicitly delegated by the relevant higher authority.

## Revision after review or approval

A Reviewer or Governor request that changes material semantics does not patch the reviewed candidate in place and preserve PASS. It creates a new candidate identity that must be frozen and independently reviewed again.

This includes material narrowing, replacement, authority changes, behavior changes, or schedule/topology changes that alter the effective workflow.

A review-covered, non-material administrative narrowing may preserve the reviewed candidate identity, but it still requires an explicit `ADOPT` decision before integration.

## Post-adoption effect validation

Adoption proves that the candidate passed the decision process, not that the design is effective. Observe actual use and classify effect; narrow/revert/supersede ineffective or regressive changes through the normal governed lifecycle.
