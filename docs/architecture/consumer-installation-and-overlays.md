# Consumer Installation and Overlay Model

## Purpose

This document defines how an external or internal repository adopts Agent Harness without surrendering its own project structure or editing the installed upstream Harness.

The contract is based on the **Semantic Resource Model**, not one mandatory file format or directory tree. Operational authority and mutation-safety semantics remain canonical in [`standard/protocols/change-safety.md`](../../standard/protocols/change-safety.md); this architecture contract must be interpreted consistently with that protocol rather than as a competing authority model.

## 1. Logical layers

A consumer's effective Harness is composed from four logical layers:

```text
1. Installed upstream Harness base
2. Optional upstream profile
3. Project-local Harness overlay
4. Task / lane overlay
```

Highest priority is last.

The physical layout and serialization format are not part of core compatibility unless a specific profile explicitly requires them.

## 2. Installed upstream base

The installed base is an exact reviewed Agent Harness release/ref or snapshot.

Consumer rules:

- identify upstream version/ref and provenance;
- treat installed upstream files/resources as upstream-owned/read-only;
- keep project policy in overlays rather than patching the vendored base;
- preserve rollback to a prior exact base;
- review material upstream upgrades before adoption.

For early v0.x, manual/repository-native vendoring remains acceptable. The reference package also
provides `syncHarness()` / `installHarnessBundle()` for exact Bundle vendoring and
`setupHarnessProject()` for a small project binding plus selected provider bootstrap pointers. A
package manager or Harness-specific CLI is not required after the exact Bundle is installed.

## 3. Consumer entrypoint

Each consumer should expose one small discoverable entrypoint describing effective composition.

Possible forms include:

```text
.agent-harness/harness.yaml
.agent-harness/harness.json
.agent-harness/harness.md
```

No extension is architecturally mandatory.

The entrypoint should identify:

- upstream Harness version/ref and location;
- selected shared profile;
- project overlay(s);
- task/lane overlay(s);
- precedence/composition order;
- project-owned authority/state/validation/domain rules;
- authoritative representation/provenance where multiple forms exist.

The entrypoint should be small enough that an agent can discover only the resources needed for the current work.

## 4. Neutral default physical layout

A suggested layout is:

```text
.agent-harness/
  harness.yaml or harness.md
  lock.yaml
  vendor/
    agent-harness/<version>/
      resources/
      standard/
      profiles/
      docs/
  project/
    resources/
    roles/
    protocols/
    governance/
  workflows/
  state/
```

This is a convenience default only.

## 5. Existing project layouts

Existing repositories do not need to migrate their local Harness/document/configuration structure merely to use Agent Harness.

For example, an existing project may retain neutral project-native trees such as:

```text
.project-automation/**
.project-harness/**
docs/agent-guidance/**
```

Its consumer entrypoint may map selected existing trees as project/domain overlays.

A software repository may likewise retain `AGENTS.md`, `docs/conventions/**`, `.github/**`, YAML state/configuration, or another established control structure.

Shared/public Agent Harness documentation must use neutral examples. Organization- or consumer-specific private paths, identifiers, issue numbers, credentials, or evidence belong only in the relevant consumer overlay/documentation.

Agent Harness standardizes **logical composition, resource semantics, provenance, and governance**, not file placement.

## 6. Overlay operations

Overlay operations are semantic and serialization-independent.

### extend

Retain the upstream resource and add or narrow local behavior.

### replace

Explicitly replace an upstream default/resource for this effective project/profile **only within authority already delegated to the replacing overlay**. `replace` is not an authority-escalation mechanism.

If the replaced implementation/resource realizes a required profile invariant, conformance may be retained only when the governing contract explicitly permits that substitution, an actual approved substitute is supplied, and the substitute still satisfies the required invariant or an explicitly defined equivalent guarantee. Replacing or weakening the invariant itself is distinct from replacing its implementation and does not silently retain conformance.

### disable

Disable an optional upstream resource or behavior only when the effective overlay has authority to do so. A required profile invariant itself may not be disabled while retaining conformance, and `disable` alone never counts as a substitute. If the governing contract permits substitution of the implementation/resource that realizes a required invariant, use an actual approved substitute that still satisfies the required invariant or an explicitly defined equivalent guarantee; otherwise the consumer must stop claiming conformance to that profile/version.

### add

Define a new project-local resource, role, protocol, checklist, workflow, governance rule, or domain sub-harness within the owning overlay's delegated scope.

These operations are bounded declarative composition. They must not grow arbitrary expressions, scripts, loops, executable templates, or other hidden programming-language semantics.

## 7. Task / lane overlays

A workflow-specific overlay may further narrow project behavior, for example:

- allowed write scope;
- source/input gate;
- review requirement;
- role specialization;
- result/evidence requirements;
- queue/routing selection;
- task-specific escalation.

Task/lane overlays should not redefine unrelated project-wide policy and must not widen authority beyond their delegated task/lane scope.

## 8. Precedence and conflicts

Conceptual precedence:

```text
upstream base
< selected profile
< project overlay
< task/lane overlay
```

Precedence orders conflict resolution **only inside authority already delegated to the overriding layer; precedence does not grant authority**.

An explicit local `replace` wins over the upstream default for that effective workflow only inside its declared custom scope and delegated authority. It cannot override reserved/non-overridable constraints or otherwise widen authority merely because the local layer has higher precedence.

An implicit contradiction is not a valid override. If an explicit operation requests behavior outside the overlay's delegated authority, or if no valid precedence/operation resolves a conflict, follow canonical [`protocol/change-safety`](../../standard/protocols/change-safety.md): report `POLICY_CONTRADICTION` or an equivalent blocked state and route the request to the authority that owns the boundary.

Runtime prompt text is not automatically a higher canonical layer. Temporary runtime overrides, if supported, must be explicit, traceable, bounded, non-canonical, and subject to the same delegated-authority constraints.

## 9. Canonical representation and projections

When structured and narrative representations coexist, each resource family must identify the authoritative representation.

Typical pattern:

```text
structured canonical resource
  -> machine validation/reconciliation/API
  -> generated or companion Markdown/TXT explanation
```

Narrative guidance may remain canonical where prose is inherently the resource and machine structure adds little value.

Do not maintain independently editable structured and narrative copies of the same policy without an explicit authority/derivation rule.

## 10. Effective candidate identity for review

A material consumer or Harness upgrade must be reviewed as an **effective candidate**, not merely as one branch head.

When relevant, the review identity includes:

- candidate/head SHA or immutable artifact identity;
- base/control SHA;
- installed Harness version/ref;
- selected profile identity/version;
- relevant project/task overlay identities;
- resource/schema versions that affect semantics.

A material change to any of these after `PRE_ADOPTION_REVIEW` invalidates the prior PASS and requires re-review.

## 11. Upgrade flow

Recommended sequence:

```text
current exact Harness base
-> inspect new release/change notes
-> update upstream base only
-> preserve local overlays
-> compare effective resources/authority
-> freeze effective candidate
-> PRE_ADOPTION_REVIEW when material
-> adoption decision
-> consumer canary
-> keep or rollback
```

An upstream upgrade must not silently overwrite project overlay resources.

## 12. Conformance

Agent Harness distinguishes use/customization from profile conformance.

A project may:

- use only core semantics;
- use selected standard resources;
- use a standard profile unchanged;
- extend a profile;
- replace much of the standard role taxonomy;
- provide its own loader/adapter/runtime;
- serialize resources in another compatible format/language.

A project must not claim conformance to a profile/version if it intentionally violates that profile's required invariants. Disabling or dropping a required invariant ends that conformance claim. Substituting an implementation/resource behind a required invariant may retain conformance only under an explicit governing contract with an actual approved substitute that still provides the required invariant or explicitly defined equivalent guarantee.

The shared Harness must not assume organization-specific branches, labels, schedulers, repository layouts, languages, or domain policy.

## 13. Structured representation direction

Structured representation can be introduced incrementally when resource semantics are stable enough.

Illustrative YAML:

```yaml
apiVersion: harness.example/v1alpha1
kind: ProjectHarness
metadata:
  name: example
spec:
  base:
    version: v0.x.y
  overlays:
    - path: ./project-harness
  resources:
    - target: role/supervisor
      operation: extend
      source: ./project-harness/roles/supervisor.yaml
```

This syntax is illustrative only. YAML is a likely serialization, not the architecture itself, and the resource contract must remain declarative rather than becoming a custom programming language.

## 14. Future tooling

The reference implementation currently provides compatible `sync` and `setup` foundations. Optional
tooling may expand toward:

```text
harness init
harness install <version>
harness update <version>
harness diff
harness effective
harness validate
harness reconcile
```

Such tooling is an implementation/reference layer around the same Semantic Resource Model. Consumers remain free to implement compatible loaders/controllers in other languages/runtimes.

The canonical distribution unit is the versioned Bundle manifest and its integrity-bound resources,
not npm itself. npm, a GitHub Release, an exact Git ref, a local directory, a Web GUI, or an agent
setup flow may transport the same Bundle. Provider-specific instruction files contain only managed
bootstrap pointers to the project-owned binding; they do not duplicate the installed operational
policy.
