import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';

import { HarnessConfigError } from './errors.js';

export function normalizeRoot(rootDir: string): string {
  return resolve(rootDir);
}

export function assertInsideRoot(rootDir: string, candidate: string): string {
  const root = normalizeRoot(rootDir);
  const absolute = resolve(candidate);
  const rel = relative(root, absolute);

  if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    throw new HarnessConfigError('PATH_ESCAPE', `Reference escapes harness root: ${candidate}`);
  }

  return absolute;
}

export function resolveReference(rootDir: string, ownerFile: string, reference: string): string {
  if (isAbsolute(reference)) {
    throw new HarnessConfigError(
      'ABSOLUTE_REFERENCE_FORBIDDEN',
      `Preset references must be relative: ${reference}`,
      ownerFile,
    );
  }

  return assertInsideRoot(rootDir, resolve(dirname(ownerFile), reference));
}

export function toRootRelative(rootDir: string, absolutePath: string): string {
  return relative(normalizeRoot(rootDir), absolutePath).split(sep).join('/');
}
