export type RoleType = 'supervisor' | 'worker' | 'reviewer' | 'researcher';

export interface RoleReference {
  id: string;
  type: RoleType;
  path: string;
}

export interface ChecklistReferences {
  common?: string[];
  role?: string[];
}

export interface AuthorityContract {
  routine_implementation?: boolean;
  routine_source_review?: boolean;
  may_review_own_nontrivial_output?: boolean;
  write_scopes?: string[];
  forbidden_write_scopes?: string[];
}

export interface ReviewContract {
  required?: boolean;
}

export interface SourceGate {
  id: string;
  description?: string;
  required?: boolean;
}

export interface StateReferences {
  checkpoint?: string;
  result?: string;
}

export interface PublicBoundary {
  enabled: boolean;
  forbidden_terms?: string[];
}

export interface PresetDocument {
  schema_version: 1;
  kind: 'workflow_automation_preset';
  id: string;
  extends?: string[];
  role?: RoleReference;
  protocols?: string[];
  checklists?: ChecklistReferences;
  delegation?: Record<string, string>;
  authority?: AuthorityContract;
  review?: ReviewContract;
  source_gates?: SourceGate[];
  state?: StateReferences;
  result_schema?: string;
  public_boundary?: PublicBoundary;
  metadata?: Record<string, unknown>;
}

export interface ResolvedWorkflow extends Omit<PresetDocument, 'extends'> {
  source_path: string;
  resolved_from: string[];
}

export interface ValidationIssue {
  code: string;
  path: string;
  message: string;
}

export interface ResolveOptions {
  rootDir?: string;
}

export interface SyncResult {
  version: string;
  vendorPath: string;
  integrity: string;
  lockPath: string;
}
