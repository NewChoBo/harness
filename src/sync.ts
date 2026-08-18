import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { basename, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { stringify } from 'yaml';

import type { SyncResult } from './types.js';

interface PackageManifest {
  name: string;
  version: string;
}

export async function syncHarness(
  targetRoot: string,
  sourceRoot = defaultHarnessRoot(),
): Promise<SyncResult> {
  const manifest = JSON.parse(
    await readFile(join(sourceRoot, 'package.json'), 'utf8'),
  ) as PackageManifest;
  const vendorPath = join(
    resolve(targetRoot),
    '.newchobo',
    'automation',
    'vendor',
    'agent-harness',
    manifest.version,
  );

  await rm(vendorPath, { recursive: true, force: true });
  await mkdir(vendorPath, { recursive: true });
  await cp(join(sourceRoot, 'schemas'), join(vendorPath, 'schemas'), { recursive: true });
  await cp(join(sourceRoot, 'standard'), join(vendorPath, 'standard'), { recursive: true });
  await writeFile(
    join(vendorPath, 'harness.json'),
    `${JSON.stringify({ name: manifest.name, version: manifest.version }, null, 2)}\n`,
    'utf8',
  );

  const integrity = `sha256:${await hashDirectory(vendorPath)}`;
  const lockPath = join(resolve(targetRoot), '.newchobo', 'automation', 'harness.lock.yaml');
  await mkdir(join(resolve(targetRoot), '.newchobo', 'automation'), { recursive: true });
  await writeFile(
    lockPath,
    stringify({
      schema_version: 1,
      harness: {
        name: manifest.name,
        version: manifest.version,
        integrity,
        vendor_path: toPosix(relative(resolve(targetRoot), vendorPath)),
      },
    }),
    'utf8',
  );

  return {
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
