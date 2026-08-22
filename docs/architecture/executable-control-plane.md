# Executable Control-Plane Direction

## Status and ownership

This document is a derived, non-authoritative architecture projection. The North Star and
registered Standard resources remain authoritative for product direction and operational
semantics.

[Issue #25](https://github.com/NewChoBo/harness/issues/25) owns the current provider/runtime
adapter slice. Broader Workspace Blueprint, workflow compiler, policy engine, operational store,
automatic upgrade controller, and Web GUI work require their own exact WorkItem ownership and
acceptance evidence before adoption.

## Why the model is expanding

The useful product boundary is broader than a collection of agent prompts:

```text
Workspace Model -> where durable information and bindings live
Agent Model     -> which logical role and runtime can perform work
Workflow Model  -> which bounded steps and transitions apply
Policy Model    -> which effects are authorized or prohibited
Evolution Model -> how candidates are evaluated, promoted, and rolled back
```

These are independently versioned dimensions. A provider name does not define a logical role,
capability does not grant authority, workflow order does not override policy, and a Notion page or
GitHub object is a runtime binding rather than the semantic identity of a resource.

## Storage and projection boundary

```text
Git release
  schemas, definitions, profiles, migrations, conformance fixtures

Operational store
  workspace instances, semantic-to-physical bindings, runs, events, locks, metrics

Provider surfaces
  Notion, GitHub, filesystem, databases, schedulers, coding-agent sessions

User projections
  Web GUI, chat agent, editor diagnostics, CLI, generated documentation
```

Git owns released definitions and migrations. An operational store owns mutable execution state.
Provider adapters own physical IDs and transport details. User projections read and mutate the same
underlying contracts; the Web GUI, chat interface, and CLI must not become competing truth stores.

Secrets and credentials never belong in a public definition or adapter manifest. They are resolved
from an authorized runtime secret store.

## Schema and compilation boundary

Human-editable YAML or JSON should bind to published JSON Schemas so compatible editors can provide
completion, hover text, and structural diagnostics. Deterministic compilation then performs the
checks that JSON Schema cannot express alone:

```text
parse
-> structural schema validation
-> reference and version resolution
-> semantic graph validation
-> capability and policy compatibility
-> normalized intermediate representation
-> exact bundle identity / diagnostics
```

Diagnostics use stable codes and severities:

- `ERROR` prevents compilation or execution;
- `WARNING` preserves execution eligibility but identifies risk or deprecation;
- `INFO` records a non-blocking recommendation.

The compiler is a library first. CLI, CI, Web GUI, chat/LLM setup agents, and a future Language Server
are clients of the same implementation. A user does not need to install or understand the CLI to use
the model.

## Agent control contract

The current executable foundation consists of four provider-neutral document shapes:

| Contract               | Purpose                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| `AgentAdapterManifest` | Declares observed adapter interface, operations, and capabilities         |
| `AgentWorkRequest`     | Submits one bounded role-oriented objective and requested effect envelope |
| `AgentEvent`           | Normalizes session progress, tool, checkpoint, input, and terminal events |
| `AgentCompletion`      | Closes a session and points to the governing result/receipt contract      |

The schemas live under `schemas/agent-*.schema.json`. They are intentionally transport-neutral.
MCP, ACP, provider SDKs, JSON-RPC, non-interactive CLIs, and HTTP APIs may carry or realize the same
contract through adapters.

MCP remains useful for capability negotiation, tools, resources, prompts, and structured tool
results. ACP or provider-native session APIs may provide richer coding-agent session control. The
Harness contract does not redefine either protocol and does not assume every provider supports
pause, resume, steering, cancellation, streaming, subagents, or receipts.

An adapter must report each capability as `supported`, `unsupported`, or `unknown`. Product identity
alone is not capability evidence. A capability marked `supported` must have its corresponding
operation, and missing capability routes to an authorized fallback or fails closed.

## Capability is not authority

The adapter manifest deliberately cannot grant push, merge, release, external-write, or other
authority. It states what a runtime can technically do. The effective WorkItem and policy determine
what it may do for one execution.

An `AgentWorkRequest` carries requested and prohibited effects, but the controller executes only the
intersection of:

```text
observed adapter capability
AND governing Harness authority
AND consumer/project policy
AND task-specific delegation
```

Unknown or contradictory authority fails closed. Provider-native permission controls should narrow
the execution surface when available but cannot widen Harness authority.

## Result and receipt ownership

`AgentCompletion` is a transport/session envelope, not a second evidence truth store. Its `result`
must be validated against the exact `result_schema` selected by the governing workflow, and its
`receipt_ref` points to the canonical execution-outcome receipt when one is required.

Normalized events support live UI and recovery, but terminal lifecycle, review, adoption, release,
and effect conclusions remain owned by their existing contracts. A provider saying `completed` does
not prove validation, review, merge, release, or effectiveness.

## Recursive evolution and upgrades

Workspace, agent, workflow, policy, and adapter definitions may all evolve through versioned
candidates. Autonomous upgrade is compatible with the North Star when bounded by a separately
protected safety policy:

```text
observe -> propose -> compile -> replay/simulate -> canary
-> promote -> observe effect -> keep | narrow | rollback
```

The active version and candidate version remain distinct so a controller can validate and roll back
without requiring approval for every pre-authorized safe update. Automatic change must not silently
delete user content, widen authority, expose private data, increase reserved cost, or rewrite the
safety/update policy that governs itself.

## Product naming boundary

`NewChoBo Harness`, the npm package names, and the `agent-harness` command remain the current
compatibility identities. This candidate does not rename them.

The product may eventually need a broader user-facing name if its stable center becomes a complete
workspace/agent/workflow/policy/evolution control plane rather than a reusable agent harness. A
naming decision should follow evidence that this broader boundary is adopted, understandable to new
users, and stable enough to justify migration. It must separately decide:

- user-facing product name;
- public repository and package names;
- CLI compatibility aliases;
- configuration/schema identifiers;
- migration and deprecation period.

Brand exploration must not silently break installed package, schema, lock, or command identities.

## Current exclusions

This architecture direction does not itself implement or adopt:

- a database or hosted control service;
- a mandatory Notion, GitHub, or CLI dependency;
- a proprietary replacement for MCP or ACP;
- arbitrary scripts, expressions, loops, or executable workflow YAML;
- automatic provider installation or credential handling;
- an automatic workspace migration or Web GUI;
- a product/package/repository rename;
- new normative Standard resources before catalog/corpus integrity is ready.
