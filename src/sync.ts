import { installHarnessBundle } from './bundle.js';
import type { SyncResult } from './types.js';

export async function syncHarness(targetRoot: string, sourceRoot?: string): Promise<SyncResult> {
  return sourceRoot
    ? installHarnessBundle(targetRoot, sourceRoot)
    : installHarnessBundle(targetRoot);
}
