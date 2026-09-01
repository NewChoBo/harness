export { HarnessError } from './errors.js';
export { readStructuredFile } from './io.js';
export { loadCatalog, resolveCatalogResources, validateCatalogFile } from './catalog.js';
export {
  LOCAL_LIVENESS_REASON,
  LOCAL_LIVENESS_STATE,
  classifyLocalLiveness,
} from './local-liveness.js';
export type {
  LocalExecutionExpectation,
  LocalLivenessMissingEvidence,
  LocalLivenessVerdict,
} from './local-liveness.js';
export { assertInsideRoot, normalizeRoot, resolveRootRelative, toRootRelative } from './paths.js';
export type {
  CatalogCanonicality,
  CatalogOptions,
  CatalogResource,
  HarnessCatalog,
  ResolvedCatalogResource,
  ValidationIssue,
} from './types.js';
