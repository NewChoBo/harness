export class HarnessConfigError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly path?: string,
  ) {
    super(message);
    this.name = 'HarnessConfigError';
  }
}
