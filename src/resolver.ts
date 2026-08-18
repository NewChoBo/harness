import { access } from 'node:fs/promises';
import { resolve } from 'node:path';

import { HarnessConfigError } from './errors.js';
import { readStructuredFile } from './io.js';
import { assertInsideRoot, normalizeRoot, resolveReference, toRootRelative } from './paths.js';
import { presetShapeErrors, validatePresetShape } from './schema.js';
import type {
  AuthorityContract,
  ChecklistReferences,
  PresetDocument,
  PublicBoundary,
  ResolvedWorkflow,
  ResolveOptions,
  SourceGate,
} from './types.js';

interface ResolutionNode {
  workflow: PresetDocument;
  provenance: string[];
}

export async function resolvePreset(
  presetPath: string,
  options: ResolveOptions = {},
): Promise<ResolvedWorkflow> {
  const rootDir = normalizeRoot(options.rootDir ?? process.cwd());
  const absolutePreset = assertInsideRoot(rootDir, resolve(rootDir, presetPath));
  const cache = new Map<string, ResolutionNode>();
  const node = await resolveNode(absolutePreset, rootDir, [], cache);

  return {
    ...withoutExtends(node.workflow),
    source_path: toRootRelative(rootDir, absolutePreset),
    resolved_from: node.provenance,
  };
}

async function resolveNode(
  filePath: string,
  rootDir: string,
  stack: string[],
  cache: Map<string, ResolutionNode>,
): Promise<ResolutionNode> {
  const cached = cache.get(filePath);
  if (cached) {
    return cached;
  }

  if (stack.includes(filePath)) {
    const cycle = [...stack.slice(stack.indexOf(filePath)), filePath]
      .map((path) => toRootRelative(rootDir, path))
      .join(' -> ');
    throw new HarnessConfigError(
      'INHERITANCE_CYCLE',
      `Preset inheritance cycle: ${cycle}`,
      filePath,
    );
  }

  await access(filePath).catch(() => {
    throw new HarnessConfigError(
      'PRESET_NOT_FOUND',
      `Preset file does not exist: ${toRootRelative(rootDir, filePath)}`,
      filePath,
    );
  });

  const raw = await readStructuredFile<unknown>(filePath);
  if (!validatePresetShape(raw)) {
    throw new HarnessConfigError(
      'SCHEMA_INVALID',
      `Invalid preset ${toRootRelative(rootDir, filePath)}: ${presetShapeErrors().join('; ')}`,
      filePath,
    );
  }

  const document = raw as PresetDocument;
  let merged: PresetDocument | undefined;
  let provenance: string[] = [];
  const nextStack = [...stack, filePath];

  for (const parentRef of document.extends ?? []) {
    const parentPath = resolveReference(rootDir, filePath, parentRef);
    const parent = await resolveNode(parentPath, rootDir, nextStack, cache);
    merged = merged ? mergePresets(merged, parent.workflow) : parent.workflow;
    provenance = appendUnique(provenance, parent.provenance);
  }

  const normalizedCurrent = normalizeReferences(document, filePath, rootDir);
  merged = merged ? mergePresets(merged, normalizedCurrent) : normalizedCurrent;
  provenance = appendUnique(provenance, [toRootRelative(rootDir, filePath)]);

  const result = { workflow: merged, provenance };
  cache.set(filePath, result);
  return result;
}

function normalizeReferences(
  document: PresetDocument,
  ownerFile: string,
  rootDir: string,
): PresetDocument {
  const normalized = withoutExtends(document);

  if (normalized.role) {
    normalized.role = {
      ...normalized.role,
      path: normalizeReference(rootDir, ownerFile, normalized.role.path),
    };
  }

  if (normalized.protocols) {
    normalized.protocols = normalized.protocols.map((reference) =>
      normalizeReference(rootDir, ownerFile, reference),
    );
  }

  if (normalized.checklists) {
    normalized.checklists = {
      common: normalized.checklists.common?.map((reference) =>
        normalizeReference(rootDir, ownerFile, reference),
      ),
      role: normalized.checklists.role?.map((reference) =>
        normalizeReference(rootDir, ownerFile, reference),
      ),
    };
  }

  if (normalized.result_schema) {
    normalized.result_schema = normalizeReference(rootDir, ownerFile, normalized.result_schema);
  }

  return normalized;
}

function normalizeReference(rootDir: string, ownerFile: string, reference: string): string {
  return toRootRelative(rootDir, resolveReference(rootDir, ownerFile, reference));
}

export function mergePresets(base: PresetDocument, overlay: PresetDocument): PresetDocument {
  return {
    schema_version: 1,
    kind: 'workflow_automation_preset',
    id: overlay.id || base.id,
    role: overlay.role ?? base.role,
    protocols: mergeStringLists(base.protocols, overlay.protocols),
    checklists: mergeChecklists(base.checklists, overlay.checklists),
    delegation: mergeRecord(base.delegation, overlay.delegation),
    authority: mergeAuthority(base.authority, overlay.authority),
    review: mergeRecord(base.review, overlay.review),
    source_gates: mergeSourceGates(base.source_gates, overlay.source_gates),
    state: mergeRecord(base.state, overlay.state),
    result_schema: overlay.result_schema ?? base.result_schema,
    public_boundary: mergePublicBoundary(base.public_boundary, overlay.public_boundary),
    metadata: mergeRecord(base.metadata, overlay.metadata),
  };
}

function mergeChecklists(
  base?: ChecklistReferences,
  overlay?: ChecklistReferences,
): ChecklistReferences | undefined {
  if (!base && !overlay) {
    return undefined;
  }
  return {
    common: mergeStringLists(base?.common, overlay?.common),
    role: mergeStringLists(base?.role, overlay?.role),
  };
}

function mergeAuthority(
  base?: AuthorityContract,
  overlay?: AuthorityContract,
): AuthorityContract | undefined {
  if (!base && !overlay) {
    return undefined;
  }
  return {
    ...base,
    ...overlay,
    write_scopes: overlay?.write_scopes ?? base?.write_scopes,
    forbidden_write_scopes: overlay?.forbidden_write_scopes ?? base?.forbidden_write_scopes,
  };
}

function mergePublicBoundary(
  base?: PublicBoundary,
  overlay?: PublicBoundary,
): PublicBoundary | undefined {
  if (!base && !overlay) {
    return undefined;
  }
  return {
    enabled: overlay?.enabled ?? base?.enabled ?? false,
    forbidden_terms: mergeStringLists(base?.forbidden_terms, overlay?.forbidden_terms),
  };
}

function mergeSourceGates(base?: SourceGate[], overlay?: SourceGate[]): SourceGate[] | undefined {
  if (!base && !overlay) {
    return undefined;
  }
  const byId = new Map<string, SourceGate>();
  for (const gate of [...(base ?? []), ...(overlay ?? [])]) {
    byId.set(gate.id, { ...byId.get(gate.id), ...gate });
  }
  return [...byId.values()];
}

function mergeStringLists(base?: string[], overlay?: string[]): string[] | undefined {
  if (!base && !overlay) {
    return undefined;
  }
  return appendUnique(base ?? [], overlay ?? []);
}

function mergeRecord<T extends object>(base?: T, overlay?: T): T | undefined {
  if (!base && !overlay) {
    return undefined;
  }
  return { ...(base ?? {}), ...(overlay ?? {}) } as T;
}

function appendUnique(existing: string[], incoming: string[]): string[] {
  return [...new Set([...existing, ...incoming])];
}

function withoutExtends(document: PresetDocument): PresetDocument {
  return { ...document, extends: undefined };
}
