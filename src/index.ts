export { HarnessConfigError } from './errors.js';
export { mergePresets, resolvePreset } from './resolver.js';
export { syncHarness } from './sync.js';
export { evaluateSecurityTransition } from './security-boundary.js';
export { validateResultDocument, validateWorkflow } from './validator.js';
export type {
  AuthorityContract,
  ChecklistReferences,
  PresetDocument,
  PublicBoundary,
  ResolvedWorkflow,
  ResolveOptions,
  RoleReference,
  RoleType,
  SourceGate,
  StateReferences,
  SyncResult,
  ValidationIssue,
} from './types.js';
export type {
  DisclosureStatus,
  IntegrityDerivation,
  IntegrityOrigin,
  SecurityProvenance,
  SecurityTransitionBlockReason,
  SecurityTransitionDecision,
  SecurityTransitionRequest,
  SensitiveTransition,
} from './security-boundary.js';
