import { lstat, realpath } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';

import { HarnessError } from './errors.js';

export function normalizeRoot(rootDir: string): string {
  return resolve(rootDir);
}

export function assertInsideRoot(rootDir: string, candidate: string): string {
  const root = normalizeRoot(rootDir);
  const absolute = resolve(candidate);
  const rel = relative(root, absolute);

  if (escapesRoot(rel)) {
    throw new HarnessError('PATH_ESCAPE', `Path escapes Harness root: ${candidate}`);
  }

  return absolute;
}

export async function assertRealPathInsideRoot(
  rootDir: string,
  candidate: string,
): Promise<string> {
  const lexical = assertInsideRoot(rootDir, candidate);
  const canonicalRoot = await canonicalizeRoot(rootDir);

  let canonicalCandidate: string;
  try {
    canonicalCandidate = await realpath(lexical);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new HarnessError(
      'PATH_REALPATH_FAILED',
      `Failed to resolve Harness path: ${message}`,
      lexical,
    );
  }

  assertCanonicalInsideRoot(canonicalRoot, canonicalCandidate, candidate, lexical);
  return lexical;
}

export async function assertPathAncestorInsideRoot(
  rootDir: string,
  candidate: string,
): Promise<string> {
  const lexical = assertInsideRoot(rootDir, candidate);
  const canonicalRoot = await canonicalizeRoot(rootDir);
  let current = lexical;

  for (;;) {
    let stats;
    try {
      stats = await lstat(current);
    } catch (error: unknown) {
      if (!isMissingPathError(error)) {
        const message = error instanceof Error ? error.message : String(error);
        throw new HarnessError(
          'PATH_LSTAT_FAILED',
          `Failed to inspect Harness path ancestor: ${message}`,
          current,
        );
      }

      const parent = dirname(current);
      if (parent === current) {
        const message = error instanceof Error ? error.message : String(error);
        throw new HarnessError(
          'PATH_REALPATH_FAILED',
          `Failed to resolve Harness path or any existing ancestor: ${message}`,
          lexical,
        );
      }
      current = parent;
      continue;
    }

    let canonicalCurrent: string;
    try {
      canonicalCurrent = await realpath(current);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new HarnessError(
        stats.isSymbolicLink() ? 'PATH_SYMLINK_UNRESOLVED' : 'PATH_REALPATH_FAILED',
        stats.isSymbolicLink()
          ? `Harness path ancestor is a symlink whose target cannot be resolved: ${message}`
          : `Failed to resolve existing Harness path ancestor: ${message}`,
        current,
      );
    }

    assertCanonicalInsideRoot(canonicalRoot, canonicalCurrent, candidate, lexical);
    return lexical;
  }
}

export function resolveRootRelative(rootDir: string, reference: string): string {
  if (isAbsolute(reference)) {
    throw new HarnessError(
      'ABSOLUTE_REFERENCE_FORBIDDEN',
      `Harness references must be root-relative: ${reference}`,
    );
  }

  return assertInsideRoot(rootDir, resolve(normalizeRoot(rootDir), reference));
}

export function toRootRelative(rootDir: string, absolutePath: string): string {
  return relative(normalizeRoot(rootDir), absolutePath).split(sep).join('/');
}

async function canonicalizeRoot(rootDir: string): Promise<string> {
  try {
    return await realpath(normalizeRoot(rootDir));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new HarnessError(
      'ROOT_REALPATH_FAILED',
      `Failed to resolve Harness root: ${message}`,
      rootDir,
    );
  }
}

function assertCanonicalInsideRoot(
  canonicalRoot: string,
  canonicalCandidate: string,
  originalCandidate: string,
  lexicalCandidate: string,
): void {
  const rel = relative(canonicalRoot, canonicalCandidate);
  if (escapesRoot(rel)) {
    throw new HarnessError(
      'PATH_ESCAPE',
      `Resolved path escapes Harness root: ${originalCandidate}`,
      lexicalCandidate,
    );
  }
}

function isMissingPathError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    ((error as { code?: unknown }).code === 'ENOENT' ||
      (error as { code?: unknown }).code === 'ENOTDIR')
  );
}

function escapesRoot(relativePath: string): boolean {
  return relativePath === '..' || relativePath.startsWith(`..${sep}`) || isAbsolute(relativePath);
}
