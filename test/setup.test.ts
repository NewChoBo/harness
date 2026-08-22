import { access, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

import {
  setupHarnessProject,
  validateHarnessBundleManifest,
  validateProjectHarnessBinding,
} from '../src/index.js';

const root = fileURLToPath(new URL('..', import.meta.url));

describe('portable Harness setup', () => {
  it('installs one exact bundle and preserves provider instruction files', async () => {
    const target = await mkdtemp(join(tmpdir(), 'agent-harness-setup-'));
    const agentsPath = join(target, 'AGENTS.md');
    await writeFile(agentsPath, '# Existing project rules\n', 'utf8');

    const first = await setupHarnessProject({
      targetRoot: target,
      sourceRoot: root,
      providers: ['codex', 'claude_code'],
    });
    const binding = parse(await readFile(first.bindingPath, 'utf8')) as unknown;
    const agentsAfterFirst = await readFile(agentsPath, 'utf8');

    expect(validateProjectHarnessBinding(binding)).toEqual([]);
    expect(binding).toMatchObject({
      schema_version: 1,
      kind: 'project_harness_binding',
      providers: ['codex', 'claude_code'],
      base: {
        name: '@newchobo/harness',
        version: '0.1.0-alpha.0',
      },
    });
    expect(agentsAfterFirst).toContain('# Existing project rules');
    expect(agentsAfterFirst.match(/agent-harness:managed-start/gu)).toHaveLength(1);
    await expect(readFile(join(target, 'CLAUDE.md'), 'utf8')).resolves.toContain(
      '.newchobo/automation/harness.yaml',
    );
    await expect(
      readFile(join(target, '.github', 'copilot-instructions.md'), 'utf8'),
    ).rejects.toMatchObject({ code: 'ENOENT' });

    const second = await setupHarnessProject({
      targetRoot: target,
      sourceRoot: root,
      providers: ['codex', 'claude_code'],
    });
    expect(await readFile(agentsPath, 'utf8')).toBe(agentsAfterFirst);
    expect(second.integrity).toBe(first.integrity);
  });

  it('rejects escaping or duplicate bundle resource targets', () => {
    const issues = validateHarnessBundleManifest({
      $schema: './schemas/harness-bundle.schema.json',
      schema_version: 1,
      kind: 'harness_bundle',
      name: '@example/harness',
      version: '1.0.0',
      resources: [
        { source: '../private', target: 'standard' },
        { source: 'schemas', target: 'standard' },
      ],
      entrypoints: { catalog: 'standard/catalog.yaml' },
    });

    expect(issues.map((item) => item.code)).toEqual([
      'HARNESS_BUNDLE_PATH_INVALID',
      'HARNESS_BUNDLE_TARGET_DUPLICATE',
    ]);
  });

  it('rejects malformed provider markers before installing the bundle', async () => {
    const target = await mkdtemp(join(tmpdir(), 'agent-harness-setup-invalid-'));
    await writeFile(
      join(target, 'AGENTS.md'),
      '<!-- agent-harness:managed-start -->\nmissing end\n',
      'utf8',
    );

    await expect(
      setupHarnessProject({ targetRoot: target, sourceRoot: root, providers: ['codex'] }),
    ).rejects.toMatchObject({ code: 'SETUP_BOOTSTRAP_MARKER_INVALID' });
    await expect(access(join(target, '.newchobo'))).rejects.toMatchObject({ code: 'ENOENT' });
  });
});
