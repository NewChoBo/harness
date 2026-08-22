import { describe, expect, it } from 'vitest';

import { validateAgentContract } from '../src/index.js';
import type { AgentAdapterManifest } from '../src/index.js';

function adapterManifest(): AgentAdapterManifest {
  return {
    schema_version: 1,
    kind: 'agent_adapter',
    id: 'example.local-coding-agent',
    runner_type: 'coding_agent',
    interface: {
      kind: 'sdk',
      implementation: 'example-local-coding-adapter',
    },
    operations: [
      'discover',
      'create_session',
      'submit_work',
      'steer',
      'resume',
      'cancel',
      'get_result',
      'dispose',
    ],
    capabilities: {
      session: {
        persistent: 'supported',
        resumable: 'supported',
        steerable: 'supported',
        pausable: 'unsupported',
        cancellable: 'supported',
      },
      workspace: {
        read: 'supported',
        write: 'supported',
      },
      scm: {
        read: 'supported',
        commit: 'supported',
        push: 'unknown',
        merge: 'unsupported',
      },
      tools: {
        shell: 'supported',
        browser: 'unknown',
        mcp: 'supported',
        subagents: 'unknown',
      },
      output: {
        streaming_events: 'supported',
        structured_result: 'supported',
        effect_receipt: 'unsupported',
      },
    },
  };
}

describe('agent control contracts', () => {
  it('accepts a provider-neutral adapter manifest', () => {
    expect(validateAgentContract('manifest', adapterManifest())).toEqual([]);
  });

  it('rejects a supported session capability without its operation', () => {
    const manifest = adapterManifest();
    manifest.operations = manifest.operations.filter((operation) => operation !== 'resume');

    expect(validateAgentContract('manifest', manifest)).toContainEqual(
      expect.objectContaining({ code: 'ADAPTER_CAPABILITY_OPERATION_MISMATCH' }),
    );
  });

  it('rejects authority embedded in a capability manifest', () => {
    const manifest = { ...adapterManifest(), authority: { push: true } };

    expect(validateAgentContract('manifest', manifest)).toContainEqual(
      expect.objectContaining({ code: 'AGENT_CONTRACT_SCHEMA_INVALID' }),
    );
  });

  it('accepts a bounded work request', () => {
    expect(
      validateAgentContract('request', {
        schema_version: 1,
        kind: 'agent_work_request',
        request_id: 'request-1',
        work_id: 'work-1',
        role: 'worker',
        objective: 'Implement and validate one bounded change.',
        workspace: {
          root_ref: 'workspace://consumer/repository',
          read_only: false,
          allowed_paths: ['src/**', 'test/**'],
        },
        constraints: {
          requested_effects: ['read', 'write_files', 'run_commands', 'commit'],
          prohibited_effects: ['push', 'merge', 'release'],
        },
        validation: {
          required_checks: ['focused-tests'],
          result_schema: 'harness://schemas/result/1',
        },
      }),
    ).toEqual([]);
  });

  it('rejects conflicting or mutating effects for a read-only workspace', () => {
    const issues = validateAgentContract('request', {
      schema_version: 1,
      kind: 'agent_work_request',
      request_id: 'request-1',
      work_id: 'work-1',
      role: 'reviewer',
      objective: 'Review without mutation.',
      workspace: {
        root_ref: 'workspace://consumer/repository',
        read_only: true,
      },
      constraints: {
        requested_effects: ['read', 'write_files'],
        prohibited_effects: ['write_files'],
      },
    });

    expect(issues.map((item) => item.code)).toEqual([
      'AGENT_EFFECT_CONFLICT',
      'READ_ONLY_WORKSPACE_EFFECT',
    ]);
  });

  it('accepts normalized events and completion envelopes', () => {
    expect(
      validateAgentContract('event', {
        schema_version: 1,
        kind: 'agent_event',
        request_id: 'request-1',
        session_id: 'session-1',
        sequence: 0,
        type: 'session.accepted',
        timestamp: '2026-08-23T12:00:00Z',
      }),
    ).toEqual([]);

    expect(
      validateAgentContract('completion', {
        schema_version: 1,
        kind: 'agent_completion',
        request_id: 'request-1',
        session_id: 'session-1',
        terminal_state: 'completed',
        result: { status: 'candidate' },
        result_schema: 'harness://schemas/result/1',
        receipt_ref: 'harness://receipts/session-1',
      }),
    ).toEqual([]);
  });
});
