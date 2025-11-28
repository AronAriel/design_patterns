import { Shape } from './Shape.ts';
import { Point } from './Point.ts';

export class Oval extends Shape {
  public point1: Point;
  public point2: Point;

  constructor(id: string, point1: Point, point2: Point) {
    super(id);
    this.point1 = point1;
    this.point2 = point2;
  }

  getName(): string {
    return 'Oval';
  }

  setPoints(p1: Point, p2: Point): void {
    this.point1 = p1;
    this.point2 = p2;
    this.notifyObservers();
  }
}
