#!/usr/bin/env node
import { resolve } from 'node:path';

import { stringify } from 'yaml';

import { HarnessConfigError } from './errors.js';
import { readStructuredFile } from './io.js';
import { resolvePreset } from './resolver.js';
import { setupHarnessProject } from './setup.js';
import { syncHarness } from './sync.js';
import { validateAgentContract, validateResultDocument, validateWorkflow } from './validator.js';
import type { AgentContractKind, SetupProvider } from './types.js';

async function main(): Promise<void> {
  const [, , command, subject, ...rest] = process.argv;

  if (!command || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  if (command === 'resolve') {
    requireSubject(command, subject);
    const rootDir = option(rest, '--root') ?? process.cwd();
    const workflow = await resolvePreset(subject!, { rootDir });
    process.stdout.write(stringify(workflow));
    return;
  }

  if (command === 'validate') {
    requireSubject(command, subject);
    const rootDir = option(rest, '--root') ?? process.cwd();
    const workflow = await resolvePreset(subject!, { rootDir });
    const issues = await validateWorkflow(workflow, rootDir);
    reportIssues(issues);
    return;
  }

  if (command === 'validate-result') {
    requireSubject(command, subject);
    const schema = option(rest, '--schema');
    const value = await readStructuredFile<unknown>(resolve(subject!));
    const issues = await validateResultDocument(value, schema ? resolve(schema) : undefined);
    reportIssues(issues);
    return;
  }

  if (command === 'validate-agent') {
    requireSubject(command, subject);
    const kind = agentContractKind(subject!);
    const file = rest[0];
    if (!file) {
      throw new Error('validate-agent requires a contract kind and file path.');
    }
    const value = await readStructuredFile<unknown>(resolve(file));
    reportIssues(validateAgentContract(kind, value));
    return;
  }

  if (command === 'setup') {
    const args = [subject, ...rest].filter(Boolean) as string[];
    const target = option(args, '--target');
    const source = option(args, '--source');
    if (!target) {
      throw new Error('setup requires --target <consumer-root>.');
    }
    const providers = parseSetupProviders(option(args, '--providers') ?? 'codex');
    const result = await setupHarnessProject({
      targetRoot: resolve(target),
      sourceRoot: source ? resolve(source) : undefined,
      providers,
    });
    process.stdout.write(stringify(result));
    return;
  }

  if (command === 'sync') {
    const args = [subject, ...rest].filter(Boolean) as string[];
    const target = option(args, '--target');
    const source = option(args, '--source');
    if (!target) {
      throw new Error('sync requires --target <consumer-root>.');
    }
    const result = await syncHarness(resolve(target), source ? resolve(source) : undefined);
    process.stdout.write(stringify(result));
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

function option(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  if (index < 0) {
    return undefined;
  }
  const value = args[index + 1];
  if (!value) {
    throw new Error(`${name} requires a value.`);
  }
  return value;
}

function requireSubject(command: string, subject?: string): void {
  if (!subject) {
    throw new Error(`${command} requires a file path.`);
  }
}

function agentContractKind(value: string): AgentContractKind {
  if (value === 'manifest' || value === 'request' || value === 'event' || value === 'completion') {
    return value;
  }
  throw new Error(`Unknown agent contract kind: ${value}`);
}

function parseSetupProviders(value: string): SetupProvider[] {
  if (value === 'none') {
    return [];
  }
  return value.split(',').map((item) => {
    const normalized = item.trim().replaceAll('-', '_');
    if (normalized === 'codex' || normalized === 'claude_code' || normalized === 'copilot') {
      return normalized;
    }
    throw new Error(`Unknown setup provider: ${item}`);
  });
}

function reportIssues(issues: Array<{ code: string; path: string; message: string }>): void {
  if (issues.length === 0) {
    process.stdout.write('OK\n');
    return;
  }
  for (const item of issues) {
    process.stderr.write(`[${item.code}] ${item.path}: ${item.message}\n`);
  }
  process.exitCode = 1;
}

function printHelp(): void {
  process.stdout.write('agent-harness\n\n');
  process.stdout.write('  resolve <preset> [--root <dir>]\n');
  process.stdout.write('  validate <preset> [--root <dir>]\n');
  process.stdout.write('  validate-result <result> [--schema <file>]\n');
  process.stdout.write('  validate-agent <manifest|request|event|completion> <file>\n');
  process.stdout.write(
    '  setup --target <consumer-root> [--source <harness-root>] [--providers <list|none>]\n',
  );
  process.stdout.write('  sync --target <consumer-root> [--source <harness-root>]\n');
}

main().catch((error: unknown) => {
  if (error instanceof HarnessConfigError) {
    const path = error.path ? ` ${error.path}` : '';
    process.stderr.write(`[${error.code}]${path}: ${error.message}\n`);
  } else {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`${message}\n`);
  }
  process.exitCode = 1;
});
