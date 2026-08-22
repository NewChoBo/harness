import type { SecurityTransitionBlockReason, SecurityTransitionRequest } from '../../src/index.js';

export interface AdversarialSecurityFixture {
  id: string;
  expectedReason: SecurityTransitionBlockReason;
  request: SecurityTransitionRequest;
}

const untrustedDirect = {
  origin: 'UNTRUSTED_EXTERNAL',
  derivation: 'DIRECT',
} as const;

const untrustedNormalized = {
  origin: 'UNTRUSTED_EXTERNAL',
  derivation: 'NORMALIZED',
} as const;

const untrustedSummarized = {
  origin: 'UNTRUSTED_EXTERNAL',
  derivation: 'SUMMARIZED',
} as const;

const authorizedSideEffect: SecurityTransitionRequest = {
  transition: 'SIDE_EFFECTING_TOOL_ACTION',
  provenance: untrustedDirect,
  authorityGranted: true,
  targetInScope: true,
  routedWorkMatches: true,
  evidenceCurrent: true,
  independentlyCorroborated: false,
  reauthorized: false,
};

export const adversarialSecurityFixtures: readonly AdversarialSecurityFixture[] = [
  {
    id: 'direct-instruction-override',
    expectedReason: 'INDEPENDENT_CORROBORATION_REQUIRED',
    request: authorizedSideEffect,
  },
  {
    id: 'indirect-retrieved-community-injection',
    expectedReason: 'INDEPENDENT_CORROBORATION_REQUIRED',
    request: { ...authorizedSideEffect, provenance: untrustedNormalized },
  },
  {
    id: 'tool-response-poisoning',
    expectedReason: 'REAUTHORIZATION_REQUIRED',
    request: {
      ...authorizedSideEffect,
      provenance: untrustedSummarized,
      independentlyCorroborated: true,
    },
  },
  {
    id: 'durable-memory-poisoning',
    expectedReason: 'DURABLE_MEMORY_WRITE_NOT_APPROVED',
    request: {
      ...authorizedSideEffect,
      transition: 'DURABLE_TRUSTED_MEMORY_WRITE',
      independentlyCorroborated: true,
      reauthorized: true,
      durableMemoryWriteApproved: false,
    },
  },
  {
    id: 'cross-agent-authority-laundering',
    expectedReason: 'SENDER_AUTHORITY_NOT_VERIFIED',
    request: {
      ...authorizedSideEffect,
      transition: 'INTER_AGENT_ACTION_HANDOFF',
      independentlyCorroborated: true,
      reauthorized: true,
      senderAuthorityVerified: false,
    },
  },
  {
    id: 'benign-read-to-privileged-export',
    expectedReason: 'DISCLOSURE_NOT_PUBLIC_SAFE',
    request: {
      ...authorizedSideEffect,
      transition: 'EXTERNAL_EGRESS',
      independentlyCorroborated: true,
      reauthorized: true,
      disclosureStatus: 'UNKNOWN',
    },
  },
  {
    id: 'stale-or-corrupted-evidence',
    expectedReason: 'EVIDENCE_NOT_CURRENT',
    request: {
      ...authorizedSideEffect,
      provenance: { origin: 'TRUSTED_INTERNAL_DATA', derivation: 'DIRECT' },
      evidenceCurrent: false,
    },
  },
  {
    id: 'compromised-tool-description',
    expectedReason: 'INDEPENDENT_CORROBORATION_REQUIRED',
    request: { ...authorizedSideEffect, provenance: untrustedDirect },
  },
  {
    id: 'correlated-sources-are-not-independent-authority',
    expectedReason: 'INDEPENDENT_CORROBORATION_REQUIRED',
    request: {
      ...authorizedSideEffect,
      independentlyCorroborated: false,
    },
  },
  {
    id: 'normalized-input-retains-untrusted-origin',
    expectedReason: 'INDEPENDENT_CORROBORATION_REQUIRED',
    request: { ...authorizedSideEffect, provenance: untrustedNormalized },
  },
  {
    id: 'external-community-policy-document-injection',
    expectedReason: 'INDEPENDENT_CORROBORATION_REQUIRED',
    request: { ...authorizedSideEffect, provenance: untrustedSummarized },
  },
  {
    id: 'authority-looking-source-spoofing',
    expectedReason: 'AUTHORITY_REQUIRED',
    request: {
      ...authorizedSideEffect,
      authorityGranted: false,
    },
  },
  {
    id: 'target-expansion-outside-delegated-scope',
    expectedReason: 'TARGET_OUT_OF_SCOPE',
    request: {
      ...authorizedSideEffect,
      provenance: { origin: 'TRUSTED_CONTROL', derivation: 'DIRECT' },
      targetInScope: false,
    },
  },
  {
    id: 'observable-plan-drift-from-routed-work',
    expectedReason: 'ROUTED_WORK_MISMATCH',
    request: {
      ...authorizedSideEffect,
      provenance: { origin: 'TRUSTED_CONTROL', derivation: 'DIRECT' },
      routedWorkMatches: false,
    },
  },
] as const;
