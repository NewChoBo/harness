# Deep Audit and Escalation

Resource ID: `protocol/deep-audit-and-escalation`

## Purpose

Keep routine supervision lightweight while triggering focused deep inspection and higher-level decisions only when evidence warrants them.

## Deep-audit triggers

Examples include:

- unresolved P0/P1 or equivalent severe finding;
- producer/reviewer disagreement;
- contradictory or insufficient completion evidence;
- public API/schema or significant ownership change;
- high-reversal/breaking semantics;
- repeated regression or recurring guidance failure;
- policy/control-plane mutation;
- suspicious mismatch between green validation and observed behavior.

## Audit scope

Inspect only the relevant candidate, contract, validation, dependency, and evidence needed to resolve the trigger. Delegate exact source-level review to an Independent Reviewer when practical.

## Upward decision triggers

Escalate when the current authority cannot safely decide, including:

- any root-constitution change;
- authority expansion beyond the delegated scope;
- material security/privacy boundary changes;
- destructive/irreversible operations;
- external/public publication or visibility not already delegated;
- unbounded monetary/resource commitments;
- a material user/product preference that evidence cannot determine.

## Decision request format

Keep it compact: decision/question, why now, major options/tradeoffs, recommended default when supported, consequence of deferral, and exact evidence/owner.

Do not escalate routine reversible implementation details that existing authority can resolve.
