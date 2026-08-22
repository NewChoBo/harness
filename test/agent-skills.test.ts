import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

const SKILL_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseSkillFrontmatter(source: string): Record<string, unknown> {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    throw new Error('SKILL.md must start with closed YAML frontmatter');
  }

  const frontmatter = match[1];
  if (frontmatter === undefined) {
    throw new Error('SKILL.md frontmatter body is missing');
  }

  const parsed: unknown = parse(frontmatter);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('SKILL.md frontmatter must be a YAML mapping');
  }

  return parsed as Record<string, unknown>;
}

function requireTrimmedString(
  metadata: Record<string, unknown>,
  field: string,
): string {
  const value = metadata[field];
  if (typeof value !== 'string') {
    throw new Error(`${field} must be a string`);
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    throw new Error(`${field} must not be empty`);
  }

  return trimmed;
}

function validateSkillDirectory(
  skillsRoot: string,
  directoryName: string,
): void {
  const skillFile = join(skillsRoot, directoryName, 'SKILL.md');
  if (!existsSync(skillFile)) {
    throw new Error(`skills/${directoryName} must contain SKILL.md`);
  }

  const metadata = parseSkillFrontmatter(readFileSync(skillFile, 'utf8'));
  const name = requireTrimmedString(metadata, 'name');
  const description = requireTrimmedString(metadata, 'description');

  if (name.length > 64) {
    throw new Error('name must be 1-64 characters');
  }
  if (!SKILL_NAME_PATTERN.test(name)) {
    throw new Error(
      'name must use lowercase letters, numbers, and single hyphens without leading or trailing hyphens',
    );
  }
  if (name !== directoryName) {
    throw new Error(`name must match parent directory: expected ${directoryName}`);
  }
  if (description.length > 1024) {
    throw new Error('description must be 1-1024 characters');
  }
}

function validateRepositorySkills(skillsRoot: string): string[] {
  const skillDirectories = readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const directoryName of skillDirectories) {
    validateSkillDirectory(skillsRoot, directoryName);
  }

  return skillDirectories;
}

function withTemporarySkills(run: (skillsRoot: string) => void): void {
  const root = mkdtempSync(join(tmpdir(), 'harness-agent-skills-'));
  const skillsRoot = join(root, 'skills');
  mkdirSync(skillsRoot);

  try {
    run(skillsRoot);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function writeSkill(
  skillsRoot: string,
  directoryName: string,
  source: string,
): void {
  const directory = join(skillsRoot, directoryName);
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, 'SKILL.md'), source);
}

describe('repository Agent Skills', () => {
  it('validates every discovered skill directory', () => {
    expect(validateRepositorySkills('skills')).toContain('overmind-control');
  });

  it('keeps overmind-control frontmatter minimal', () => {
    const source = readFileSync('skills/overmind-control/SKILL.md', 'utf8');
    const metadata = parseSkillFrontmatter(source);

    expect(Object.keys(metadata).sort()).toEqual(['description', 'name']);
  });

  it('rejects a discovered skill directory without SKILL.md', () => {
    withTemporarySkills((skillsRoot) => {
      mkdirSync(join(skillsRoot, 'missing-skill'));
      expect(() => validateRepositorySkills(skillsRoot)).toThrow(
        'skills/missing-skill must contain SKILL.md',
      );
    });
  });

  it('rejects missing, unclosed, malformed, or non-mapping frontmatter', () => {
    withTemporarySkills((skillsRoot) => {
      writeSkill(skillsRoot, 'missing-frontmatter', '# no frontmatter');
      expect(() => validateRepositorySkills(skillsRoot)).toThrow(
        'SKILL.md must start with closed YAML frontmatter',
      );
    });

    withTemporarySkills((skillsRoot) => {
      writeSkill(
        skillsRoot,
        'unclosed-frontmatter',
        '---\nname: unclosed-frontmatter\n',
      );
      expect(() => validateRepositorySkills(skillsRoot)).toThrow(
        'SKILL.md must start with closed YAML frontmatter',
      );
    });

    withTemporarySkills((skillsRoot) => {
      writeSkill(
        skillsRoot,
        'malformed-frontmatter',
        '---\nname: [broken\n---\n',
      );
      expect(() => validateRepositorySkills(skillsRoot)).toThrow();
    });

    withTemporarySkills((skillsRoot) => {
      writeSkill(
        skillsRoot,
        'list-frontmatter',
        '---\n- name\n- description\n---\n',
      );
      expect(() => validateRepositorySkills(skillsRoot)).toThrow(
        'SKILL.md frontmatter must be a YAML mapping',
      );
    });
  });

  it('requires string, non-blank name and description fields', () => {
    withTemporarySkills((skillsRoot) => {
      writeSkill(
        skillsRoot,
        'missing-name',
        '---\ndescription: portable description\n---\n',
      );
      expect(() => validateRepositorySkills(skillsRoot)).toThrow(
        'name must be a string',
      );
    });

    withTemporarySkills((skillsRoot) => {
      writeSkill(
        skillsRoot,
        'numeric-name',
        '---\nname: 42\ndescription: portable description\n---\n',
      );
      expect(() => validateRepositorySkills(skillsRoot)).toThrow(
        'name must be a string',
      );
    });

    withTemporarySkills((skillsRoot) => {
      writeSkill(
        skillsRoot,
        'blank-name',
        '---\nname: "   "\ndescription: portable description\n---\n',
      );
      expect(() => validateRepositorySkills(skillsRoot)).toThrow(
        'name must not be empty',
      );
    });

    withTemporarySkills((skillsRoot) => {
      writeSkill(
        skillsRoot,
        'missing-description',
        '---\nname: missing-description\n---\n',
      );
      expect(() => validateRepositorySkills(skillsRoot)).toThrow(
        'description must be a string',
      );
    });

    withTemporarySkills((skillsRoot) => {
      writeSkill(
        skillsRoot,
        'numeric-description',
        '---\nname: numeric-description\ndescription: 42\n---\n',
      );
      expect(() => validateRepositorySkills(skillsRoot)).toThrow(
        'description must be a string',
      );
    });
  });

  it('enforces portable skill names and parent-directory equality', () => {
    const invalidNames = [
      'Uppercase',
      '-leading',
      'trailing-',
      'double--hyphen',
    ];

    for (const invalidName of invalidNames) {
      withTemporarySkills((skillsRoot) => {
        writeSkill(
          skillsRoot,
          'portable-name',
          `---\nname: ${invalidName}\ndescription: portable description\n---\n`,
        );
        expect(() => validateRepositorySkills(skillsRoot)).toThrow(
          'name must use lowercase letters, numbers, and single hyphens without leading or trailing hyphens',
        );
      });
    }

    withTemporarySkills((skillsRoot) => {
      writeSkill(
        skillsRoot,
        'directory-name',
        '---\nname: other-name\ndescription: portable description\n---\n',
      );
      expect(() => validateRepositorySkills(skillsRoot)).toThrow(
        'name must match parent directory: expected directory-name',
      );
    });

    withTemporarySkills((skillsRoot) => {
      const longName = `a${'b'.repeat(64)}`;
      writeSkill(
        skillsRoot,
        'long-name',
        `---\nname: ${longName}\ndescription: portable description\n---\n`,
      );
      expect(() => validateRepositorySkills(skillsRoot)).toThrow(
        'name must be 1-64 characters',
      );
    });
  });

  it('requires non-empty descriptions no longer than 1024 characters', () => {
    withTemporarySkills((skillsRoot) => {
      writeSkill(
        skillsRoot,
        'empty-description',
        '---\nname: empty-description\ndescription: ""\n---\n',
      );
      expect(() => validateRepositorySkills(skillsRoot)).toThrow(
        'description must not be empty',
      );
    });

    withTemporarySkills((skillsRoot) => {
      writeSkill(
        skillsRoot,
        'long-description',
        `---\nname: long-description\ndescription: "${'x'.repeat(1025)}"\n---\n`,
      );
      expect(() => validateRepositorySkills(skillsRoot)).toThrow(
        'description must be 1-1024 characters',
      );
    });
  });
});
