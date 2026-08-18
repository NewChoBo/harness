# Guided Project Setup — neutral example

This example shows the shape of a setup conversation and resulting project-owned artifacts. It is illustrative, not a required directory layout or questionnaire.

## Starting user input

> I want a small desktop tool that lets non-technical users collect several recurring information sources in one place. I care more about a simple daily experience than advanced authoring at first.

## Facilitator progression

The facilitator should not immediately ask dozens of questions. It restores any existing project state, then asks the highest-value missing question.

Example progression:

1. **Primary outcome** — Is the first release mainly for viewing information, taking actions, or creating custom workflows?
2. **Target user/context** — Is this for one person's desktop, a team environment, or a distributed service?
3. **Hard constraints** — Must it work offline, support a specific OS/runtime, preserve a particular data boundary, or integrate an existing system?
4. **North Star tradeoff** — When simplicity conflicts with configurability, which should win in the first milestone?
5. **Development strategy** — Given the answers and current ecosystem evidence, recommend a small architecture/migration path rather than asking the user to pick low-level implementation details.
6. **Authority/automation** — Ask only if the user wants recurring autonomous development/research/review and which irreversible/release decisions remain human-owned.

At each step the facilitator maintains a compact synthesis and labels material facts as user decisions, supported recommendations, assumptions, or unresolved.

## Example synthesis

```text
North Star
- Make recurring information easy to see and act on without requiring users to become workflow authors.

Requirements
- simple first-run experience
- modular source adapters
- safe recoverable actions
- browser-testable UI where native integration is not required

Non-goals for first milestone
- full visual programming environment
- arbitrary plugin marketplace
- enterprise multi-tenant administration

Development strategy
- start with one end-to-end vertical slice
- isolate generic UI/workbench mechanics from product-specific source policy
- use deterministic fake adapters for browser-level testing
- add native/runtime integration only at the truthful boundary

Authority
- ordinary implementation/reversible refactors delegated
- public release and destructive data migration remain human-owned

Automation
- one implementation/control lane and a distinct independent-review lane initially
- no specialist-per-task proliferation
```

## Possible project-owned outputs

A real project should reuse its existing documents. For a greenfield project a minimal set might be:

```text
AGENTS.md
.agent-harness/harness.md
docs/product/north-star.md
docs/product/requirements.md
docs/engineering/development-strategy.md
.agent-harness/scheduled-task-bindings.md   # only if recurring automation is enabled
```

Do not create all of these when one existing project guide can own multiple concerns cleanly.

## Physical scheduler after setup

The scheduler should not contain the project policy above. It should point to the project-owned binding, for example:

```text
repository: <project>
control_ref: <trusted-ref>
prompt_source: .agent-harness/scheduled-task-bindings.md#implementation
```

Runtime-only/private source identity or credentials/capability context remain outside a public project when necessary.

## Existing-project retrofit

For an existing project, the facilitator first reads current requirements/North Star/agent/release/validation guidance and asks only about material gaps or contradictions. It does not generate parallel replacement documents merely to fit this example.