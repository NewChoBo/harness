import { readFileSync } from 'node:fs';

import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

function parseSkillFrontmatter(source: string): Record<string, unknown> {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    throw new Error('SKILL.md must start with YAML frontmatter');
  }

  const parsed: unknown = parse(match[1]);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('SKILL.md frontmatter must be a YAML mapping');
  }

  return parsed as Record<string, unknown>;
}

function expectNonEmptyString(value: unknown, field: string) {
  expect(typeof value, `${field} must be a string`).toBe('string');
  expect((value as string).trim().length, `${field} must not be empty`).toBeGreaterThan(0);
}

describe('repository Agent Skills', () => {
  it('keeps overmind-control frontmatter minimal and portable', () => {
    const source = readFileSync('skills/overmind-control/SKILL.md', 'utf8');
    const metadata = parseSkillFrontmatter(source);

    expect(Object.keys(metadata).sort()).toEqual(['description', 'name']);
    expect(metadata.name).toBe('overmind-control');
    expectNonEmptyString(metadata.name, 'name');
    expectNonEmptyString(metadata.description, 'description');
  });

  it('rejects missing or malformed frontmatter', () => {
    expect(() => parseSkillFrontmatter('# no frontmatter')).toThrow(
      'SKILL.md must start with YAML frontmatter',
    );
    expect(() => parseSkillFrontmatter('---\nname: [broken\n---\n')).toThrow();
  });
});
