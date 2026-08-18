export { HarnessError } from './errors.js';
export { readStructuredFile } from './io.js';
export {
  loadCatalog,
  resolveCatalogResources,
  validateCatalogFile,
} from './catalog.js';
export {
  assertInsideRoot,
  normalizeRoot,
  resolveRootRelative,
  toRootRelative,
} from './paths.js';
export type {
  CatalogCanonicality,
  CatalogOptions,
  CatalogResource,
  HarnessCatalog,
  ResolvedCatalogResource,
  ValidationIssue,
} from './types.js';
