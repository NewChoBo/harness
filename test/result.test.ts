import { describe, expect, it } from 'vitest';

import { validateResultDocument } from '../src/index.js';

describe('result evidence validation', () => {
  it('accepts a completed result with exact SHA and passed validation', async () => {
    const issues = await validateResultDocument({
      schema_version: 1,
      workflow_id: 'example',
      status: 'complete',
      evidence: {
        candidate_sha: 'abcdef1234567',
        validations: [{ name: 'unit', status: 'passed' }],
      },
    });
    expect(issues).toEqual([]);
  });

  it('rejects a completed result without validation evidence', async () => {
    const issues = await validateResultDocument({
      schema_version: 1,
      workflow_id: 'example',
      status: 'complete',
      evidence: { candidate_sha: 'abcdef1234567' },
    });
    expect(issues.map((item) => item.code)).toContain('RESULT_SCHEMA_INVALID');
  });

  it('rejects review evidence for a different candidate SHA', async () => {
    const issues = await validateResultDocument({
      schema_version: 1,
      workflow_id: 'example',
      status: 'reviewed',
      evidence: {
        candidate_sha: 'abcdef1234567',
        review: {
          candidate_sha: 'fedcba7654321',
          reviewer_id: 'reviewer',
          outcome: 'passed',
        },
      },
    });
    expect(issues.map((item) => item.code)).toContain('REVIEW_SHA_MISMATCH');
  });
});
