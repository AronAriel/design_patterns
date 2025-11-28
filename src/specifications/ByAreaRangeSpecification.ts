import { Specification } from './Specification.ts';
import { Shape } from '../entities/Shape.ts';
import { Oval } from '../entities/Oval.ts';
import { Cone } from '../entities/Cone.ts';
import { OvalService } from '../services/Oval.ts';
import { ConeService } from '../services/Cone.ts';

export class ByAreaRangeSpecification implements Specification<Shape> {
  constructor(private min: number, private max: number) {}

  isSatisfiedBy(item: Shape): boolean {
    let area = 0;
    if (item instanceof Oval) {
      area = OvalService.calculateArea(item);
    } else if (item instanceof Cone) {
      area = ConeService.calculateSurfaceArea(item);
    } else {
      return false;
    }
    return area >= this.min && area <= this.max;
  }
}
