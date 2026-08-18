# PRE_ADOPTION_REVIEW Checklist

Resource ID: `checklist/pre-adoption-review`

For a frozen material candidate, verify:

- reviewer is independent from the Producer/Worker;
- effective candidate identity is exact and current, including base/profile/overlay/provenance when relevant;
- original approved goal/scope still matches the final result;
- exact diff/resources and actual validation evidence were inspected;
- prior findings are resolved on this candidate, not merely on an ancestor;
- new drawbacks, side effects, regressions, complexity, and maintenance cost were reassessed;
- interoperability/open-source/consumer impact remains acceptable;
- rollback/falsifier is credible where material;
- Decision Safety and mutation authority are valid;
- self-role/authority changes route to a higher adopter;
- structured resources remain declarative and do not introduce DSL creep;
- canonical representation/provenance is unambiguous and no dual source of truth exists;
- when an adaptive effort/depth profile governed production or review, total/stage envelope and pass limits were truthful, finite, provider-neutral, and did not starve required validation/handoff;
- any configured floor/minimum was treated as a quality/attention target rather than a busywork or artificial-waiting requirement;
- target effort/pass count was treated as a reassessment/normal-stop boundary, not a utilization goal; work beyond target had a concrete material continuation reason rather than merely remaining budget or unused max passes;
- ceiling/max was treated as a safety stop boundary: optional new work was not started at/after the boundary, and incomplete required validation remained explicitly incomplete/blocked instead of causing indefinite extension or false PASS;
- repeated passes consumed residual/delta work, and the candidate shows a credible convergence/replan rule rather than blind `N`-repeat behavior;
- optional research/review/refactor/polish was subject to a marginal-value gate; unchanged-candidate review, repeated findings, source accumulation without decision impact, adjacent refactor creep, or shrinking pass delta did not continue merely to consume capacity;
- execution depth used the shallowest credible profile and could narrow as risk/uncertainty fell; `DEEP`/`HIGH_RISK` was not treated as inherently better simply because more effort was available;
- when a ceiling/max/budget boundary left material work unresolved, the producer did not automatically schedule the same approach again: normal resumable-slice exits were distinguished from repeated/non-converging diagnostic exits;
- diagnostic limit exits were proportionally checked for decomposition/approach/dependency/evidence/capability/ownership/validation/state/guidance/topology/provider/policy causes and mapped to existing classifications where possible rather than creating timeout taxonomy for its own sake;
- limit-related Issue/comment creation was evidence-gated and deduplicated: one bounded stop alone did not create a work item, existing owners were restored first, and repeated automation did not emit duplicate Issues/comments for the same target + stable blocker/failure signature;
- cross-scope, systemic, shared-Harness, repeated architectural, ownership/authority, or reserved-decision causes were routed to the Supervisor/applicable higher agent instead of being hidden inside endless same-owner retries;
- Critical/Falsification and Preservation/Constructive perspectives were both applied when required by the effective profile, with synthesis preserving successful behavior while still surfacing material defects/alternatives;
- a completed dual-lens cycle with no material actionable delta did not trigger repeated first-party review of an unchanged candidate/evidence set without a new material purpose;
- dual-lens producer/self-review was not misrepresented as this formal Independent Review;
- unresolved material findings at a max pass/effort boundary remained blocked/revision-required instead of being converted into PASS;
- when `protocol/execution-outcome-receipt` applies, the candidate has one canonical receipt semantic source rather than competing field definitions across checkpoint/control/example surfaces;
- an outcome receipt is exact-subject evidence/provenance only: persistence does not grant authority, prove independent review, authorize adoption/publication, or automatically establish effect;
- receipt truthfulness preserves unavailable/unknown evidence: missing clock/target/ceiling/pass/validation evidence is not rewritten as `false`, `0`, an invented value, or PASS;
- receipt terminal lifecycle state is distinct from bounded stop reason, and `SLICE_COMPLETE`/residual material work cannot be confused with whole-work completion;
- `LIMIT_REACHED_RESUMABLE` is used only for a known resumable next slice with continuing material progress, while repeated/non-converging evidence uses `LIMIT_REACHED_DIAGNOSIS_REQUIRED` before identical retry;
- blocker fingerprints are bounded deduplication evidence and do not automatically create Issues, escalation, authority, or trust;
- first selected canary receipt obligations remain bounded: one durable proof may be required even for `NO_ACTION`, but unchanged later `NO_ACTION` runs remain noise-free unless a material delta/effect sample requires another receipt;
- receipt persistence excludes raw prompts/transcripts, private chain-of-thought, secrets, unnecessary consumer-private content, and high-cardinality debug traces;
- any self-authored receipt claim that materially supports review/effect/adoption is treated according to its actual trust/provenance and receives independent/tool/provider corroboration where the downstream claim requires it;
- shared/public artifacts contain no consumer-private policy, project-specific confidential knowledge, personal/sensitive data, credentials/secrets, private identifiers, or private operational evidence;
- any private evidence used to justify a shared rule is abstracted/minimized so the shared artifact does not disclose the underlying sensitive content;
- reserved root/high-risk boundaries are correctly routed.

Only then issue `REVIEW_PASSED`. PASS is eligibility for adoption consideration, not adoption.
