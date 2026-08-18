# Consumer Boundaries

Agent Harness is cross-domain. Shared artifacts define reusable workflow/governance semantics while each consumer keeps its own product, domain, repository, security, and operational policy local.

## Consumer-owned policy

Examples of information that normally remains in the consumer repository or private overlay:

- product/domain behavior and business rules;
- repository names, internal issue/branch identifiers, private coordination links, and infrastructure details;
- package/API/release ownership and validation commands;
- security/privacy constraints and credentials/secrets;
- proprietary architecture or implementation details that are not necessary for the shared contract;
- canon, content, style, user-data, customer-data, or other domain-specific knowledge;
- provider/account identifiers and private operational evidence.

The shared Harness should reference only the abstract capability or contract needed to compose the workflow.

## Shared promotion rule

A consumer rule may move into Agent Harness only when it can be described and validated without exposing consumer-specific names, confidential/domain facts, personal/sensitive information, private identifiers, credentials, or private evidence.

Private evidence may motivate a shared improvement, but the shared artifact records only the generalized finding and the minimum non-sensitive provenance needed for review.

When uncertain whether information is safe/shared, keep it local/private until reviewed.

## Example consumer classes

Neutral examples may represent classes such as:

- software library or platform repository;
- private product/host repository;
- content/media production repository;
- research or operations repository.

These examples describe ownership boundaries, not real consumer identities.

## Composition principle

```text
exact reviewed shared Harness base/resources
+ consumer-local project/domain overlay
+ task/lane overlay
+ consumer-local state
= effective workflow
```

Installed shared resources remain upstream-owned/read-only from the consumer perspective. Consumer-specific policy must not be copied into the shared base merely for convenience.
