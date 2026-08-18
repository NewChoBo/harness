# Agent Harness — North Star

This public North Star text is a neutralized template surface derived from the original **Newchobo harness**.

## Authority

This document is the authoritative **product-direction North Star** for Agent Harness.

It defines **why the Harness exists and the desired end state**. It does not replace the operational semantics in `standard/**`, authority/review gates, consumer-owned policy, or exact work-item acceptance criteria.

Interpret the layers in this order:

```text
North Star       = why / desired end state
Standard         = shared operational invariants and semantics
Profiles         = reusable work/domain specialization
Roadmap          = sequencing toward the North Star
Workflow Preset  = bounded logical execution composition
Consumer Overlay = genuine local policy/customization
Issue / WorkItem = current concrete work
Evidence/Receipt = what actually happened
```

A lower layer must not silently redefine a higher layer. A local optimization that improves activity metrics but moves the product away from this North Star is the wrong optimization.

## North Star statement

> **A user should be able to state a goal in simple, outcome-oriented language and have any compatible AI agent/runtime reliably restore context, discover the best available solution space, plan, execute, validate, independently review, improve, hand off, and continue the work across sessions and tools — with minimal user micromanagement, without provider lock-in, duplicated policy, hidden authority expansion, or unverified claims of completion.**

The Harness exists to make that closed loop portable, explainable, evidence-backed, and continuously improvable.

## Desired operating loop

Where authority and runtime capability permit, the Harness should support the complete loop rather than merely forward tasks:

```text
RESTORE / OBSERVE
-> FRAME / DISCOVER
-> PLAN / ROUTE
-> PRODUCE
-> VALIDATE
-> INDEPENDENT REVIEW
-> ADOPT / INTEGRATE when authorized
-> VERIFY EFFECT
-> IMPROVE / HANDOFF / CONTINUE
```

A report that says `done` is not proof. Completion and adoption are bound to current evidence and the exact effective candidate.

## Goal-first, not prompt-engineering-first

The user should not need to know the correct framework, library, architecture pattern, UI pattern, paper, model, provider, or agent topology before asking for a useful result.

For an underspecified material need, the system should proportionally reduce uncertainty before committing to a design:

```text
simple user goal
-> current-state restoration
-> problem framing
-> discovery depth selection
-> relevant repository facts
   + products / OSS / official docs / standards
   + research / papers / UI-UX exemplars / failure cases when useful
-> evidence-backed options and tradeoffs
-> delegated decision or precise upward decision request
-> implementation / experiment / no-change
```

Research is not an activity goal. Skip or bound it when it would not materially change the decision.

When a user decision is genuinely required, present it in a way that minimizes user management load without falsely closing the solution space. Concrete decision-request mechanics belong in the Standard rather than this North Star.

## Learn continuously from the evolving agent ecosystem

Agent Harness should remain current with material advances in agent products, coding-agent systems, harness engineering, open protocols and standards, open-source frameworks, evaluation and safety research, and production engineering practice.

Use a **reference-first, abstraction-last** approach. Before inventing a new Agent, Skill, Workflow, Provider, Extension, context/memory mechanism, evaluation mechanism, or other semantic abstraction, proportionally inspect whether mature external systems or current evidence already solve, simplify, constrain, or falsify the assumed problem.

Relevant evidence may include, when material:

- current official product/runtime/tool documentation and release notes;
- mature agent and coding-agent products, including their agent/subagent, project-instruction, reusable-workflow, permission/sandbox, tool, context/memory, automation, isolation, and handoff structures;
- open interoperability protocols and standards;
- primary research and technical reports on agent harnesses, orchestration, context/memory, tool use, evaluation, verification, security, multi-agent systems, software agents, and observability;
- strong open-source implementations and reproducible benchmark/evaluation sources;
- credible production engineering case studies and documented failure modes.

External systems are **reference implementations and evidence, not specifications or adoption authority**. Do not clone one provider into Harness Core, and do not reduce the Harness to a lowest-common-denominator model merely because providers differ. Preserve useful provider-native strengths in projections/adapters/extensions when they are not durable cross-provider semantics.

The research horizon should be **continuous but delta-oriented**:

```text
current Harness uncertainty / roadmap / recurring failure
+ material external ecosystem delta
-> bounded research horizon
-> primary/authoritative evidence + counterexamples
-> compare with current Harness semantics and effect evidence
-> confirm / narrow / supersede / reject / discover gap / NO_ACTION
-> route only material consequences through normal ownership/review/adoption/effect lifecycle
```

A new paper, product feature, release, benchmark, or standard revision is not by itself a reason to change the Harness. Research exists to reduce uncertainty, falsify stale assumptions, discover simpler or stronger mechanisms, expose obsolete Harness components, and improve decisions. `NO_ACTION` is a valid research result.

Prefer current primary/authoritative sources for material technical claims, track relevant dates/versions and limitations when freshness matters, seek counterexamples, and revisit prior conclusions when stronger evidence appears. Avoid novelty chasing, product cloning, paper-as-policy, benchmark overfitting, and repeated research activity with no decision impact.

## Portable across providers and execution environments

The same logical Harness should be usable from chat-only LLM sessions, scheduled tasks, persistent workspaces, coding agents, local CLI/CI, and future providers without rewriting common governance into provider-specific prompts.

Core distinctions:

```text
Logical Workflow != Physical Scheduled Task != ExecutionProvider
Runtime Capability != Harness Authority
```

Provider/product names belong in adapters, bindings, extensions, and conformance evidence rather than core workflow semantics.

Adding a compatible provider should normally require an adapter/extension plus conformance evidence, not a rewrite of shared governance.

## Works with and without executable Harness code

The Harness must support:

- **zero-runtime semantic operation** — an LLM/session can read authoritative Harness resources without Node/npm;
- **deterministic Engine-assisted operation** — when Node/npm is available, the reference Engine performs deterministic resolution, validation, authorization, evidence checks, diff/audit, and related control work;
- **bridged validation** — a constrained runtime may consume a current exact-candidate-bound receipt produced by a compatible external provider/CI.

No runtime may claim deterministic validation it did not perform or possess valid current evidence for.

## Shared semantics, minimal consumer duplication

Common governance, workflow, validation, review, evidence, authority, provider, and scheduling semantics should live in the shared Harness.

Consumers should converge toward:

```text
exact Harness binding / lock
+ selected shared profile / workflow
+ genuinely consumer-specific overlays
```

Do not centralize consumer domain, product, business, canon, genre, release, private coordination, or other legitimate local policy merely to reduce file count.

Physical prompts/tasks should become thin bootstraps or reconciled runtime state when platform capability permits; they should not remain duplicate editable policy stores.

## Logical role separation survives physical consolidation

Supervisor, Worker, Independent Reviewer, Adoption Authority, Researcher, and other responsibilities are semantic roles and authority boundaries, not necessarily permanent physical scheduled tasks.

Physical topology may consolidate only when required isolation, authority, evidence, capability, and conformance are actually enforceable.

In particular:

- material Producer != Independent Reviewer;
- one physical execution may host both only with verified fresh isolated Reviewer context/capsule;
- high-risk work may require a distinct/external reviewer;
- `REVIEW_PASSED` is not `ADOPTED`;
- `ADOPT` is distinct from mechanical `INTEGRATE`.

The target is minimum operational overhead **without collapsing safety or independence**.

## Machine-enforce deterministic facts; preserve judgment where needed

Prefer deterministic Engine/controller behavior for exact identities, dependency closure, cycle/conflict checks, capability/authority checks, evidence freshness, bounded lifecycle transitions, duplicate/blocker fingerprints, effective config/diff/audit, and conformance.

Use agent/reviewer judgment for open-ended architecture/product tradeoffs, applicability of external evidence, UX/product quality, whether abstraction is justified, and whether a simpler alternative is better.

Do not turn declarative resources into a custom programming language just to encode every decision.

## Evidence, provenance, and explainability are first-class

For material work the system should be able to answer, proportionally:

```text
What goal was being pursued?
What exact state was observed?
Which Harness/profile/overlay was effective?
Who/what produced the candidate?
What authority allowed the action?
What runtime capabilities were actually available?
What validation/review evidence exists?
Is that evidence still current?
Why was this option selected over alternatives?
What is the rollback/falsifier?
What happens next?
```

Private chain-of-thought is not a required artifact. Persist only decision-relevant plans, assumptions, evidence, provenance, results, and handoffs.

## Self-improvement is evidence-driven and bounded

Every material completion should proportionally check for residual work and systemic improvement opportunities, but the Harness must not manufacture work to remain busy.

```text
complete / verify current work
-> inspect residual and recurring/systemic signals
-> classify shared vs consumer-specific
-> choose at most one highest-value follow-up
-> improvement candidate / research / effect observation / NO_ACTION
-> review and adoption when material
-> PENDING_EFFECT_VALIDATION
-> EFFECTIVE / INEFFECTIVE / REGRESSIVE / INCONCLUSIVE
-> keep / narrow / revert / supersede
```

Prefer consolidation/removal over policy accretion. `NO_ACTION` is a valid successful outcome.

## Minimize user management load without stealing reserved decisions

Resolve ordinary reversible implementation details under existing authority. Bring the user decisions that materially affect goals, scope, authority, security/privacy, destructive/irreversible behavior, major product direction, publication/release boundaries, or other explicitly reserved choices.

Exploratory input remains analysis by default. Recommendation is not approval, and external evidence is not adoption authority.

## North Star evaluation questions

For material architecture, governance, workflow, provider, or automation-topology changes, ask proportionally:

1. Does this reduce expertise or micromanagement required from the user?
2. Does it improve closed-loop completion rather than merely create more tasks/reports?
3. Does it improve portability across providers/runtimes instead of adding lock-in?
4. Does it reduce duplicated/stale policy while preserving one authoritative semantic source?
5. Does it preserve or strengthen evidence, review independence, authority safety, privacy, and rollback?
6. Does it make deterministic behavior more testable without creating a framework/DSL explosion?
7. Does it make future sessions/agents better able to restore the same goal and continue coherently?
8. Is there a simpler design with the same or better North Star alignment?
9. Before inventing new semantic machinery, did we proportionally check whether mature products, standards, open-source systems, or current research already solve or falsify the problem?
10. Is the decision based on sufficiently current evidence and explicit limitations rather than stale references, novelty, or one benchmark/provider?

## Non-goals

- a giant implementation specification embedded in the North Star;
- fixing current provider names, physical automation counts, or directory layout forever;
- mandatory research for trivial work or continuous research activity with no decision value;
- adopting features merely because a product, paper, benchmark, or standard is new;
- replacing domain-specific consumer goals or overlays;
- autonomy that bypasses authority, privacy, independent review, or reserved user decisions;
- measuring success by issue count, comment volume, automation count, prompt length, number of agents, papers read, or research comments produced;
- creating a proprietary agent communication, telemetry, scheduler, IAM, or workflow programming language when adapters to bounded external systems are sufficient.
