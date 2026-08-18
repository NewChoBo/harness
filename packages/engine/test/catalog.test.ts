import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

import {
  HarnessError,
  resolveCatalogResources,
  validateCatalogFile,
} from '../src/index.js';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');

test('validates the adopted repository Standard catalog', async () => {
  const issues = await validateCatalogFile('standard/catalog.yaml', { rootDir: repoRoot });
  assert.deepEqual(issues, []);
});

test('resolves requested resource ids deterministically with provenance', async () => {
  const resources = await resolveCatalogResources(
    'standard/catalog.yaml',
    ['protocol/control-cycle', 'role/worker'],
    { rootDir: repoRoot },
  );

  assert.deepEqual(
    resources.map((item) => item.id),
    ['protocol/control-cycle', 'role/worker'],
  );
  assert.equal(resources[0]?.path, 'standard/protocols/control-cycle.md');
  assert.ok(resources[0]?.provenance.includes('docs/decisions/0002-supervisor-control-first.md'));
});

test('rejects a canonical resource path that lexically escapes the configured root', async () => {
  await withTempRoot(async (root) => {
    await writeFile(join(root, 'catalog.yaml'), catalogYaml([{ id: 'role/x', path: '../outside.md' }]));
    const issues = await validateCatalogFile('catalog.yaml', { rootDir: root });
    assert.ok(issues.some((item) => item.code === 'PATH_ESCAPE'));
  });
});

test(
  'rejects a resource symlink that resolves outside the configured root',
  { skip: process.platform === 'win32' },
  async () => {
    const outside = await mkdtemp(join(tmpdir(), 'newchobo-harness-outside-'));
    try {
      await writeFile(join(outside, 'resource.md'), '# outside\n');
      await withTempRoot(async (root) => {
        await symlink(join(outside, 'resource.md'), join(root, 'external.md'));
        await writeFile(
          join(root, 'catalog.yaml'),
          catalogYaml([{ id: 'role/x', path: 'external.md' }]),
        );
        const issues = await validateCatalogFile('catalog.yaml', { rootDir: root });
        assert.ok(issues.some((item) => item.code === 'PATH_ESCAPE'));
      });
    } finally {
      await rm(outside, { recursive: true, force: true });
    }
  },
);

test(
  'still rejects an existing resource symlink escape when missing-path reporting is disabled',
  { skip: process.platform === 'win32' },
  async () => {
    const outside = await mkdtemp(join(tmpdir(), 'newchobo-harness-optional-outside-'));
    try {
      await writeFile(join(outside, 'resource.md'), '# outside\n');
      await withTempRoot(async (root) => {
        await symlink(join(outside, 'resource.md'), join(root, 'external.md'));
        await writeFile(
          join(root, 'catalog.yaml'),
          catalogYaml([{ id: 'role/x', path: 'external.md' }]),
        );
        const issues = await validateCatalogFile('catalog.yaml', {
          rootDir: root,
          verifyResourcePaths: false,
        });
        assert.ok(issues.some((item) => item.code === 'PATH_ESCAPE'));
      });
    } finally {
      await rm(outside, { recursive: true, force: true });
    }
  },
);

test('allows a missing resource path when missing-path reporting is disabled', async () => {
  await withTempRoot(async (root) => {
    await writeFile(join(root, 'catalog.yaml'), catalogYaml([{ id: 'role/x', path: 'missing.md' }]));
    const issues = await validateCatalogFile('catalog.yaml', {
      rootDir: root,
      verifyResourcePaths: false,
    });
    assert.deepEqual(issues, []);
  });
});

test(
  'rejects a catalog symlink that resolves outside the configured root',
  { skip: process.platform === 'win32' },
  async () => {
    const outside = await mkdtemp(join(tmpdir(), 'newchobo-harness-catalog-outside-'));
    try {
      await writeFile(join(outside, 'catalog.yaml'), catalogYaml([]));
      await withTempRoot(async (root) => {
        await symlink(join(outside, 'catalog.yaml'), join(root, 'catalog-link.yaml'));
        const issues = await validateCatalogFile('catalog-link.yaml', { rootDir: root });
        assert.ok(issues.some((item) => item.code === 'PATH_ESCAPE'));
      });
    } finally {
      await rm(outside, { recursive: true, force: true });
    }
  },
);

test('rejects an unsupported catalog apiVersion', async () => {
  await withTempRoot(async (root) => {
    await writeFile(join(root, 'catalog.yaml'), catalogYaml([], 'harness.example/v2'));
    const issues = await validateCatalogFile('catalog.yaml', { rootDir: root });
    assert.ok(issues.some((item) => item.code === 'CATALOG_API_VERSION_UNSUPPORTED'));
  });
});

test('reports duplicate catalog resource ids', async () => {
  await withTempRoot(async (root) => {
    await mkdir(join(root, 'resources'));
    await writeFile(join(root, 'resources', 'x.md'), '# x\n');
    await writeFile(
      join(root, 'catalog.yaml'),
      catalogYaml([
        { id: 'role/x', path: 'resources/x.md' },
        { id: 'role/x', path: 'resources/x.md' },
      ]),
    );
    const issues = await validateCatalogFile('catalog.yaml', { rootDir: root });
    assert.ok(issues.some((item) => item.code === 'CATALOG_RESOURCE_ID_DUPLICATE'));
  });
});

test('reports a missing canonical resource path', async () => {
  await withTempRoot(async (root) => {
    await writeFile(join(root, 'catalog.yaml'), catalogYaml([{ id: 'role/x', path: 'missing.md' }]));
    const issues = await validateCatalogFile('catalog.yaml', { rootDir: root });
    assert.ok(issues.some((item) => item.code === 'RESOURCE_PATH_NOT_FOUND'));
  });
});

test('fails closed when resolving an unknown resource id', async () => {
  await assert.rejects(
    resolveCatalogResources('standard/catalog.yaml', ['role/not-present'], { rootDir: repoRoot }),
    (error: unknown) => error instanceof HarnessError && error.code === 'RESOURCE_ID_NOT_FOUND',
  );
});

async function withTempRoot(run: (root: string) => Promise<void>): Promise<void> {
  const root = await mkdtemp(join(tmpdir(), 'newchobo-harness-'));
  try {
    await run(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

function catalogYaml(
  resources: Array<{ id: string; path: string }>,
  apiVersion = 'harness.example/v1alpha1',
): string {
  const resourceText = resources
    .map(
      (resource) =>
        `    - id: ${resource.id}\n      kind: AgentRole\n      path: ${resource.path}\n      representation: narrative`,
    )
    .join('\n');

  return `apiVersion: ${apiVersion}\nkind: HarnessCatalog\nmetadata:\n  name: test\nspec:\n  canonicality:\n    scope: test\n    behaviorSource: referenced-resource\n  resources:\n${resourceText}\n`;
}
