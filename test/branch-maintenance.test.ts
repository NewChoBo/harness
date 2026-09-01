import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

const workflow = readFileSync('.github/workflows/branch-maintenance.yml', 'utf8');

describe('branch lifecycle audit', () => {
  it('excludes branches used by an open PR as either head or base', () => {
    expect(workflow).toContain('const activeHeads = new Set(');
    expect(workflow).toContain('const activeBases = new Set(');
    expect(workflow).toContain('.map((pull) => pull.head.ref)');
    expect(workflow).toContain('.map((pull) => pull.base.ref)');
    expect(workflow).toContain('activeHeads.has(branch.name)');
    expect(workflow).toContain('activeBases.has(branch.name)');
  });

  it('applies per-branch lifecycle gates before exact-head comparison reuse', () => {
    const headGate = workflow.indexOf('activeHeads.has(branch.name)');
    const baseGate = workflow.indexOf('activeBases.has(branch.name)');
    const prefixGate = workflow.indexOf('shortLivedPrefixes.some');
    const cacheLookup = workflow.indexOf('comparisonsByHead.get(branch.commit.sha)');

    expect(headGate).toBeGreaterThan(-1);
    expect(baseGate).toBeGreaterThan(headGate);
    expect(prefixGate).toBeGreaterThan(baseGate);
    expect(cacheLookup).toBeGreaterThan(prefixGate);
  });

  it('binds compare evidence to the exact observed branch head SHA', () => {
    expect(workflow).toContain('const comparisonsByHead = new Map()');
    expect(workflow).toContain('basehead: `${defaultBranch}...${branch.commit.sha}`');
    expect(workflow).toContain('comparisonsByHead.set(branch.commit.sha, comparison)');
  });
});
