# 0012 — Guided project setup composes existing Harness semantics

Status: proposed

## Context

A reusable Harness should not require users to know its role/profile/overlay/resource model before they can start a project. A user may only know the rough product, research, content, or operational goal and should be able to refine it through dialogue.

The repository already separates problem/demand discovery, Objective/Outcome traceability, Solution Discovery, consumer binding/overlays, authority/review/adoption, and effect evaluation. Building a separate configuration language or onboarding state machine would duplicate those semantics.

Physical Scheduled Task prompts have also tended to become second policy stores. Project setup must establish project-owned prompt sources when automation is enabled rather than generating another large scheduler prompt.

## Decision

Add a small guided setup composition:

- `role/project-setup-facilitator` owns the user-facing setup facilitation role;
- `protocol/project-setup-dialogue` owns progressive interview/synthesis behavior;
- existing owners remain authoritative for Problem/Demand Discovery, Objective/Outcome, Solution Discovery, consumer binding/overlays, authority, review/adoption and effect;
- setup generates or updates only the minimum coherent project-owned artifacts;
- explicit user decisions, supported recommendations, provisional assumptions and unresolved choices remain distinguishable;
- physical scheduler prompt sources live in the owning project; scheduler storage is reduced to pointer/bootstrap plus runtime-only parameters;
- automation topology is an optional setup output, not a default requirement.

## User decisions are revisitable but protected

An explicit user decision remains the current authority-backed truth in its owned scope, but it is not assumed to remain optimal forever.

Later research, repository/effect evidence, external platform or standard changes, material cost/security/privacy changes, or conflict with a newer user goal may justify a bounded `CHANGE_RECOMMENDATION`.

The current decision remains active until the owning authority changes it. If the proposed revision changes user-owned intent, automation must create `CHANGE_AUTHORIZATION_REQUIRED` rather than silently applying the change. `AUTONOMOUS` mode alone does not grant permission to rewrite explicit user decisions.

A recommendation should explain what materially changed, the proposed replacement or narrowing, keep-vs-change tradeoffs, migration/rollback impact, uncertainty/falsifier where material, and the recommendation. If the user rejects it, the current decision stays authoritative and unchanged evidence must not generate repeated requests.

Automatic revision is allowed only when an explicit current standing delegation already covers that decision class and scope.

## Why

This reduces user expertise and micromanagement while keeping Harness provider-neutral and preventing configuration/prompt duplication. It also makes setup resumable: an existing project can be restored, only missing decisions are asked, and later sessions can continue from project-owned artifacts rather than conversation memory.

It also prevents two opposite failure modes: treating old user choices as permanently untouchable, or allowing automation to silently rewrite user intent whenever a newer best practice appears.

## Rejected alternatives

### One giant setup questionnaire

Rejected because it creates unnecessary user burden, encourages users to answer irrelevant questions, and becomes stale as project types evolve.

### A project configuration DSL

Rejected because requirements, strategy, authority, workflow and scheduler semantics already have owners. Arbitrary config fields or expressions would create a second policy model.

### Autonomous full project definition without user dialogue

Rejected as a default because North Star, product values, major tradeoffs and reserved authority can be user-owned choices. Autonomous/delegated modes may resolve technical choices only inside granted authority.

### Immutable user decisions

Rejected because material evidence and conditions can change. Authority should prevent silent overwrite, not evidence-backed reconsideration.

### Keep detailed automation prompts only in the scheduler

Rejected because scheduler text becomes an unreviewed hidden policy layer and drifts from project/Harness sources.

## Consequences

Positive:
- users can configure Harness through natural dialogue;
- new and existing projects share one setup path;
- requirements/North Star/strategy become project-owned and reviewable;
- automation prompt changes become source-controlled;
- existing discovery/authority/lifecycle semantics are reused;
- later evidence can improve user-selected strategy without silently overriding the user.

Costs:
- setup quality depends on current project-state restoration and question selection;
- public projects may require runtime-only private parameters to stay outside project files;
- the setup protocol must remain small and avoid accumulating every domain's onboarding question;
- change recommendations need deduplication so rejected/unchanged advice does not become recurring noise.

## Validation

The first canary should configure a small neutral project from a rough goal and separately retrofit an existing project without duplicating its current guidance. Verify that another session can restore the resulting project state and continue without the original interview transcript.

A later canary should also change a material assumption after an explicit user decision, verify that the assistant recommends a revision with consequences, preserves the current decision until authorization, and does not repeat a rejected recommendation without materially new evidence.