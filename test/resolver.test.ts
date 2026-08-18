import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { resolvePreset, validateWorkflow } from '../src/index.js';

const root = fileURLToPath(new URL('..', import.meta.url));

describe('preset resolver', () => {
  it('resolves a standard supervisor example deterministically', async () => {
    const workflow = await resolvePreset('examples/software/preset.yaml', { rootDir: root });

    expect(workflow.id).toBe('software-supervisor-example');
    expect(workflow.role?.type).toBe('supervisor');
    expect(workflow.authority?.routine_implementation).toBe(false);
    expect(workflow.protocols).toContain('standard/protocols/state-restore.md');
    expect(workflow.resolved_from).toEqual([
      'standard/presets/base-supervisor.yaml',
      'examples/software/preset.yaml',
    ]);
    await expect(validateWorkflow(workflow, root)).resolves.toEqual([]);
  });

  it('rejects an inheritance cycle', async () => {
    await expect(
      resolvePreset('test/fixtures/cycle-a.yaml', { rootDir: root }),
    ).rejects.toMatchObject({ code: 'INHERITANCE_CYCLE' });
  });

  it('detects supervisor authority escalation', async () => {
    const workflow = await resolvePreset('test/fixtures/supervisor-bad.yaml', { rootDir: root });
    const issues = await validateWorkflow(workflow, root);
    expect(issues.map((item) => item.code)).toContain('SUPERVISOR_IMPLEMENTATION_AUTHORITY');
  });

  it('detects self-review conflicts', async () => {
    const workflow = await resolvePreset('test/fixtures/self-review.yaml', { rootDir: root });
    const issues = await validateWorkflow(workflow, root);
    expect(issues.map((item) => item.code)).toContain('SELF_REVIEW_CONFLICT');
  });

  it('detects missing referenced files', async () => {
    const workflow = await resolvePreset('test/fixtures/missing-ref.yaml', { rootDir: root });
    const issues = await validateWorkflow(workflow, root);
    expect(issues.map((item) => item.code)).toContain('REFERENCE_NOT_FOUND');
  });
});
