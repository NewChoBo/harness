export const LOCAL_LIVENESS_STATE = {
  IDLE: 'LOCAL_OFFLINE_OR_IDLE',
  UNKNOWN: 'UNKNOWN',
  NO_SIGNAL: 'NO_SIGNAL',
  EXPECTED: 'EXPECTED_EXECUTION',
} as const;

export const LOCAL_LIVENESS_REASON = {
  NO_EXPECTED_PULSE: 'NO_EXPECTED_PULSE',
  NEEDS_EVIDENCE: 'NEEDS_EVIDENCE',
  RECONCILIATION_REQUIRED: 'RECONCILIATION_REQUIRED',
  EXPECTATION_ACTIVE: 'EXPECTATION_ACTIVE',
} as const;

export type LocalLivenessMissingEvidence =
  | 'EXPECTATION_IDENTITY'
  | 'EXPECTATION_CURRENTNESS'
  | 'EXPECTATION_SOURCE'
  | 'OBSERVER_SOURCE'
  | 'OBSERVATION_WINDOW';

export type LocalExecutionExpectation =
  | {
      kind: 'confirmed-none';
      source: string;
      currentnessVerified: true;
    }
  | {
      kind: 'unverifiable';
      missing: LocalLivenessMissingEvidence;
    }
  | {
      kind: 'expected';
      identity: string;
      expectationSource: string;
      observerSource: string;
      observationWindowClosed: boolean;
      checkpointObserved: boolean;
    };

export type LocalLivenessVerdict =
  | {
      state: typeof LOCAL_LIVENESS_STATE.IDLE;
      reason: typeof LOCAL_LIVENESS_REASON.NO_EXPECTED_PULSE;
    }
  | {
      state: typeof LOCAL_LIVENESS_STATE.UNKNOWN;
      reason: typeof LOCAL_LIVENESS_REASON.NEEDS_EVIDENCE;
      missing: LocalLivenessMissingEvidence;
    }
  | {
      state: typeof LOCAL_LIVENESS_STATE.NO_SIGNAL;
      reason: typeof LOCAL_LIVENESS_REASON.RECONCILIATION_REQUIRED;
    }
  | {
      state: typeof LOCAL_LIVENESS_STATE.EXPECTED;
      reason: typeof LOCAL_LIVENESS_REASON.EXPECTATION_ACTIVE;
    };

/**
 * Classify local-agent liveness from evidence that has already been gathered by
 * the caller. In particular, absence of a complete positive expectation operand
 * is not evidence that no expectation exists: callers must provide the
 * `confirmed-none` variant only after an authoritative/current source has
 * affirmatively established that fact.
 */
export function classifyLocalLiveness(
  expectation: LocalExecutionExpectation,
): LocalLivenessVerdict {
  switch (expectation.kind) {
    case 'confirmed-none':
      return {
        state: LOCAL_LIVENESS_STATE.IDLE,
        reason: LOCAL_LIVENESS_REASON.NO_EXPECTED_PULSE,
      };
    case 'unverifiable':
      return {
        state: LOCAL_LIVENESS_STATE.UNKNOWN,
        reason: LOCAL_LIVENESS_REASON.NEEDS_EVIDENCE,
        missing: expectation.missing,
      };
    case 'expected':
      if (expectation.observationWindowClosed && !expectation.checkpointObserved) {
        return {
          state: LOCAL_LIVENESS_STATE.NO_SIGNAL,
          reason: LOCAL_LIVENESS_REASON.RECONCILIATION_REQUIRED,
        };
      }

      return {
        state: LOCAL_LIVENESS_STATE.EXPECTED,
        reason: LOCAL_LIVENESS_REASON.EXPECTATION_ACTIVE,
      };
  }
}
