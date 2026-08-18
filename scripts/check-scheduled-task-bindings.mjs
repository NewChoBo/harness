import { readFileSync } from 'node:fs';

const bindingPath = '.newchobo/harness/scheduled-task-bindings.md';
const namespaceReadmePath = '.newchobo/harness/README.md';
const violations = [];

function readRequired(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    violations.push(`${path}: required public Harness automation bootstrap is missing or unreadable`);
    return '';
  }
}

const binding = readRequired(bindingPath);
const namespaceReadme = readRequired(namespaceReadmePath);

for (const marker of [
  'REQUIRED public repository-owned Harness runtime bootstrap',
  '## governor',
  '## supervisor',
  '## worker',
  '## independent-reviewer',
  'prompt_source: .newchobo/harness/scheduled-task-bindings.md#<binding-key>',
]) {
  if (binding && !binding.includes(marker)) {
    violations.push(`${bindingPath}: required marker is missing: ${marker}`);
  }
}

for (const forbidden of [
  'Status: project-owned runtime binding source (private control material)',
  'ChatGPT Scheduled Task Bindings — private control',
]) {
  if (binding.includes(forbidden)) {
    violations.push(`${bindingPath}: obsolete private-control semantics detected`);
  }
}

if (
  namespaceReadme &&
  !namespaceReadme.includes('scheduled-task-bindings.md` is a required public repository control interface')
) {
  violations.push(
    `${namespaceReadmePath}: namespace contract does not declare scheduled-task-bindings.md as required public metadata`,
  );
}

if (violations.length > 0) {
  process.stderr.write(`Scheduled task binding validation failed:\n- ${violations.join('\n- ')}\n`);
  process.exit(1);
}

process.stdout.write('Scheduled task binding validation passed.\n');
