# Research Workflow Overlay

## Primary intent

Research-oriented tasks should preserve evidence traces, uncertainty labels,
and explicit decision-quality checkpoints.

Research is not a novelty feed. It exists to reduce uncertainty, test current
assumptions, discover simpler or safer alternatives, and detect when an adopted
approach has become stale relative to current evidence.

## Recommended defaults

- Keep exploratory notes and candidate artifacts distinct.
- Require explicit uncertainty labels when evidence is partial.
- Run counterexample/edge-case checks before promotion.
- Define stop conditions for research loops and handover criteria.
- Prefer current primary or authoritative sources when they exist.
- Record source/version/date, material scope limitations, counterevidence, and
  applicability to the current decision when those facts affect interpretation.
- Treat `NO_MATERIAL_DELTA` as a valid result and avoid repetitive research
  comments or work items when nothing changed.

## Continuous evidence horizon

A recurring research or supervision loop may maintain a bounded evidence horizon
when current uncertainty, repeated failures, architecture assumptions, ecosystem
changes, or roadmap choices make external evidence material.

```text
current uncertainty / recurring failure / architecture assumption
+ external ecosystem delta
-> bounded current-evidence research
-> primary/authoritative evidence + counterevidence
-> applicability analysis
-> CONFIRMED | NARROWED | SUPERSEDED | REJECTED | NEW_GAP | NO_MATERIAL_DELTA
-> existing owner / candidate / handoff / NO_ACTION
```

The horizon may include, when relevant:

- current official specifications, product documentation, and release notes;
- primary research papers and technical reports;
- source repositories and inspectable implementation evidence;
- credible production engineering reports;
- benchmarks, evaluations, and datasets with methodology and scope limits.

Use a reference-first, abstraction-last bias. Before adding a new reusable
abstraction, proportionally inspect whether current standards, mature systems,
or research already solve, narrow, or falsify the assumed problem.

## Source discipline

Prefer sources proportionally in this order when material:

1. official product/specification/release documentation for current behavior;
2. primary papers, technical reports, benchmark or dataset sources;
3. source repositories and implementation evidence;
4. credible production engineering reports;
5. secondary analysis for discovery/context when stronger primary evidence is
   available.

Research findings are evidence, not implementation, review, adoption, release,
or publication authority.

## Anti-patterns

- `NOVELTY_CHASING` — adopting a mechanism because it is new or popular.
- `PRODUCT_CLONING` — copying one provider/product architecture into shared
  semantics without cross-context evidence.
- `PAPER_AS_POLICY` — turning one paper into a universal rule.
- `BENCHMARK_OVERFIT` — optimizing architecture only for one benchmark.
- `RESEARCH_NOISE` — repeated searching/persistence with no decision impact.
- `STALE_REFERENCE` — keeping an assumption after its source/spec materially
  changed.
- `NOT_INVENTED_HERE` — building proprietary machinery when a bounded existing
  standard or adapter would suffice.

## Promotion boundary

Do not generalize private, consumer-specific, or domain-specific evidence into
shared Harness merely because the conclusion sounds generic. Public/shared
promotion requires safe abstraction, applicable cross-context evidence, and the
normal candidate/review/adoption lifecycle.
