import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import Ajv, { type ErrorObject, type ValidateFunction } from 'ajv';

const ajv = new Ajv({ allErrors: true, strict: false });

function loadBundledSchema(name: string): object {
  const filePath = fileURLToPath(new URL(`../schemas/${name}`, import.meta.url));
  return JSON.parse(readFileSync(filePath, 'utf8')) as object;
}

const presetValidator = ajv.compile(loadBundledSchema('preset.schema.json'));
const resultValidator = ajv.compile(loadBundledSchema('result.schema.json'));

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

export function compileSchema(schema: object): ValidateFunction {
  return ajv.compile(schema);
}

export function formatErrors(errors: ErrorObject[] | null | undefined): string[] {
  return (errors ?? []).map((error) => {
    const path = error.instancePath || '/';
    return `${path} ${error.message ?? 'is invalid'}`;
  });
}
