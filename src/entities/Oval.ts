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

  get semiMajorAxis(): number {
    return Math.abs(this.point1.x - this.point2.x) / 2;
  }

  get semiMinorAxis(): number {
    return Math.abs(this.point1.y - this.point2.y) / 2;
  }

  get center(): Point {
    const cx = (this.point1.x + this.point2.x) / 2;
    const cy = (this.point1.y + this.point2.y) / 2;
    return new Point(cx, cy);
  }
}
