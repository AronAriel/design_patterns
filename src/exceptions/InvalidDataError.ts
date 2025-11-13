export class InvalidDataError extends Error {
  public readonly data?: string;

  constructor(message: string, data?: string) {
    super(message);
    this.name = 'InvalidDataError';
    this.data = data;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidDataError);
    }
  }
}
