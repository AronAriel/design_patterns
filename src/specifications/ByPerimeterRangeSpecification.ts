import { Specification } from './Specification.ts';
import { Shape } from '../entities/Shape.ts';
import { Oval } from '../entities/Oval.ts';
import { Cone } from '../entities/Cone.ts';
import { OvalService } from '../services/Oval.ts';

export class ByPerimeterRangeSpecification implements Specification<Shape> {
  constructor(private min: number, private max: number) {}

  isSatisfiedBy(item: Shape): boolean {
    let p = 0;
    if (item instanceof Oval) {
      p = OvalService.calculatePerimeter(item);
    } else if (item instanceof Cone) {
      p = 2 * Math.PI * item.radius; // base circumference
    } else {
      return false;
    }
    return p >= this.min && p <= this.max;
  }
}
