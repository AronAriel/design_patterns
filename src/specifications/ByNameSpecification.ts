import { Specification } from './Specification.ts';
import { Shape } from '../entities/Shape.ts';

export class ByNameSpecification implements Specification<Shape> {
  constructor(private name: string) {}

  isSatisfiedBy(item: Shape): boolean {
    return item.getName().toLowerCase() === this.name.toLowerCase();
  }
}
