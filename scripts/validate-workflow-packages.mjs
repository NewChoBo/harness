import { existsSync } from 'node:fs';
import { readdir, unlink, writeFile } from 'node:fs/promises';
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

  const basePreset = packageName.endsWith('-research')
    ? 'standard/presets/base-researcher.yaml'
    : 'standard/presets/base-worker.yaml';
  const validationPreset = `.harness-workflow-validation-${packageName}.yaml`;
  const content = [
    'schema_version: 1',
    'kind: workflow_automation_preset',
    `id: validate-${packageName}`,
    'extends:',
    `  - ./${basePreset}`,
    `  - ./${presetPath}`,
    '',
  ].join('\n');

  await writeFile(validationPreset, content, 'utf8');
  try {
    const result = spawnSync(process.execPath, ['dist/cli.js', 'validate', validationPreset], {
      stdio: 'inherit',
    });

    if (result.status !== 0) {
      process.exitCode = result.status ?? 1;
      break;
    }
  } finally {
    await unlink(validationPreset).catch(() => undefined);
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

process.stdout.write(
  `Validated ${workflowPackages.length} workflow package overlay(s) through representative composition.\n`,
);
