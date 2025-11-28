import { Shape } from './Shape.ts';
import { Point } from './Point.ts';

export class Cone extends Shape {
  public apex: Point;        
  public baseCenter: Point;  
  public radius: number;
  public height: number;

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

  setApex(point: Point): void {
    this.apex = point;
    this.notifyObservers();
  }

  setBaseCenter(point: Point): void {
    this.baseCenter = point;
    this.notifyObservers();
  }

  setRadius(radius: number): void {
    this.radius = radius;
    this.notifyObservers();
  }

  setHeight(height: number): void {
    this.height = height;
    this.notifyObservers();
  }
}
