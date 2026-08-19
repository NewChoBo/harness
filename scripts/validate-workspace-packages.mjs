import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { parse as parseYaml } from 'yaml';

const packagePaths = [
  'package.json',
  'packages/engine/package.json',
  'packages/harness-workflow-coding/package.json',
  'packages/harness-workflow-novel/package.json',
  'packages/harness-workflow-research/package.json',
];

const packages = packagePaths.map((path) => ({
  path,
  data: JSON.parse(readFileSync(path, 'utf8')),
}));

const root = packages[0].data;
const version = root.version;
const repositoryUrl = 'https://github.com/NewChoBo/harness.git';
const expectedNames = [
  '@newchobo/harness',
  '@newchobo/harness-core',
  '@newchobo/harness-workflow-coding',
  '@newchobo/harness-workflow-novel',
  '@newchobo/harness-workflow-research',
];
const workflowPackages = packages.slice(2);
const workspaceDependency = 'workspace:^';
const publishedDependency = `^${version}`;
const expectedWorkspaceLink = 'link:../..';

const errors = [];
for (let index = 0; index < packages.length; index += 1) {
  const { path, data } = packages[index];
  if (data.name !== expectedNames[index])
    errors.push(`${path}: expected name ${expectedNames[index]}`);
  if (data.version !== version)
    errors.push(`${path}: version ${data.version} does not match root ${version}`);
  if (data.private !== false) errors.push(`${path}: publishable package must set private=false`);
  if (data.publishConfig?.access !== 'public')
    errors.push(`${path}: publishConfig.access must be public`);
  if (data.repository?.url !== repositoryUrl)
    errors.push(`${path}: repository.url must be ${repositoryUrl}`);
}

for (const { path, data } of workflowPackages) {
  const dependency = data.dependencies?.['@newchobo/harness'];
  if (dependency !== workspaceDependency)
    errors.push(`${path}: @newchobo/harness dependency must be ${workspaceDependency}`);
}

if (root.packageManager !== 'pnpm@10.14.0')
  errors.push('package.json: packageManager must be pnpm@10.14.0');
if (!existsSync('pnpm-lock.yaml')) errors.push('pnpm-lock.yaml: canonical lockfile is missing');
if (existsSync('package-lock.json'))
  errors.push('package-lock.json: competing npm lockfile must not be committed');
if (!root.files?.includes('.newchobo/harness'))
  errors.push('package.json: files must include .newchobo/harness');

let workspace;
try {
  workspace = parseYaml(readFileSync('pnpm-workspace.yaml', 'utf8'));
} catch (error) {
  errors.push(`pnpm-workspace.yaml: invalid YAML (${error.message})`);
}
if (workspace?.linkWorkspacePackages !== true)
  errors.push('pnpm-workspace.yaml: linkWorkspacePackages must be true');
if (workspace?.preferWorkspacePackages !== true)
  errors.push('pnpm-workspace.yaml: preferWorkspacePackages must be true');
if (workspace?.saveWorkspaceProtocol !== false)
  errors.push('pnpm-workspace.yaml: saveWorkspaceProtocol must be false');

let lockfile;
try {
  lockfile = parseYaml(readFileSync('pnpm-lock.yaml', 'utf8'));
} catch (error) {
  errors.push(`pnpm-lock.yaml: invalid YAML (${error.message})`);
}
for (const { path } of workflowPackages) {
  const importerPath = dirname(path).replaceAll('\\', '/');
  const dependency = lockfile?.importers?.[importerPath]?.dependencies?.['@newchobo/harness'];
  if (dependency?.specifier !== workspaceDependency) {
    errors.push(
      `${importerPath}: lockfile @newchobo/harness specifier must be ${workspaceDependency}`,
    );
  }
  if (dependency?.version !== expectedWorkspaceLink) {
    errors.push(
      `${importerPath}: lockfile @newchobo/harness version must be ${expectedWorkspaceLink}`,
    );
  }
}
if (lockfile?.packages?.[`@newchobo/harness@${version}`])
  errors.push('pnpm-lock.yaml: synchronized @newchobo/harness must not resolve from registry');
if (lockfile?.snapshots?.[`@newchobo/harness@${version}`])
  errors.push('pnpm-lock.yaml: synchronized @newchobo/harness registry snapshot must be absent');

const requiredFiles = [
  'standard/catalog.yaml',
  'standard/protocols/public-information-boundary.md',
  'standard/protocols/automation-operation.md',
  'standard/checklists/public-automation-safety.md',
  'schemas/harness-catalog.schema.json',
  'packages/harness-workflow-coding/preset.yaml',
  'packages/harness-workflow-novel/preset.yaml',
  'packages/harness-workflow-research/preset.yaml',
  '.newchobo/harness/README.md',
  '.newchobo/harness/scheduled-task-bindings.md',
];
for (const path of requiredFiles)
  if (!existsSync(path)) errors.push(`${path}: required file is missing`);

for (const path of requiredFiles.filter((value) => value.endsWith('.yaml'))) {
  try {
    parseYaml(readFileSync(path, 'utf8'));
  } catch (error) {
    errors.push(`${path}: invalid YAML (${error.message})`);
  }
}

const readTarEntry = (tarballPath, targetPath) => {
  const archive = gunzipSync(readFileSync(tarballPath));
  let offset = 0;
  while (offset + 512 <= archive.length) {
    const header = archive.subarray(offset, offset + 512);
    if (header.every((byte) => byte === 0)) break;

    const name = header.subarray(0, 100).toString('utf8').replace(/\0.*$/u, '');
    const sizeText = header.subarray(124, 136).toString('ascii').replace(/\0.*$/u, '').trim();
    const size = Number.parseInt(sizeText || '0', 8);
    if (!Number.isFinite(size)) throw new Error(`invalid tar entry size for ${name}`);

    const bodyOffset = offset + 512;
    if (name === targetPath) {
      return archive.subarray(bodyOffset, bodyOffset + size).toString('utf8');
    }
    offset = bodyOffset + Math.ceil(size / 512) * 512;
  }
  throw new Error(`tar entry ${targetPath} not found`);
};

if (errors.length === 0) {
  const pnpmCommand = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
  for (const { path } of workflowPackages) {
    const packageDir = dirname(path);
    const packDir = mkdtempSync(join(tmpdir(), 'newchobo-harness-pack-'));
    try {
      const result = spawnSync(pnpmCommand, ['pack', '--pack-destination', packDir], {
        cwd: packageDir,
        encoding: 'utf8',
      });
      if (result.status !== 0) {
        errors.push(
          `${path}: pnpm pack failed (${result.stderr.trim() || result.stdout.trim() || 'unknown error'})`,
        );
        continue;
      }

      const tarballs = readdirSync(packDir).filter((name) => name.endsWith('.tgz'));
      if (tarballs.length !== 1) {
        errors.push(`${path}: expected one packed tarball, found ${tarballs.length}`);
        continue;
      }

      const packed = JSON.parse(readTarEntry(join(packDir, tarballs[0]), 'package/package.json'));
      const dependency = packed.dependencies?.['@newchobo/harness'];
      if (dependency !== publishedDependency) {
        errors.push(
          `${path}: packed @newchobo/harness dependency must be ${publishedDependency}, got ${dependency ?? '<missing>'}`,
        );
      }
    } catch (error) {
      errors.push(`${path}: packed manifest validation failed (${error.message})`);
    } finally {
      rmSync(packDir, { recursive: true, force: true });
    }
  }
}

const publicNovelText = [
  readFileSync('packages/harness-workflow-novel/README.md', 'utf8'),
  readFileSync('packages/harness-workflow-novel/novel-overlay.md', 'utf8'),
].join('\n');

const runtimeOnlyMarker = ['temporary', 'runtime', 'bridge'].join('_');
if (publicNovelText.toLowerCase().includes(runtimeOnlyMarker)) {
  errors.push('public novel workflow contains runtime-only private bridge metadata');
}

const repositoryCoordinates = publicNovelText.match(/\bNewChoBo\/[A-Za-z0-9_.-]+\b/g) ?? [];
for (const coordinate of repositoryCoordinates) {
  if (coordinate !== 'NewChoBo/harness') {
    errors.push('public novel workflow must not name another NewChoBo repository coordinate');
  }
}

if (errors.length > 0) {
  console.error('Workspace package validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Workspace package validation passed for ${packages.length} publishable packages at ${version}.`,
);
