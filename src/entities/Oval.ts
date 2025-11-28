import { Shape } from './Shape.ts';
import { Point } from './Point.ts';

export class Oval extends Shape {
  public readonly point1: Point;
  public readonly point2: Point;

  constructor(id: string, point1: Point, point2: Point) {
    super(id);
    this.point1 = point1;
    this.point2 = point2;
  }

  getName(): string {
    return 'Oval';
  }
}
