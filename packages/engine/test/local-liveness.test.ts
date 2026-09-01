import assert from 'node:assert/strict';
import test from 'node:test';

import {
  LOCAL_LIVENESS_REASON,
  LOCAL_LIVENESS_STATE,
  classifyLocalLiveness,
} from '../src/local-liveness.js';

test('confirmed no current expectation is idle, not unknown', () => {
  assert.deepEqual(
    classifyLocalLiveness({
      kind: 'confirmed-none',
      source: 'authoritative-expectation-registry',
      currentnessVerified: true,
    }),
    {
      state: LOCAL_LIVENESS_STATE.IDLE,
      reason: LOCAL_LIVENESS_REASON.NO_EXPECTED_PULSE,
    },
  );
});

test('an overdue exact expectation with no checkpoint is no-signal', () => {
  assert.deepEqual(
    classifyLocalLiveness({
      kind: 'expected',
      identity: 'run-42',
      expectationSource: 'durable-run-expectation',
      observerSource: 'independent-observer',
      observationWindowClosed: true,
      checkpointObserved: false,
    }),
    {
      state: LOCAL_LIVENESS_STATE.NO_SIGNAL,
      reason: LOCAL_LIVENESS_REASON.RECONCILIATION_REQUIRED,
    },
  );
});

test('unavailable expectation source remains unknown', () => {
  assert.deepEqual(
    classifyLocalLiveness({
      kind: 'unverifiable',
      missing: 'EXPECTATION_SOURCE',
    }),
    {
      state: LOCAL_LIVENESS_STATE.UNKNOWN,
      reason: LOCAL_LIVENESS_REASON.NEEDS_EVIDENCE,
      missing: 'EXPECTATION_SOURCE',
    },
  );
});

test('unavailable observer remains unknown', () => {
  assert.deepEqual(
    classifyLocalLiveness({
      kind: 'unverifiable',
      missing: 'OBSERVER_SOURCE',
    }),
    {
      state: LOCAL_LIVENESS_STATE.UNKNOWN,
      reason: LOCAL_LIVENESS_REASON.NEEDS_EVIDENCE,
      missing: 'OBSERVER_SOURCE',
    },
  );
});

test('an exact expectation still inside its window is not no-signal', () => {
  assert.deepEqual(
    classifyLocalLiveness({
      kind: 'expected',
      identity: 'run-42',
      expectationSource: 'durable-run-expectation',
      observerSource: 'independent-observer',
      observationWindowClosed: false,
      checkpointObserved: false,
    }),
    {
      state: LOCAL_LIVENESS_STATE.EXPECTED,
      reason: LOCAL_LIVENESS_REASON.EXPECTATION_ACTIVE,
    },
  );
});
