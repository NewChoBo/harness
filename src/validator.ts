import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { readStructuredFile } from './io.js';
import { assertInsideRoot, normalizeRoot } from './paths.js';
import {
  bundledAgentContractShapeErrors,
  bundledResultShapeErrors,
  compileSchema,
  formatErrors,
  validateBundledAgentContractShape,
  validateBundledResultShape,
} from './schema.js';
import type {
  AgentAdapterManifest,
  AgentContractKind,
  AgentOperation,
  AgentWorkRequest,
  ResolvedWorkflow,
  ValidationIssue,
} from './types.js';

export function validateAgentContract(kind: AgentContractKind, value: unknown): ValidationIssue[] {
  if (!validateBundledAgentContractShape(kind, value)) {
    return bundledAgentContractShapeErrors(kind).map((message) =>
      issue('AGENT_CONTRACT_SCHEMA_INVALID', '/', message),
    );
  }

  if (kind === 'manifest') {
    return validateAdapterCapabilities(value as AgentAdapterManifest);
  }

  if (kind === 'request') {
    return validateAgentWorkRequest(value as AgentWorkRequest);
  }

  return [];
}

export async function validateWorkflow(
  workflow: ResolvedWorkflow,
  rootDir = process.cwd(),
): Promise<ValidationIssue[]> {
  const root = normalizeRoot(rootDir);
  const issues: ValidationIssue[] = [];

  if (!workflow.role) {
    issues.push(issue('ROLE_REQUIRED', '/role', 'Exactly one effective role is required.'));
  }

  for (const reference of referencedFiles(workflow)) {
    const absolute = assertInsideRoot(root, resolve(root, reference));
    await access(absolute).catch(() => {
      issues.push(
        issue('REFERENCE_NOT_FOUND', reference, `Referenced file does not exist: ${reference}`),
      );
    });
  }

  if (workflow.role?.type === 'supervisor') {
    if (workflow.authority?.routine_implementation === true) {
      issues.push(
        issue(
          'SUPERVISOR_IMPLEMENTATION_AUTHORITY',
          '/authority/routine_implementation',
          'Supervisor cannot gain routine implementation authority from a base preset.',
        ),
      );
    }
    if (workflow.authority?.routine_source_review === true) {
      issues.push(
        issue(
          'SUPERVISOR_SOURCE_REVIEW_AUTHORITY',
          '/authority/routine_source_review',
          'Supervisor cannot gain routine source-review authority from a base preset.',
        ),
      );
    }
  }

  if (
    workflow.review?.required === true &&
    workflow.role &&
    workflow.delegation?.independent_review === workflow.role.id
  ) {
    issues.push(
      issue(
        'SELF_REVIEW_CONFLICT',
        '/delegation/independent_review',
        'A review-required producer cannot delegate independent review to itself.',
      ),
    );
  }

  if (
    workflow.review?.required === true &&
    workflow.authority?.may_review_own_nontrivial_output === true
  ) {
    issues.push(
      issue(
        'SELF_APPROVAL_AUTHORITY',
        '/authority/may_review_own_nontrivial_output',
        'Review-required output cannot be self-approved as independent review.',
      ),
    );
  }

  for (const allowed of workflow.authority?.write_scopes ?? []) {
    for (const forbidden of workflow.authority?.forbidden_write_scopes ?? []) {
      if (scopesOverlap(allowed, forbidden)) {
        issues.push(
          issue(
            'WRITE_SCOPE_CONFLICT',
            '/authority/write_scopes',
            `Allowed and forbidden write scopes overlap: ${allowed} <> ${forbidden}`,
          ),
        );
      }
    }
  }

  if (workflow.public_boundary?.enabled) {
    const terms = workflow.public_boundary.forbidden_terms ?? [];
    if (terms.length > 0) {
      const scanTargets = referencedFiles(workflow);
      const configForScan = { ...workflow, public_boundary: undefined };
      const payloads: Array<{ path: string; text: string }> = [
        { path: workflow.source_path, text: JSON.stringify(configForScan) },
      ];

      for (const reference of scanTargets) {
        const absolute = assertInsideRoot(root, resolve(root, reference));
        const text = await readFile(absolute, 'utf8').catch(() => '');
        payloads.push({ path: reference, text });
      }

      for (const term of terms) {
        const needle = term.toLocaleLowerCase();
        for (const payload of payloads) {
          if (payload.text.toLocaleLowerCase().includes(needle)) {
            issues.push(
              issue(
                'PUBLIC_BOUNDARY_VIOLATION',
                payload.path,
                `Public-safe workflow contains forbidden term: ${term}`,
              ),
            );
          }
        }
      }
    }
  }

  return issues;
}

export async function validateResultDocument(
  value: unknown,
  customSchemaPath?: string,
): Promise<ValidationIssue[]> {
  let valid: boolean;
  let errors: string[];

  if (customSchemaPath) {
    const schema = await readStructuredFile<object>(customSchemaPath);
    const validator = compileSchema(schema);
    valid = validator(value) as boolean;
    errors = formatErrors(validator.errors);
  } else {
    valid = validateBundledResultShape(value);
    errors = bundledResultShapeErrors();
  }

  const issues = valid ? [] : errors.map((message) => issue('RESULT_SCHEMA_INVALID', '/', message));

  if (isRecord(value) && isRecord(value.evidence)) {
    const candidateSha = value.evidence.candidate_sha;
    const review = value.evidence.review;
    if (
      typeof candidateSha === 'string' &&
      isRecord(review) &&
      typeof review.candidate_sha === 'string' &&
      review.candidate_sha !== candidateSha
    ) {
      issues.push(
        issue(
          'REVIEW_SHA_MISMATCH',
          '/evidence/review/candidate_sha',
          'Review evidence must target the exact candidate SHA in the result.',
        ),
      );
    }
  }

  return issues;
}

function referencedFiles(workflow: ResolvedWorkflow): string[] {
  return [
    workflow.role?.path,
    ...(workflow.protocols ?? []),
    ...(workflow.checklists?.common ?? []),
    ...(workflow.checklists?.role ?? []),
    workflow.result_schema,
  ].filter((value): value is string => Boolean(value));
}

function scopesOverlap(left: string, right: string): boolean {
  const leftRoot = normalizeScope(left);
  const rightRoot = normalizeScope(right);
  return (
    leftRoot === rightRoot ||
    leftRoot.startsWith(`${rightRoot}/`) ||
    rightRoot.startsWith(`${leftRoot}/`)
  );
}

function normalizeScope(scope: string): string {
  return scope.replace(/\/\*\*$/, '').replace(/\/$/, '');
}

function validateAdapterCapabilities(manifest: AgentAdapterManifest): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const requiredOperations: Array<{
    capability: keyof AgentAdapterManifest['capabilities']['session'];
    operation: AgentOperation;
  }> = [
    { capability: 'resumable', operation: 'resume' },
    { capability: 'steerable', operation: 'steer' },
    { capability: 'pausable', operation: 'pause' },
    { capability: 'cancellable', operation: 'cancel' },
  ];

  for (const { capability, operation } of requiredOperations) {
    if (
      manifest.capabilities.session[capability] === 'supported' &&
      !manifest.operations.includes(operation)
    ) {
      issues.push(
        issue(
          'ADAPTER_CAPABILITY_OPERATION_MISMATCH',
          `/capabilities/session/${capability}`,
          `Capability ${capability} requires operation ${operation}.`,
        ),
      );
    }
  }

  return issues;
}

function validateAgentWorkRequest(request: AgentWorkRequest): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const requested = new Set(request.constraints?.requested_effects ?? []);
  const prohibited = new Set(request.constraints?.prohibited_effects ?? []);

  for (const effect of requested) {
    if (prohibited.has(effect)) {
      issues.push(
        issue(
          'AGENT_EFFECT_CONFLICT',
          '/constraints/requested_effects',
          `Effect ${effect} is both requested and prohibited.`,
        ),
      );
    }
  }

  if (request.workspace?.read_only) {
    for (const effect of ['write_files', 'commit', 'push', 'merge'] as const) {
      if (requested.has(effect)) {
        issues.push(
          issue(
            'READ_ONLY_WORKSPACE_EFFECT',
            '/constraints/requested_effects',
            `Read-only workspace cannot request effect ${effect}.`,
          ),
        );
      }
    }
  }

  return issues;
}

function issue(code: string, path: string, message: string): ValidationIssue {
  return { code, path, message };
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
