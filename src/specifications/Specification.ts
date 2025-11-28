import { Shape } from '../entities/Shape.ts';

export interface Specification<T> {
  isSatisfiedBy(item: T): boolean;
}

export class AndSpecification<T> implements Specification<T> {
  constructor(private left: Specification<T>, private right: Specification<T>) {}

  isSatisfiedBy(item: T): boolean {
    return this.left.isSatisfiedBy(item) && this.right.isSatisfiedBy(item);
  }
}
