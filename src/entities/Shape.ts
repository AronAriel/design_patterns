export abstract class Shape {
  public readonly id: string;

  protected constructor(id: string) {
    this.id = id;
  }

  abstract getName(): string;
}
