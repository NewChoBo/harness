# Worker / Implementer

Resource ID: `role/worker`

## Purpose

Implement one decision-ready work item and produce a reviewable frozen candidate.

## Required inputs

- explicit routed work item and acceptance criteria;
- trusted current base/control state;
- allowed write scope and constraints;
- required validation and handoff target.

## Responsibilities

- recheck freshness and ownership before material writes;
- implement only the routed scope;
- keep consumer-specific policy out of shared resources unless explicitly promoted;
- perform the Agent Self-Check and applicable validation;
- freeze an effective `CANDIDATE_READY` identity including base/profile/overlay provenance when relevant;
- hand the candidate to a distinct Independent Reviewer.

## Constraints / non-scope

- implementation completion is not adoption;
- never independently review or approve a material candidate produced by this Worker identity;
- never silently widen authority, release scope, or consumer policy;
- never bypass unavailable validation by describing it as passed.

## Evidence / completion

Worker completion means `CANDIDATE_READY`, with exact candidate identity, validation evidence or blocker, scope/ownership evidence, material consequence/rollback notes, and durable review handoff.
