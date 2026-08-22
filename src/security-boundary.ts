export type IntegrityOrigin =
  'TRUSTED_CONTROL' | 'TRUSTED_INTERNAL_DATA' | 'UNTRUSTED_EXTERNAL' | 'UNKNOWN';

export type IntegrityDerivation = 'DIRECT' | 'NORMALIZED' | 'SUMMARIZED';

export interface SecurityProvenance {
  origin: IntegrityOrigin;
  derivation: IntegrityDerivation;
}

export type SensitiveTransition =
  | 'SIDE_EFFECTING_TOOL_ACTION'
  | 'DURABLE_TRUSTED_MEMORY_WRITE'
  | 'INTER_AGENT_ACTION_HANDOFF'
  | 'EXTERNAL_EGRESS';

export type DisclosureStatus = 'PUBLIC_SAFE' | 'NON_PUBLIC' | 'UNKNOWN';

export interface SecurityTransitionRequest {
  transition: SensitiveTransition;
  provenance: Readonly<SecurityProvenance>;
  authorityGranted: boolean;
  targetInScope: boolean;
  routedWorkMatches: boolean;
  evidenceCurrent: boolean;
  independentlyCorroborated: boolean;
  reauthorized: boolean;
  disclosureStatus?: DisclosureStatus;
  durableMemoryWriteApproved?: boolean;
  senderAuthorityVerified?: boolean;
}

export type SecurityTransitionBlockReason =
  | 'AUTHORITY_REQUIRED'
  | 'TARGET_OUT_OF_SCOPE'
  | 'ROUTED_WORK_MISMATCH'
  | 'EVIDENCE_NOT_CURRENT'
  | 'UNKNOWN_INTEGRITY'
  | 'INDEPENDENT_CORROBORATION_REQUIRED'
  | 'REAUTHORIZATION_REQUIRED'
  | 'DURABLE_MEMORY_WRITE_NOT_APPROVED'
  | 'SENDER_AUTHORITY_NOT_VERIFIED'
  | 'DISCLOSURE_NOT_PUBLIC_SAFE';

export type SecurityTransitionDecision =
  | {
      allowed: true;
      outcome: 'ALLOWED';
      reason: 'ALL_REQUIRED_GATES_SATISFIED';
      provenance: Readonly<SecurityProvenance>;
    }
  | {
      allowed: false;
      outcome: 'ACTION_DENIED' | 'EGRESS_BLOCKED';
      reason: SecurityTransitionBlockReason;
      provenance: Readonly<SecurityProvenance>;
    };

export function evaluateSecurityTransition(
  request: Readonly<SecurityTransitionRequest>,
): SecurityTransitionDecision {
  const deny = (reason: SecurityTransitionBlockReason): SecurityTransitionDecision => ({
    allowed: false,
    outcome: request.transition === 'EXTERNAL_EGRESS' ? 'EGRESS_BLOCKED' : 'ACTION_DENIED',
    reason,
    provenance: { ...request.provenance },
  });

  if (!request.authorityGranted) return deny('AUTHORITY_REQUIRED');
  if (!request.targetInScope) return deny('TARGET_OUT_OF_SCOPE');
  if (!request.routedWorkMatches) return deny('ROUTED_WORK_MISMATCH');
  if (!request.evidenceCurrent) return deny('EVIDENCE_NOT_CURRENT');

  if (request.provenance.origin === 'UNKNOWN') return deny('UNKNOWN_INTEGRITY');

  if (request.provenance.origin === 'UNTRUSTED_EXTERNAL') {
    if (!request.independentlyCorroborated) {
      return deny('INDEPENDENT_CORROBORATION_REQUIRED');
    }
    if (!request.reauthorized) return deny('REAUTHORIZATION_REQUIRED');
  }

  if (
    request.transition === 'DURABLE_TRUSTED_MEMORY_WRITE' &&
    request.durableMemoryWriteApproved !== true
  ) {
    return deny('DURABLE_MEMORY_WRITE_NOT_APPROVED');
  }

  if (
    request.transition === 'INTER_AGENT_ACTION_HANDOFF' &&
    request.senderAuthorityVerified !== true
  ) {
    return deny('SENDER_AUTHORITY_NOT_VERIFIED');
  }

  if (request.transition === 'EXTERNAL_EGRESS' && request.disclosureStatus !== 'PUBLIC_SAFE') {
    return deny('DISCLOSURE_NOT_PUBLIC_SAFE');
  }

  return {
    allowed: true,
    outcome: 'ALLOWED',
    reason: 'ALL_REQUIRED_GATES_SATISFIED',
    provenance: { ...request.provenance },
  };
}
