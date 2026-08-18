import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

import { syncHarness } from '../src/index.js';

const root = fileURLToPath(new URL('..', import.meta.url));

describe('exact-version consumer sync', () => {
  it('vendors standard assets and writes an integrity lock', async () => {
    const target = await mkdtemp(join(tmpdir(), 'agent-harness-consumer-'));
    const result = await syncHarness(target, root);
    const lock = parse(await readFile(result.lockPath, 'utf8')) as any;

    expect(result.version).toBe('0.1.0-alpha.0');
    expect(result.integrity).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(lock.harness.version).toBe(result.version);
    expect(lock.harness.integrity).toBe(result.integrity);
    await expect(
      readFile(join(result.vendorPath, 'standard', 'presets', 'base-supervisor.yaml'), 'utf8'),
    ).resolves.toContain('base-supervisor');
  });
});
