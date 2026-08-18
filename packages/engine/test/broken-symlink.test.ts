import assert from 'node:assert/strict';
import { mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { validateCatalogFile } from '../src/index.js';

test(
  'fails closed on a broken symlink ancestor when the final resource path is missing',
  { skip: process.platform === 'win32' },
  async () => {
    const root = await mkdtemp(join(tmpdir(), 'newchobo-harness-root-'));
    const outside = await mkdtemp(join(tmpdir(), 'newchobo-harness-outside-'));

    try {
      await symlink(join(outside, 'nonexistent-target'), join(root, 'external'));
      await writeFile(
        join(root, 'catalog.yaml'),
        [
          'apiVersion: harness.example/v1alpha1',
          'kind: HarnessCatalog',
          'metadata:',
          '  name: test',
          'spec:',
          '  canonicality:',
          '    scope: test',
          '    behaviorSource: referenced-resource',
          '  resources:',
          '    - id: role/x',
          '      kind: AgentRole',
          '      path: external/missing.md',
          '      representation: narrative',
          '',
        ].join('\n'),
      );

      const issues = await validateCatalogFile('catalog.yaml', {
        rootDir: root,
        verifyResourcePaths: false,
      });

      assert.ok(issues.some((item) => item.code === 'PATH_SYMLINK_UNRESOLVED'));
    } finally {
      await rm(root, { recursive: true, force: true });
      await rm(outside, { recursive: true, force: true });
    }
  },
);
