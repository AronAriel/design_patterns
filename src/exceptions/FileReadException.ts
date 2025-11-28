export class FileReadException extends Error {
  public readonly path?: string;

  constructor(message: string, filePath?: string) {
    super(message);
    this.name = 'FileReadException';
    this.path = filePath;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FileReadException);
    }
  }
}
