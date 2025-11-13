import { Shape } from './Shape.ts';
import { Point } from './Point.ts';

export class Cone extends Shape {
  public readonly apex: Point;        
  public readonly baseCenter: Point;  
  public readonly radius: number;
  public readonly height: number;

  constructor(id: string, apex: Point, baseCenter: Point, radius: number, height: number) {
    super(id);
    this.apex = apex;
    this.baseCenter = baseCenter;
    this.radius = radius;
    this.height = height;
  }

  getName(): string {
    return 'Cone';
  }

  get axisLength(): number {
    return this.apex.distanceTo(this.baseCenter);
  }
}
