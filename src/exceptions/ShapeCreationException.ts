export class ShapeCreationException extends Error {
  public readonly data?: string;

  constructor(message: string, data?: string) {
    super(message);
    this.name = 'ShapeCreationException';
    this.data = data;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ShapeCreationException);
    }
  }
}
