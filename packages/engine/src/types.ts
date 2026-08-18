export type DecisionProvenance = string | string[];

export interface CatalogCanonicality {
  scope: string;
  behaviorSource: string;
  decisionRecordAuthority?: Record<string, string>;
}

export interface CatalogResource {
  id: string;
  kind: string;
  path: string;
  representation: string;
  provenance?: DecisionProvenance;
}

export interface HarnessCatalog {
  apiVersion: string;
  kind: 'HarnessCatalog';
  metadata: {
    name: string;
    status?: string;
  };
  spec: {
    canonicality: CatalogCanonicality;
    resources: CatalogResource[];
  };
}

export interface ValidationIssue {
  code: string;
  path: string;
  message: string;
}

export interface CatalogOptions {
  rootDir?: string;
  verifyResourcePaths?: boolean;
}

export interface ResolvedCatalogResource {
  id: string;
  kind: string;
  path: string;
  representation: string;
  provenance: string[];
}
