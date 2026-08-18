# 0013 — Repository-owned Scheduled Task bindings are durable product metadata

Status: proposed

## Context

Physical Scheduled Task prompts previously carried too much policy and could drift from repository truth. During public-repository migration, a missing or moved binding was also misread as something to reconstruct or clean up, creating repeated add/remove churn around automation files.

The public Harness needs a stable repository-owned bootstrap path while keeping detailed behavior in canonical Standard resources.

## Decision

- `.newchobo/harness/` is the public repository-local metadata namespace owned by NewChoBo Harness;
- `.newchobo/harness/scheduled-task-bindings.md` is the required thin bootstrap projection for standard Scheduled Task roles;
- `protocol/automation-operation` owns reusable scheduled-execution, branch lifecycle, trusted-ref, recovery/reporting, and binding-migration semantics;
- physical scheduler prompts contain only repository/ref/prompt-source pointers plus genuinely runtime-only values;
- deleting or moving the binding path is a material migration, not routine cleanup;
- validation must fail if the required binding or role sections disappear;
- missing/moved control sources fail closed and are never reconstructed from memory, archives, previous repository generations, or old scheduler text;
- private consumer/domain state remains outside the public repository.

## Consequences

The binding path becomes stable enough for scheduler pointers while detailed automation rules can evolve through Standard resources without prompt duplication. Cleanup automation gains an explicit ownership signal and regression tests prevent accidental removal from being accepted as a valid candidate.

The cost is that a future intentional path migration must update repository docs/tests, canonical protocol references, and physical scheduler pointers in one governed change.
