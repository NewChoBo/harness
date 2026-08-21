# Research Workflow Overlay

## Primary intent

Research-oriented tasks should preserve evidence traces, uncertainty labels,
and explicit decision-quality checkpoints.

## Recommended defaults

- Keep exploratory notes and candidate artifacts distinct.
- Require explicit uncertainty labels when evidence is partial.
- Run counterexample/edge-case checks before promotion.
- Define stop conditions for research loops and handover criteria.
- Prefer current primary or authoritative sources when they exist.
- Record material source/version/date, scope limitations, counterevidence, and
  applicability to the current decision.

## Continuous evidence horizon

A recurring Supervisor or research workflow may maintain a bounded evidence
horizon when current uncertainty, repeated failure, an architecture assumption,
an ecosystem change, or a roadmap decision makes external evidence material.

```text
current decision / assumption / recurring failure
+ external evidence delta
-> bounded current-evidence research + counterevidence
-> applicability and limitations
-> CONFIRMED | NARROWED | SUPERSEDED | REJECTED | NEW_GAP | NO_MATERIAL_DELTA
-> existing decision or work owner
```

The canonical result vocabulary and silent no-delta behavior are defined by
`role/researcher`. This overlay reuses that vocabulary as research guidance; selecting
this overlay does not by itself select or require `role/researcher` as the effective role.
Before inventing a reusable abstraction, proportionally inspect mature products,
standards/protocols, current official documentation, strong open-source
implementations, primary research, and credible production evidence that could
already solve, narrow, or falsify the problem. External systems and papers are
evidence or reference implementations, not specifications or adoption
authority.

Research remains evidence/synthesis only and does not grant implementation,
review, adoption, release, or publication authority. `NO_MATERIAL_DELTA` is a
valid, silent result: do not create work items or comments merely because a
recurring check found no decision-relevant change. Preserve stop conditions so
continuous means available when a material trigger exists, not an endless
research loop.
