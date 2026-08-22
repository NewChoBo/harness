import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';

import { stringify } from 'yaml';

import { installHarnessBundle, loadHarnessBundleManifest } from './bundle.js';
import { HarnessConfigError } from './errors.js';
import type {
  SetupHarnessProjectOptions,
  SetupHarnessProjectResult,
  SetupProvider,
} from './types.js';
import { validateProjectHarnessBinding } from './validator.js';

const controlDirectory = join('.newchobo', 'automation');
const bindingFile = join(controlDirectory, 'harness.yaml');
const managedStart = '<!-- agent-harness:managed-start -->';
const managedEnd = '<!-- agent-harness:managed-end -->';

const bootstrapTargets: Record<SetupProvider, string> = {
  codex: 'AGENTS.md',
  claude_code: 'CLAUDE.md',
  copilot: join('.github', 'copilot-instructions.md'),
};

interface PreparedBootstrap {
  path: string;
  current: string;
  next: string;
}

export async function setupHarnessProject(
  options: SetupHarnessProjectOptions,
): Promise<SetupHarnessProjectResult> {
  const targetRoot = resolve(options.targetRoot);
  const providers = normalizeProviders(options.providers ?? []);
  const bootstraps = await Promise.all(
    providers.map((provider) =>
      prepareManagedBootstrap(join(targetRoot, bootstrapTargets[provider])),
    ),
  );
  const installed = await installHarnessBundle(targetRoot, options.sourceRoot);
  const manifest = await loadHarnessBundleManifest(options.sourceRoot);
  const bindingPath = join(targetRoot, bindingFile);
  const vendorPath = toPosix(relative(targetRoot, installed.vendorPath));
  const schemaPath = toPosix(
    relative(
      dirname(bindingPath),
      join(installed.vendorPath, 'schemas', 'project-harness.schema.json'),
    ),
  );
  const binding = {
    $schema: schemaPath.startsWith('.') ? schemaPath : `./${schemaPath}`,
    schema_version: 1,
    kind: 'project_harness_binding',
    base: {
      name: installed.name,
      version: installed.version,
      integrity: installed.integrity,
      vendor_path: vendorPath,
      catalog: `${vendorPath}/${manifest.entrypoints.catalog}`,
    },
    providers,
    overlays: [],
  };
  const issues = validateProjectHarnessBinding(binding);
  if (issues.length > 0) {
    throw new HarnessConfigError(
      'PROJECT_HARNESS_INVALID',
      issues.map((item) => `${item.path}: ${item.message}`).join('; '),
      bindingPath,
    );
  }

  await mkdir(dirname(bindingPath), { recursive: true });
  await writeFile(bindingPath, stringify(binding), 'utf8');

  for (const bootstrap of bootstraps) {
    await writePreparedBootstrap(bootstrap);
  }

  return {
    ...installed,
    bindingPath,
    bootstrapPaths: bootstraps.map((bootstrap) => bootstrap.path),
  };
}

function normalizeProviders(values: SetupProvider[]): SetupProvider[] {
  const allowed = new Set<SetupProvider>(['codex', 'claude_code', 'copilot']);
  const output: SetupProvider[] = [];
  for (const value of values) {
    if (!allowed.has(value)) {
      throw new HarnessConfigError('SETUP_PROVIDER_UNKNOWN', `Unknown setup provider: ${value}`);
    }
    if (!output.includes(value)) {
      output.push(value);
    }
  }
  return output;
}

async function prepareManagedBootstrap(path: string): Promise<PreparedBootstrap> {
  const current = await readFile(path, 'utf8').catch((error: unknown) => {
    if (isMissingFileError(error)) {
      return '';
    }
    throw error;
  });
  const newline = current.includes('\r\n') ? '\r\n' : '\n';
  const block = [
    managedStart,
    '## Agent Harness bootstrap',
    '',
    'Before work, load `.newchobo/automation/harness.yaml` and the minimum role, workflow, policy,',
    'and validation resources required for the selected WorkItem. Treat the installed bundle as',
    'upstream-owned and read-only; keep project-specific behavior in project or task overlays.',
    managedEnd,
  ].join(newline);
  const start = current.indexOf(managedStart);
  const end = current.indexOf(managedEnd);
  const nextStart = start >= 0 ? current.indexOf(managedStart, start + managedStart.length) : -1;
  const nextEnd = end >= 0 ? current.indexOf(managedEnd, end + managedEnd.length) : -1;

  let next: string;
  if (start >= 0 || end >= 0) {
    if (start < 0 || end < start || nextStart >= 0 || nextEnd >= 0) {
      throw new HarnessConfigError(
        'SETUP_BOOTSTRAP_MARKER_INVALID',
        `Managed Harness bootstrap markers are incomplete or duplicated: ${path}`,
        path,
      );
    }
    next = `${current.slice(0, start)}${block}${current.slice(end + managedEnd.length)}`;
  } else if (current.trim().length === 0) {
    next = `${block}${newline}`;
  } else {
    const prefix = current.endsWith(newline) ? current : `${current}${newline}`;
    next = `${prefix}${newline}${block}${newline}`;
  }

  return { path, current, next };
}

async function writePreparedBootstrap(bootstrap: PreparedBootstrap): Promise<void> {
  if (bootstrap.next !== bootstrap.current) {
    await mkdir(dirname(bootstrap.path), { recursive: true });
    await writeFile(bootstrap.path, bootstrap.next, 'utf8');
  }
}

function isMissingFileError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT';
}

function toPosix(value: string): string {
  return value.split(sep).join('/');
}
