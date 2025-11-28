import { Specification } from './Specification.ts';
import { Shape } from '../entities/Shape.ts';

export class ByIdSpecification implements Specification<Shape> {
  constructor(private id: string) {}

  isSatisfiedBy(item: Shape): boolean {
    return item.id === this.id;
  }
}
