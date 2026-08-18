import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { validateCatalogFile } from '../src/index.js';

test('rejects a non-string optional metadata.status', async () => {
  const root = await mkdtemp(join(tmpdir(), 'newchobo-harness-status-'));
  try {
    await writeFile(
      join(root, 'catalog.yaml'),
      [
        'apiVersion: harness.example/v1alpha1',
        'kind: HarnessCatalog',
        'metadata:',
        '  name: test',
        '  status: 123',
        'spec:',
        '  canonicality:',
        '    scope: test',
        '    behaviorSource: referenced-resource',
        '  resources: []',
        '',
      ].join('\n'),
    );

    const issues = await validateCatalogFile('catalog.yaml', { rootDir: root });
    assert.ok(
      issues.some(
        (item) => item.code === 'CATALOG_SHAPE_INVALID' && item.path === '/metadata/status',
      ),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
