import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { Ajv, type ErrorObject, type ValidateFunction } from 'ajv';

const ajv = new Ajv({ allErrors: true, strict: false });

function loadBundledSchema(name: string): object {
  const filePath = fileURLToPath(new URL(`../schemas/${name}`, import.meta.url));
  return JSON.parse(readFileSync(filePath, 'utf8')) as object;
}

const presetValidator = ajv.compile(loadBundledSchema('preset.schema.json'));
const resultValidator = ajv.compile(loadBundledSchema('result.schema.json'));
const harnessBundleValidator = ajv.compile(loadBundledSchema('harness-bundle.schema.json'));
const projectHarnessValidator = ajv.compile(loadBundledSchema('project-harness.schema.json'));
const agentContractValidators = {
  manifest: ajv.compile(loadBundledSchema('agent-adapter.schema.json')),
  request: ajv.compile(loadBundledSchema('agent-work-request.schema.json')),
  event: ajv.compile(loadBundledSchema('agent-event.schema.json')),
  completion: ajv.compile(loadBundledSchema('agent-completion.schema.json')),
} as const;

export function validatePresetShape(value: unknown): boolean {
  return presetValidator(value) as boolean;
}

export function presetShapeErrors(): string[] {
  return formatErrors(presetValidator.errors);
}

export function validateBundledResultShape(value: unknown): boolean {
  return resultValidator(value) as boolean;
}

export function bundledResultShapeErrors(): string[] {
  return formatErrors(resultValidator.errors);
}

export function validateBundledHarnessBundleShape(value: unknown): boolean {
  return harnessBundleValidator(value) as boolean;
}

export function bundledHarnessBundleShapeErrors(): string[] {
  return formatErrors(harnessBundleValidator.errors);
}

export function validateBundledProjectHarnessShape(value: unknown): boolean {
  return projectHarnessValidator(value) as boolean;
}

export function bundledProjectHarnessShapeErrors(): string[] {
  return formatErrors(projectHarnessValidator.errors);
}

export function validateBundledAgentContractShape(
  kind: keyof typeof agentContractValidators,
  value: unknown,
): boolean {
  return agentContractValidators[kind](value) as boolean;
}

export function bundledAgentContractShapeErrors(
  kind: keyof typeof agentContractValidators,
): string[] {
  return formatErrors(agentContractValidators[kind].errors);
}

export function compileSchema(schema: object): ValidateFunction {
  return ajv.compile(schema);
}

export function formatErrors(errors: ErrorObject[] | null | undefined): string[] {
  return (errors ?? []).map((error) => {
    const path = error.instancePath || '/';
    return `${path} ${error.message ?? 'is invalid'}`;
  });
}
