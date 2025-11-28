export type ShapeObserver = (shape: Shape) => void;

export abstract class Shape {
  public readonly id: string;
  private observers: Set<ShapeObserver> = new Set();

  protected constructor(id: string) {
    this.id = id;
  }

  abstract getName(): string;

  addObserver(observer: ShapeObserver): void {
    this.observers.add(observer);
  }

  removeObserver(observer: ShapeObserver): void {
    this.observers.delete(observer);
  }

  protected notifyObservers(): void {
    for (const obs of this.observers) {
      try {
        obs(this);
      } catch {
        
      }
    }
  }
}
