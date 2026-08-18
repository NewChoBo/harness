import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

const bindingPath = '.newchobo/harness/scheduled-task-bindings.md';

describe('repository-owned Scheduled Task bindings', () => {
  const binding = readFileSync(bindingPath, 'utf8');

  it('keeps the required public Harness binding file present', () => {
    expect(binding.length).toBeGreaterThan(0);
  });

  it.each(['governor', 'supervisor', 'worker', 'independent-reviewer'])(
    'defines the %s binding',
    (role) => {
      expect(binding).toContain(`## ${role}`);
    },
  );

  it('points physical tasks at the stable repository path', () => {
    expect(binding).toContain(
      'prompt_source: .newchobo/harness/scheduled-task-bindings.md#<binding-key>',
    );
  });

  it('fails closed instead of treating missing control as repair instructions', () => {
    expect(binding).toContain('fails closed');
    expect(binding).toContain('never reconstructs');
  });

  it('does not reintroduce the superseded private-control path', () => {
    expect(binding).not.toContain('.newchobo/automation/chatgpt-scheduled-task-bindings.md');
  });
});
