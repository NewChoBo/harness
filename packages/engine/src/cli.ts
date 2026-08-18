#!/usr/bin/env node

import {
  HarnessError,
  resolveCatalogResources,
  validateCatalogFile,
} from './index.js';

interface ParsedArgs {
  rootDir: string;
  catalogPath: string;
  resourceIds: string[];
}

async function main(): Promise<void> {
  const [, , command, ...args] = process.argv;

  if (!command || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  const parsed = parseArgs(args);

  if (command === 'validate') {
    if (parsed.resourceIds.length > 0) {
      throw new HarnessError('UNEXPECTED_ARGUMENT', 'validate does not accept resource ids.');
    }
    const issues = await validateCatalogFile(parsed.catalogPath, { rootDir: parsed.rootDir });
    process.stdout.write(
      `${JSON.stringify({ ok: issues.length === 0, catalog: parsed.catalogPath, issues }, null, 2)}\n`,
    );
    if (issues.length > 0) {
      process.exitCode = 1;
    }
    return;
  }

  if (command === 'resolve') {
    const resources = await resolveCatalogResources(parsed.catalogPath, parsed.resourceIds, {
      rootDir: parsed.rootDir,
    });
    process.stdout.write(
      `${JSON.stringify({ catalog: parsed.catalogPath, resources }, null, 2)}\n`,
    );
    return;
  }

  throw new HarnessError('UNKNOWN_COMMAND', `Unknown command: ${command}`);
}

function parseArgs(args: string[]): ParsedArgs {
  let rootDir = process.cwd();
  let catalogPath = 'standard/catalog.yaml';
  const resourceIds: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    const current = args[index];
    if (current === '--root' || current === '--catalog') {
      const value = args[index + 1];
      if (!value) {
        throw new HarnessError('OPTION_VALUE_REQUIRED', `${current} requires a value.`);
      }
      if (current === '--root') {
        rootDir = value;
      } else {
        catalogPath = value;
      }
      index += 1;
      continue;
    }
    if (current?.startsWith('-')) {
      throw new HarnessError('UNKNOWN_OPTION', `Unknown option: ${current}`);
    }
    if (current) {
      resourceIds.push(current);
    }
  }

  return { rootDir, catalogPath, resourceIds };
}

function printHelp(): void {
  process.stdout.write('NewChoBo Harness Engine foundation\n\n');
  process.stdout.write('  harness validate [--root <dir>] [--catalog <file>]\n');
  process.stdout.write('  harness resolve [resource-id ...] [--root <dir>] [--catalog <file>]\n');
  process.stdout.write('\n');
  process.stdout.write('This foundation validates and resolves current Harness catalog resources only.\n');
}

main().catch((error: unknown) => {
  if (error instanceof HarnessError) {
    const path = error.path ? ` (${error.path})` : '';
    process.stderr.write(`[${error.code}]${path}: ${error.message}\n`);
  } else {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`${message}\n`);
  }
  process.exitCode = 1;
});
