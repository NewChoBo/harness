# Decision 0006 — Decision safety and pre-adoption review gates

## Status

Accepted. Operationalized by the Standard Harness resources listed below.

## Context

Agent Harness may be used by non-experts and conversational managers who sometimes issue direct commands and sometimes ask questions, brainstorm, or suggest possibilities. Treating every statement as authorization risks accidental durable mutation.

A second risk appears after implementation: a Worker may satisfy the requested change while introducing drawbacks, complexity, authority drift, interoperability regressions, or a better alternative visible only in the finished candidate.

Therefore authorization, implementation, independent review, adoption, and post-adoption effect validation are distinct stages.

## Decision

Material manager/user input must distinguish explicit mutation authority from exploratory/non-directive input. Non-directive or materially ambiguous input is analyze-only by default.

Material authorized changes receive proportionate consequence analysis before implementation.

Implementation stops at a frozen candidate. A distinct Independent Reviewer reassesses the final effective candidate before adoption. `REVIEW_PASSED` is eligibility for adoption consideration, not adoption itself. Material effective-candidate drift invalidates the prior review.

After adoption, actual outcomes remain subject to effect validation and possible narrowing/revert/supersession.

## Operational canonical resources

The following Standard resources are the operational source of truth for this decision:

- `standard/protocols/change-safety.md`
- `standard/protocols/adoption-lifecycle.md`
- `standard/checklists/agent-self-check.md`
- `standard/checklists/pre-adoption-review.md`
- `standard/protocols/checkpoint-handoff.md`

Decision 0004 remains the rationale/provenance record for hierarchical self-role and authority adoption boundaries.

This Decision record is **not a second independently editable lifecycle specification**. If future evidence changes the underlying decision, update/supersede this ADR and the affected canonical Standard resources in the same governed candidate.

## Consequence

The Harness can remain autonomous for explicit delegated work while preventing questions, proposals, implementation momentum, or stale review evidence from becoming accidental policy. The operational lifecycle remains directly consumable through the Standard resources rather than duplicated across ADRs.
