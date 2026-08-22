import { describe, expect, it } from 'vitest';

import { evaluateSecurityTransition, type SecurityTransitionRequest } from '../src/index.js';
import { adversarialSecurityFixtures } from './fixtures/agent-security-boundary.js';

describe('agent security transition boundary', () => {
  it.each(adversarialSecurityFixtures)('denies $id', ({ expectedReason, request }) => {
    const decision = evaluateSecurityTransition(request);

    expect(decision.allowed).toBe(false);
    expect(decision.reason).toBe(expectedReason);
    expect(decision.provenance).toEqual(request.provenance);
  });

  it('keeps covered unauthorized effects at zero', () => {
    const evaluated = adversarialSecurityFixtures.map(({ request }) => ({
      request,
      decision: evaluateSecurityTransition(request),
    }));

    const invariants = {
      unauthorizedPrivilegedActions: evaluated.filter(
        ({ request, decision }) =>
          request.transition === 'SIDE_EFFECTING_TOOL_ACTION' && decision.allowed,
      ).length,
      unauthorizedTrustedMemoryWrites: evaluated.filter(
        ({ request, decision }) =>
          request.transition === 'DURABLE_TRUSTED_MEMORY_WRITE' && decision.allowed,
      ).length,
      unauthorizedPrivateOrPublicDisclosure: evaluated.filter(
        ({ request, decision }) => request.transition === 'EXTERNAL_EGRESS' && decision.allowed,
      ).length,
      authorityExpansion: evaluated.filter(
        ({ request, decision }) =>
          (!request.authorityGranted || !request.targetInScope) && decision.allowed,
      ).length,
      securityStateFalsification: evaluated.filter(
        ({ request, decision }) =>
          decision.provenance.origin !== request.provenance.origin ||
          decision.provenance.derivation !== request.provenance.derivation,
      ).length,
    };

    expect(invariants).toEqual({
      unauthorizedPrivilegedActions: 0,
      unauthorizedTrustedMemoryWrites: 0,
      unauthorizedPrivateOrPublicDisclosure: 0,
      authorityExpansion: 0,
      securityStateFalsification: 0,
    });
  });

  it('requires ordinary authority and scope even after external evidence is corroborated', () => {
    const request = permittedExternalToolAction({ authorityGranted: false });

    expect(evaluateSecurityTransition(request)).toMatchObject({
      allowed: false,
      reason: 'AUTHORITY_REQUIRED',
    });
  });

  it('allows an external-influenced action only after independent corroboration and reauthorization', () => {
    expect(evaluateSecurityTransition(permittedExternalToolAction())).toMatchObject({
      allowed: true,
      reason: 'ALL_REQUIRED_GATES_SATISFIED',
      provenance: {
        origin: 'UNTRUSTED_EXTERNAL',
        derivation: 'SUMMARIZED',
      },
    });
  });

  it('fails closed for unknown integrity even with other gates satisfied', () => {
    const request = permittedExternalToolAction({
      provenance: { origin: 'UNKNOWN', derivation: 'NORMALIZED' },
    });

    expect(evaluateSecurityTransition(request)).toMatchObject({
      allowed: false,
      reason: 'UNKNOWN_INTEGRITY',
    });
  });

  it('composes with the existing disclosure owner for egress', () => {
    const request = permittedExternalToolAction({
      transition: 'EXTERNAL_EGRESS',
      disclosureStatus: 'NON_PUBLIC',
    });

    expect(evaluateSecurityTransition(request)).toMatchObject({
      allowed: false,
      outcome: 'EGRESS_BLOCKED',
      reason: 'DISCLOSURE_NOT_PUBLIC_SAFE',
    });
  });
});

function permittedExternalToolAction(
  overrides: Partial<SecurityTransitionRequest> = {},
): SecurityTransitionRequest {
  return {
    transition: 'SIDE_EFFECTING_TOOL_ACTION',
    provenance: { origin: 'UNTRUSTED_EXTERNAL', derivation: 'SUMMARIZED' },
    authorityGranted: true,
    targetInScope: true,
    routedWorkMatches: true,
    evidenceCurrent: true,
    independentlyCorroborated: true,
    reauthorized: true,
    ...overrides,
  };
}
