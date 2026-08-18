import { execFileSync } from 'node:child_process';
import { createReadStream } from 'node:fs';
import { basename } from 'node:path';

const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean);

const violations = [];
const privateKeyPattern = /-----BEGIN (?:(?:RSA|EC|OPENSSH|DSA|ENCRYPTED) )?PRIVATE KEY-----/;
const privateBridgePattern = /^\s*temporary_runtime_bridge\s*:/m;

async function scanTrackedFile(path) {
  let carry = '';
  let privateKeyDetected = false;
  let privateBridgeDetected = false;

  try {
    for await (const chunk of createReadStream(path, { highWaterMark: 64 * 1024 })) {
      const text = carry + chunk.toString('utf8');
      if (!privateKeyDetected && privateKeyPattern.test(text)) {
        privateKeyDetected = true;
      }
      if (!privateBridgeDetected && privateBridgePattern.test(text)) {
        privateBridgeDetected = true;
      }
      if (privateKeyDetected && privateBridgeDetected) {
        break;
      }
      carry = text.slice(-512);
    }
  } catch {
    violations.push(`${path}: tracked file could not be scanned; public-safety status is unknown`);
    return;
  }

  if (privateKeyDetected) {
    violations.push(`${path}: private-key material detected`);
  }
  if (privateBridgeDetected) {
    violations.push(`${path}: runtime-only private bridge metadata must not be persisted in the public Harness repository`);
  }
}

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

  await scanTrackedFile(path);
}

if (violations.length > 0) {
  process.stderr.write(`Public information boundary check failed:\n- ${violations.join('\n- ')}\n`);
  process.exit(1);
}

process.stdout.write('Public information boundary structural checks passed.\n');
