import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

import { parse } from 'yaml';

export async function readStructuredFile<T>(filePath: string): Promise<T> {
  const text = await readFile(filePath, 'utf8');
  const extension = extname(filePath).toLowerCase();

  if (extension === '.json') {
    return JSON.parse(text) as T;
  }

  return parse(text) as T;
}
