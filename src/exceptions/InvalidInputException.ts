export class InvalidInputException extends Error {
  public readonly data?: string;

  constructor(message: string, data?: string) {
    super(message);
    this.name = 'InvalidInputException';
    this.data = data;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidInputException);
    }
  }
}
