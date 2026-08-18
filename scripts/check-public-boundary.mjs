import { execFileSync } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import { basename } from 'node:path';

const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean);

const violations = [];

for (const path of tracked) {
  if (path.startsWith('.newchobo/') && !path.startsWith('.newchobo/harness/')) {
    violations.push(`${path}: public Harness allows repository-owned NewChoBo metadata only under .newchobo/harness/`);
  }

  const name = basename(path).toLowerCase();
  if (
    name === '.env' ||
    (name.startsWith('.env.') && name !== '.env.example') ||
    name === 'credentials.json' ||
    name === 'id_rsa' ||
    name.endsWith('.pem') ||
    name.endsWith('.key')
  ) {
    violations.push(`${path}: high-risk secret-bearing filename is not allowed in the public Harness tree`);
  }

  const info = await stat(path);
  if (!info.isFile() || info.size > 1024 * 1024) {
    continue;
  }

  let content;
  try {
    content = await readFile(path, 'utf8');
  } catch {
    continue;
  }

  if (/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/.test(content)) {
    violations.push(`${path}: private-key material detected`);
  }
  if (/^\s*temporary_runtime_bridge\s*:/m.test(content)) {
    violations.push(`${path}: runtime-only private bridge metadata must not be persisted in the public Harness repository`);
  }
}

if (violations.length > 0) {
  process.stderr.write(`Public information boundary check failed:\n- ${violations.join('\n- ')}\n`);
  process.exit(1);
}

process.stdout.write('Public information boundary structural checks passed.\n');
