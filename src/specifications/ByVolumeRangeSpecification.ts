import { Specification } from './Specification.ts';
import { Shape } from '../entities/Shape.ts';
import { Cone } from '../entities/Cone.ts';
import { ConeService } from '../services/Cone.ts';

export class ByVolumeRangeSpecification implements Specification<Shape> {
  constructor(private min: number, private max: number) {}

  isSatisfiedBy(item: Shape): boolean {
    if (!(item instanceof Cone)) return false;
    const v = ConeService.calculateVolume(item);
    return v >= this.min && v <= this.max;
  }
}
