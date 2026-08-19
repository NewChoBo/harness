import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

const binding = readFileSync('.newchobo/harness/scheduled-task-bindings.md', 'utf8');
const protocol = readFileSync('standard/protocols/automation-operation.md', 'utf8');

function expectContains(source: string, fragments: string[]) {
  for (const fragment of fragments) {
    expect(source).toContain(fragment);
  }
}

describe('repository-owned Scheduled Task bindings', () => {
  it('keeps the required public Harness binding file present', () => {
    expect(binding.length).toBeGreaterThan(0);
  });

  it('defines the standard role bindings', () => {
    expectContains(binding, [
      '## governor',
      '## supervisor',
      '## worker',
      '## independent-reviewer',
    ]);
  });

  it('keeps the stable physical task pointer', () => {
    expectContains(binding, [
      'prompt_source: .newchobo/harness/scheduled-task-bindings.md#<binding-key>',
    ]);
  });

  it('guards role-owned Issue lifecycle semantics', () => {
    expectContains(binding, [
      'open Issues/PRs relevant to the role',
      'closes the owned Issue',
      'keeps a source-change Issue open',
      'route/handoff foreign ownership',
      "The Reviewer must not close the producer's implementation Issue",
      'return or route that Issue to its owning role',
    ]);
  });

  it('guards canonical Issue lifecycle semantics', () => {
    expectContains(protocol, [
      'Every recurring role is responsible',
      'restore existing owned Issues',
      'linked source-change review/integration gate',
      'an open linked PR normally means the Issue remains open',
      'if the Issue belongs to another role/owner, do not close',
      'a merged PR or a completion report alone is not enough',
      'required upward failure reporting',
      'post-adoption effect validation',
    ]);
  });

  it('guards reconciliation and source-mutation budget separation', () => {
    expectContains(protocol, [
      'Bounded reconciliation and source-mutation budget',
      'Passive `WAITING_*` observation does not by itself consume',
      'at most one logical source-changing work item per run',
      'does not authorize a full backlog sweep',
    ]);
  });

  it('fails closed when control sources are unavailable', () => {
    expectContains(binding, ['fails closed', 'never reconstructs']);
  });

  it('does not reintroduce the superseded private-control path', () => {
    const removedTaskBindingPath = [
      '.newchobo',
      'automation',
      'chatgpt-scheduled-task-bindings.md',
    ].join('/');
    expect(binding).not.toContain(removedTaskBindingPath);
  });
});
