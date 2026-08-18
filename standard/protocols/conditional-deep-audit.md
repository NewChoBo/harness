# Conditional Deep Audit

Deep source/artifact inspection is not a routine Supervisor step.

Trigger a focused audit when evidence indicates material risk, such as:

- high-severity defects;
- producer/reviewer disagreement;
- incomplete or contradictory completion evidence;
- public API/schema or major ownership change;
- cross-project extraction or migration;
- breaking or high-reversal change;
- repeated regression;
- policy/control-plane mutation;
- apparently green validation that conflicts with runtime or contract evidence.

Limit the audit to the relevant diff/artifact, contract, tests, dependencies, and issue/review state. Delegate exact source review to an Independent Reviewer when practical.
