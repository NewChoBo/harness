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

export type AgentContractKind = 'manifest' | 'request' | 'event' | 'completion';

export type AgentRunnerType =
  'hosted_agent' | 'direct_llm' | 'coding_agent' | 'deterministic_worker' | 'human_gateway';

export type AgentInterfaceKind = 'mcp' | 'acp' | 'sdk' | 'json_rpc' | 'cli' | 'http_api';

export type AgentCapabilityState = 'supported' | 'unsupported' | 'unknown';

export type AgentOperation =
  | 'discover'
  | 'create_session'
  | 'submit_work'
  | 'steer'
  | 'pause'
  | 'resume'
  | 'cancel'
  | 'get_result'
  | 'dispose';

export type AgentEffect =
  | 'read'
  | 'write_files'
  | 'run_commands'
  | 'commit'
  | 'push'
  | 'merge'
  | 'release'
  | 'external_write';

export type AgentEventType =
  | 'session.accepted'
  | 'session.started'
  | 'agent.message'
  | 'agent.progress'
  | 'tool.requested'
  | 'tool.completed'
  | 'input.required'
  | 'approval.required'
  | 'artifact.created'
  | 'checkpoint.created'
  | 'session.completed'
  | 'session.failed'
  | 'session.cancelled';

export type AgentCompletionState =
  'completed' | 'failed' | 'cancelled' | 'blocked' | 'input_required';

export interface AgentAdapterManifest {
  schema_version: 1;
  kind: 'agent_adapter';
  id: string;
  runner_type: AgentRunnerType;
  interface: {
    kind: AgentInterfaceKind;
    implementation: string;
    protocol_version?: string;
  };
  operations: AgentOperation[];
  capabilities: {
    session: {
      persistent: AgentCapabilityState;
      resumable: AgentCapabilityState;
      steerable: AgentCapabilityState;
      pausable: AgentCapabilityState;
      cancellable: AgentCapabilityState;
    };
    workspace: {
      read: AgentCapabilityState;
      write: AgentCapabilityState;
    };
    scm: {
      read: AgentCapabilityState;
      commit: AgentCapabilityState;
      push: AgentCapabilityState;
      merge: AgentCapabilityState;
    };
    tools: {
      shell: AgentCapabilityState;
      browser: AgentCapabilityState;
      mcp: AgentCapabilityState;
      subagents: AgentCapabilityState;
    };
    output: {
      streaming_events: AgentCapabilityState;
      structured_result: AgentCapabilityState;
      effect_receipt: AgentCapabilityState;
    };
  };
  metadata?: Record<string, unknown>;
}

export interface AgentWorkRequest {
  schema_version: 1;
  kind: 'agent_work_request';
  request_id: string;
  work_id: string;
  role: string;
  objective: string;
  idempotency_key?: string;
  workspace?: {
    root_ref: string;
    working_directory?: string;
    base_ref?: string;
    read_only: boolean;
    allowed_paths?: string[];
  };
  context?: {
    resources?: string[];
    instructions?: string[];
  };
  constraints?: {
    requested_effects?: AgentEffect[];
    prohibited_effects?: AgentEffect[];
    stop_conditions?: string[];
  };
  validation?: {
    required_checks?: string[];
    result_schema?: string;
  };
  budget?: {
    max_turns?: number;
    timeout_seconds?: number;
  };
  metadata?: Record<string, unknown>;
}

export interface AgentEvent {
  schema_version: 1;
  kind: 'agent_event';
  request_id: string;
  session_id: string;
  sequence: number;
  type: AgentEventType;
  timestamp: string;
  data?: Record<string, unknown>;
}

export interface AgentCompletion {
  schema_version: 1;
  kind: 'agent_completion';
  request_id: string;
  session_id: string;
  terminal_state: AgentCompletionState;
  result?: Record<string, unknown>;
  result_schema?: string;
  receipt_ref?: string;
  error?: {
    code: string;
    message: string;
    retryable?: boolean;
  };
  metadata?: Record<string, unknown>;
}
