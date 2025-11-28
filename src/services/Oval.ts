import { Point } from '../entities/Point.ts';
import { Oval } from '../entities/Oval.ts';
import { logger } from '../utils/logger.ts';

export class OvalService {
  static calculateSemiAxes(oval: Oval): { a: number; b: number } {
    const { point1, point2 } = oval;
    const a = Math.abs(point2.x - point1.x) / 2; 
    const b = Math.abs(point2.y - point1.y) / 2; 
    return { a, b };
  }

  static calculateArea(oval: Oval): number {
    const { a, b } = this.calculateSemiAxes(oval);
    return Math.PI * a * b;
  }

  static calculatePerimeter(oval: Oval): number {
    const { a, b } = this.calculateSemiAxes(oval);
    const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
    return Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
  }

  static isCircle(oval: Oval): boolean {
    const { a, b } = this.calculateSemiAxes(oval);
    const result = Math.abs(a - b) < 1e-6;
    logger.debug({ ovalId: oval.id, a, b, isCircle: result }, 'isCircle computed');
    return result;
  }

  static areValidPoints(oval: Oval): boolean {
    const { point1, point2 } = oval;
    return !(point1.x === point2.x || point1.y === point2.y);
  }

  static intersectsOneAxis(oval: Oval, distance: number): boolean {
    const { point1, point2 } = oval;
    const xCross = point1.x * point2.x < 0 && Math.abs(point1.y) <= distance && Math.abs(point2.y) <= distance;
    const yCross = point1.y * point2.y < 0 && Math.abs(point1.x) <= distance && Math.abs(point2.x) <= distance;
    const result = (xCross && !yCross) || (!xCross && yCross);
    logger.debug({ ovalId: oval.id, distance, intersectsOneAxis: result }, 'intersectsOneAxis computed');
    return result;
  }
}
