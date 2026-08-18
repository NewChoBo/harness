import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

import { parse as parseYaml } from 'yaml';

import { HarnessError } from './errors.js';

export async function readStructuredFile<T>(filePath: string): Promise<T> {
  const extension = extname(filePath).toLowerCase();
  if (!['.json', '.yaml', '.yml'].includes(extension)) {
    throw new HarnessError(
      'UNSUPPORTED_STRUCTURED_EXTENSION',
      `Structured Harness files must use .json, .yaml, or .yml: ${filePath}`,
      filePath,
    );
  }

  let text: string;
  try {
    text = await readFile(filePath, 'utf8');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new HarnessError(
      'STRUCTURED_READ_FAILED',
      `Failed to read structured Harness file: ${message}`,
      filePath,
    );
  }

  try {
    if (extension === '.json') {
      return JSON.parse(text) as T;
    }
    return parseYaml(text) as T;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new HarnessError(
      'STRUCTURED_PARSE_FAILED',
      `Failed to parse structured Harness file: ${message}`,
      filePath,
    );
  }
}
