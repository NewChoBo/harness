import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterEach, describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));
const script = join(root, 'scripts/check-public-boundary.mjs');
const temporaryRoots: string[] = [];

function runBoundaryCheck(files: Record<string, string | Buffer>) {
  const workingDirectory = mkdtempSync(join(tmpdir(), 'harness-public-boundary-'));
  temporaryRoots.push(workingDirectory);
  execFileSync('git', ['init', '--quiet'], { cwd: workingDirectory });

  for (const [path, content] of Object.entries(files)) {
    const target = join(workingDirectory, path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
  }

  execFileSync('git', ['add', '--all'], { cwd: workingDirectory });
  return spawnSync(process.execPath, [script], {
    cwd: workingDirectory,
    encoding: 'utf8',
  });
}

afterEach(() => {
  for (const path of temporaryRoots.splice(0)) {
    rmSync(path, { recursive: true, force: true });
  }
});

describe('public information boundary script', () => {
  it('accepts a normal public-safe tracked file', () => {
    const result = runBoundaryCheck({ 'README.md': '# Public example\n' });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Public information boundary check passed');
  });

  it('fails closed when a tracked Git LFS pointer is not hydrated', () => {
    const pointer = [
      'version https://git-lfs.github.com/spec/v1',
      'oid sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
      'size 128',
      '',
    ].join('\n');
    const result = runBoundaryCheck({ 'assets/example.bin': pointer });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('unresolved Git LFS pointer');
    expect(result.stderr).toContain('UNKNOWN');
  });

  it('rejects NewChoBo metadata outside the public harness namespace', () => {
    const result = runBoundaryCheck({ '.newchobo/automation/task.md': '# task\n' });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('only .newchobo/harness/** is allowed');
  });

  it('rejects runtime-only bridge metadata without storing private coordinates', () => {
    const marker = ['temporary', 'runtime', 'bridge'].join('_');
    const result = runBoundaryCheck({ 'notes.md': `${marker}: present\n` });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('runtime-only private bridge marker');
  });
});
