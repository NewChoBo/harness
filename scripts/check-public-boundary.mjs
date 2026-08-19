import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean);

const temporaryBridgeName = ['temporary', 'runtime', 'bridge'].join('_');
const removedBindingPath = ['.newchobo', 'automation', 'chatgpt-scheduled-task-bindings.md'].join(
  '/',
);

const violations = [];
const forbiddenText = [
  ['removed task binding path', new RegExp(removedBindingPath.replaceAll('.', '\\.'), 'gi')],
  ['runtime-only private bridge marker', new RegExp(temporaryBridgeName, 'gi')],
  ['private download token URL', /raw\.githubusercontent\.com\/[^\s]+\?token=/gi],
  ['private key', /-----BEGIN (?:(?:RSA|EC|OPENSSH|DSA|ENCRYPTED) )?PRIVATE KEY-----/g],
  ['GitHub token', /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g],
  ['npm token', /\bnpm_[A-Za-z0-9]{20,}\b/g],
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/g],
];

for (const file of files) {
  if (file.startsWith('.newchobo/') && !file.startsWith('.newchobo/harness/')) {
    violations.push(`${file}: only .newchobo/harness/** is allowed in the public repository`);
  }

  const name = basename(file).toLowerCase();
  if (
    name === '.env' ||
    (name.startsWith('.env.') && name !== '.env.example') ||
    name === 'credentials.json' ||
    name === 'id_rsa' ||
    name.endsWith('.pem') ||
    name.endsWith('.key')
  ) {
    violations.push(`${file}: high-risk secret-bearing filename is not allowed`);
  }

  let buffer;
  try {
    buffer = readFileSync(file);
  } catch (error) {
    violations.push(`${file}: unreadable tracked payload (${error.message})`);
    continue;
  }

  const prefix = buffer.subarray(0, 200).toString('utf8');
  if (prefix.startsWith('version https://git-lfs.github.com/spec/v1')) {
    violations.push(`${file}: unresolved Git LFS pointer; payload public safety is UNKNOWN`);
    continue;
  }

  if (buffer.includes(0)) continue;
  const text = buffer.toString('utf8');
  for (const [label, pattern] of forbiddenText) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) violations.push(`${file}: ${label}`);
  }
}

if (violations.length > 0) {
  console.error('Public information boundary check failed:');
  for (const violation of [...new Set(violations)].sort()) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(`Public information boundary check passed for ${files.length} tracked files.`);
