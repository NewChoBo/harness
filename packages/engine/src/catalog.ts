import { access } from 'node:fs/promises';
import { isAbsolute } from 'node:path';

import { HarnessError } from './errors.js';
import { readStructuredFile } from './io.js';
import {
  assertInsideRoot,
  assertPathAncestorInsideRoot,
  assertRealPathInsideRoot,
  normalizeRoot,
  resolveRootRelative,
  toRootRelative,
} from './paths.js';
import type {
  CatalogOptions,
  HarnessCatalog,
  ResolvedCatalogResource,
  ValidationIssue,
} from './types.js';

const SUPPORTED_CATALOG_API_VERSIONS = new Set(['harness.example/v1alpha1']);

interface CatalogInspection {
  rootDir: string;
  catalogPath: string;
  catalog?: HarnessCatalog;
  issues: ValidationIssue[];
}

export async function validateCatalogFile(
  catalogPath: string,
  options: CatalogOptions = {},
): Promise<ValidationIssue[]> {
  return (await inspectCatalog(catalogPath, options)).issues;
}

export async function loadCatalog(
  catalogPath: string,
  options: CatalogOptions = {},
): Promise<HarnessCatalog> {
  const inspection = await inspectCatalog(catalogPath, options);
  if (!inspection.catalog || inspection.issues.length > 0) {
    const message = inspection.issues
      .map((item) => `[${item.code}] ${item.path}: ${item.message}`)
      .join('; ');
    throw new HarnessError(
      'CATALOG_INVALID',
      message || `Catalog is invalid: ${inspection.catalogPath}`,
      inspection.catalogPath,
    );
  }
  return inspection.catalog;
}

export async function resolveCatalogResources(
  catalogPath: string,
  resourceIds: string[] = [],
  options: CatalogOptions = {},
): Promise<ResolvedCatalogResource[]> {
  const catalog = await loadCatalog(catalogPath, options);
  const ids = resourceIds.length > 0 ? resourceIds : catalog.spec.resources.map((item) => item.id);
  const byId = new Map(catalog.spec.resources.map((item) => [item.id, item]));

  return ids.map((id) => {
    const resource = byId.get(id);
    if (!resource) {
      throw new HarnessError('RESOURCE_ID_NOT_FOUND', `Unknown Harness resource id: ${id}`, id);
    }

    return {
      id: resource.id,
      kind: resource.kind,
      path: resource.path,
      representation: resource.representation,
      provenance: normalizeProvenance(resource.provenance),
    };
  });
}

async function inspectCatalog(
  catalogPath: string,
  options: CatalogOptions,
): Promise<CatalogInspection> {
  const rootDir = normalizeRoot(options.rootDir ?? process.cwd());
  let absoluteCatalog: string;

  try {
    absoluteCatalog = isAbsolute(catalogPath)
      ? assertInsideRoot(rootDir, catalogPath)
      : resolveRootRelative(rootDir, catalogPath);
    await assertRealPathInsideRoot(rootDir, absoluteCatalog);
  } catch (error: unknown) {
    return {
      rootDir,
      catalogPath,
      issues: [issueFromError(error, catalogPath)],
    };
  }

  const rootRelativeCatalog = toRootRelative(rootDir, absoluteCatalog);
  let raw: unknown;
  try {
    raw = await readStructuredFile<unknown>(absoluteCatalog);
  } catch (error: unknown) {
    return {
      rootDir,
      catalogPath: rootRelativeCatalog,
      issues: [issueFromError(error, rootRelativeCatalog)],
    };
  }

  const issues = validateCatalogShape(raw);
  if (issues.length > 0) {
    return {
      rootDir,
      catalogPath: rootRelativeCatalog,
      issues,
    };
  }

  const catalog = raw as HarnessCatalog;
  issues.push(
    ...(await validateCatalogReferences(catalog, rootDir, options.verifyResourcePaths ?? true)),
  );

  return {
    rootDir,
    catalogPath: rootRelativeCatalog,
    catalog,
    issues,
  };
}

function validateCatalogShape(value: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!isRecord(value)) {
    return [issue('CATALOG_SHAPE_INVALID', '/', 'Catalog root must be an object.')];
  }

  if (typeof value.apiVersion !== 'string' || value.apiVersion.length === 0) {
    issues.push(
      issue('CATALOG_SHAPE_INVALID', '/apiVersion', 'apiVersion must be a non-empty string.'),
    );
  } else if (!SUPPORTED_CATALOG_API_VERSIONS.has(value.apiVersion)) {
    issues.push(
      issue(
        'CATALOG_API_VERSION_UNSUPPORTED',
        '/apiVersion',
        `Unsupported Harness catalog apiVersion: ${value.apiVersion}`,
      ),
    );
  }
  if (value.kind !== 'HarnessCatalog') {
    issues.push(issue('CATALOG_SHAPE_INVALID', '/kind', 'kind must be HarnessCatalog.'));
  }
  if (
    !isRecord(value.metadata) ||
    typeof value.metadata.name !== 'string' ||
    value.metadata.name.length === 0
  ) {
    issues.push(
      issue('CATALOG_SHAPE_INVALID', '/metadata/name', 'metadata.name must be a non-empty string.'),
    );
  }
  if (
    isRecord(value.metadata) &&
    value.metadata.status !== undefined &&
    typeof value.metadata.status !== 'string'
  ) {
    issues.push(
      issue(
        'CATALOG_SHAPE_INVALID',
        '/metadata/status',
        'metadata.status must be a string when present.',
      ),
    );
  }
  if (!isRecord(value.spec)) {
    issues.push(issue('CATALOG_SHAPE_INVALID', '/spec', 'spec must be an object.'));
    return issues;
  }
  if (!isRecord(value.spec.canonicality)) {
    issues.push(
      issue('CATALOG_SHAPE_INVALID', '/spec/canonicality', 'canonicality must be an object.'),
    );
  } else {
    if (
      typeof value.spec.canonicality.scope !== 'string' ||
      value.spec.canonicality.scope.length === 0
    ) {
      issues.push(
        issue(
          'CATALOG_SHAPE_INVALID',
          '/spec/canonicality/scope',
          'canonicality.scope must be a non-empty string.',
        ),
      );
    }
    if (
      typeof value.spec.canonicality.behaviorSource !== 'string' ||
      value.spec.canonicality.behaviorSource.length === 0
    ) {
      issues.push(
        issue(
          'CATALOG_SHAPE_INVALID',
          '/spec/canonicality/behaviorSource',
          'canonicality.behaviorSource must be a non-empty string.',
        ),
      );
    }
    const authority = value.spec.canonicality.decisionRecordAuthority;
    if (authority !== undefined) {
      if (!isRecord(authority)) {
        issues.push(
          issue(
            'CATALOG_SHAPE_INVALID',
            '/spec/canonicality/decisionRecordAuthority',
            'decisionRecordAuthority must be an object when present.',
          ),
        );
      } else {
        for (const [key, item] of Object.entries(authority)) {
          if (typeof item !== 'string' || item.length === 0) {
            issues.push(
              issue(
                'CATALOG_SHAPE_INVALID',
                `/spec/canonicality/decisionRecordAuthority/${key}`,
                'Decision authority metadata values must be non-empty strings.',
              ),
            );
          }
        }
      }
    }
  }

  if (!Array.isArray(value.spec.resources)) {
    issues.push(issue('CATALOG_SHAPE_INVALID', '/spec/resources', 'resources must be an array.'));
    return issues;
  }

  for (const [index, resource] of value.spec.resources.entries()) {
    const path = `/spec/resources/${index}`;
    if (!isRecord(resource)) {
      issues.push(issue('CATALOG_SHAPE_INVALID', path, 'resource must be an object.'));
      continue;
    }
    for (const field of ['id', 'kind', 'path', 'representation'] as const) {
      const fieldValue = resource[field];
      if (typeof fieldValue !== 'string' || fieldValue.length === 0) {
        issues.push(
          issue(
            'CATALOG_SHAPE_INVALID',
            `${path}/${field}`,
            `${field} must be a non-empty string.`,
          ),
        );
      }
    }
    const provenance = resource.provenance;
    if (
      provenance !== undefined &&
      !(
        typeof provenance === 'string' ||
        (Array.isArray(provenance) && provenance.every((item) => typeof item === 'string'))
      )
    ) {
      issues.push(
        issue(
          'CATALOG_SHAPE_INVALID',
          `${path}/provenance`,
          'provenance must be a string or an array of strings.',
        ),
      );
    }
  }

  return issues;
}

async function validateCatalogReferences(
  catalog: HarnessCatalog,
  rootDir: string,
  verifyResourcePaths: boolean,
): Promise<ValidationIssue[]> {
  const issues: ValidationIssue[] = [];
  const seen = new Map<string, number>();

  for (const [index, resource] of catalog.spec.resources.entries()) {
    const prior = seen.get(resource.id);
    if (prior !== undefined) {
      issues.push(
        issue(
          'CATALOG_RESOURCE_ID_DUPLICATE',
          `/spec/resources/${index}/id`,
          `Resource id ${resource.id} duplicates /spec/resources/${prior}/id.`,
        ),
      );
    } else {
      seen.set(resource.id, index);
    }

    let absoluteResource: string;
    try {
      absoluteResource = resolveRootRelative(rootDir, resource.path);
    } catch (error: unknown) {
      issues.push(issueFromError(error, `/spec/resources/${index}/path`));
      continue;
    }

    const exists = await access(absoluteResource).then(
      () => true,
      () => false,
    );

    if (!exists) {
      try {
        // Missing paths may be tolerated by callers, but a missing final component must
        // not hide a nearest existing ancestor that resolves outside the Harness root.
        await assertPathAncestorInsideRoot(rootDir, absoluteResource);
      } catch (error: unknown) {
        issues.push(issueFromError(error, `/spec/resources/${index}/path`));
        continue;
      }

      if (verifyResourcePaths) {
        issues.push(
          issue(
            'RESOURCE_PATH_NOT_FOUND',
            `/spec/resources/${index}/path`,
            `Canonical resource path does not exist: ${resource.path}`,
          ),
        );
      }
      continue;
    }

    // Root confinement is a security invariant, not an optional existence check.
    // Existing paths must remain confined even when missing-path reporting is disabled.
    try {
      await assertRealPathInsideRoot(rootDir, absoluteResource);
    } catch (error: unknown) {
      issues.push(issueFromError(error, `/spec/resources/${index}/path`));
    }
  }

  return issues;
}

function normalizeProvenance(value: string | string[] | undefined): string[] {
  if (value === undefined) {
    return [];
  }
  return Array.isArray(value) ? [...value] : [value];
}

function issueFromError(error: unknown, path: string): ValidationIssue {
  if (error instanceof HarnessError) {
    return issue(error.code, path, error.message);
  }
  const message = error instanceof Error ? error.message : String(error);
  return issue('ENGINE_ERROR', path, message);
}

function issue(code: string, path: string, message: string): ValidationIssue {
  return { code, path, message };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
