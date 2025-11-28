import { Specification } from './Specification.ts';
import { Shape } from '../entities/Shape.ts';
import { Oval } from '../entities/Oval.ts';
import { Cone } from '../entities/Cone.ts';

export class ByFirstQuadrantSpecification implements Specification<Shape> {
  isSatisfiedBy(item: Shape): boolean {
    if (item instanceof Oval) {
      return item.point1.x >= 0 && item.point1.y >= 0 && item.point2.x >= 0 && item.point2.y >= 0;
    }
    if (item instanceof Cone) {
      return item.apex.x >= 0 && item.apex.y >= 0 && item.baseCenter.x >= 0 && item.baseCenter.y >= 0;
    }
    return false;
  }
}
