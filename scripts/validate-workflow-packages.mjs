import { readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const packagesRoot = 'packages';
const entries = await readdir(packagesRoot, { withFileTypes: true });
const workflowPackages = entries
  .filter((entry) => entry.isDirectory() && entry.name.startsWith('harness-workflow-'))
  .map((entry) => entry.name)
  .sort();

if (workflowPackages.length === 0) {
  throw new Error('No harness workflow packages were found.');
}

for (const packageName of workflowPackages) {
  const presetPath = join(packagesRoot, packageName, 'preset.yaml');
  if (!existsSync(presetPath)) {
    throw new Error(`Missing workflow preset: ${presetPath}`);
  }

  const result = spawnSync(process.execPath, ['dist/cli.js', 'validate', presetPath], {
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

process.stdout.write(`Validated ${workflowPackages.length} workflow package preset(s).\n`);
