import { createHash } from 'node:crypto';
import { access, cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { stringify } from 'yaml';

import { HarnessConfigError } from './errors.js';
import { assertInsideRoot } from './paths.js';
import type { HarnessBundleManifest, SyncResult } from './types.js';
import { validateHarnessBundleManifest } from './validator.js';

interface PackageManifest {
  name: string;
  version: string;
}

export async function loadHarnessBundleManifest(
  sourceRoot = defaultHarnessRoot(),
): Promise<HarnessBundleManifest> {
  const manifestPath = join(resolve(sourceRoot), 'harness.bundle.json');
  const value = JSON.parse(await readFile(manifestPath, 'utf8')) as unknown;
  const issues = validateHarnessBundleManifest(value);
  if (issues.length > 0) {
    throw new HarnessConfigError(
      'HARNESS_BUNDLE_INVALID',
      issues.map((item) => `${item.path}: ${item.message}`).join('; '),
      manifestPath,
    );
  }
  return value as HarnessBundleManifest;
}

export async function installHarnessBundle(
  targetRoot: string,
  sourceRoot = defaultHarnessRoot(),
): Promise<SyncResult> {
  const source = resolve(sourceRoot);
  const target = resolve(targetRoot);
  const manifest = await loadHarnessBundleManifest(source);
  const packageManifest = JSON.parse(
    await readFile(join(source, 'package.json'), 'utf8'),
  ) as PackageManifest;

  if (manifest.name !== packageManifest.name || manifest.version !== packageManifest.version) {
    throw new HarnessConfigError(
      'HARNESS_BUNDLE_PACKAGE_MISMATCH',
      `Bundle ${manifest.name}@${manifest.version} does not match package ${packageManifest.name}@${packageManifest.version}.`,
      join(source, 'harness.bundle.json'),
    );
  }

  const vendorPath = assertInsideRoot(
    target,
    join(target, '.newchobo', 'automation', 'vendor', 'agent-harness', manifest.version),
  );

  await rm(vendorPath, { recursive: true, force: true });
  await mkdir(vendorPath, { recursive: true });

  for (const resource of manifest.resources) {
    const sourcePath = assertInsideRoot(source, join(source, resource.source));
    const targetPath = assertInsideRoot(vendorPath, join(vendorPath, resource.target));
    await mkdir(dirname(targetPath), { recursive: true });
    await cp(sourcePath, targetPath, { recursive: true });
  }

  const catalogPath = assertInsideRoot(vendorPath, join(vendorPath, manifest.entrypoints.catalog));
  await access(catalogPath).catch(() => {
    throw new HarnessConfigError(
      'HARNESS_BUNDLE_ENTRYPOINT_MISSING',
      `Installed bundle catalog does not exist: ${manifest.entrypoints.catalog}`,
      catalogPath,
    );
  });

  await writeFile(
    join(vendorPath, 'bundle.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );
  await writeFile(
    join(vendorPath, 'harness.json'),
    `${JSON.stringify({ name: manifest.name, version: manifest.version }, null, 2)}\n`,
    'utf8',
  );

  const integrity = `sha256:${await hashDirectory(vendorPath)}`;
  const lockPath = join(target, '.newchobo', 'automation', 'harness.lock.yaml');
  await mkdir(join(target, '.newchobo', 'automation'), { recursive: true });
  await writeFile(
    lockPath,
    stringify({
      schema_version: 1,
      harness: {
        name: manifest.name,
        version: manifest.version,
        integrity,
        vendor_path: toPosix(relative(target, vendorPath)),
      },
    }),
    'utf8',
  );

  return {
    name: manifest.name,
    version: manifest.version,
    vendorPath,
    integrity,
    lockPath,
  };
}

async function hashDirectory(root: string): Promise<string> {
  const hash = createHash('sha256');
  for (const filePath of await listFiles(root)) {
    hash.update(toPosix(relative(root, filePath)));
    hash.update('\0');
    hash.update(await readFile(filePath));
    hash.update('\0');
  }
  return hash.digest('hex');
}

async function listFiles(root: string): Promise<string[]> {
  const output: string[] = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const fullPath = join(root, entry.name);
    if (entry.isDirectory()) {
      output.push(...(await listFiles(fullPath)));
    } else if (entry.isFile()) {
      output.push(fullPath);
    }
  }
  return output.sort();
}

function defaultHarnessRoot(): string {
  return resolve(fileURLToPath(new URL('..', import.meta.url)));
}

function toPosix(value: string): string {
  return value.split(sep).join('/');
}
