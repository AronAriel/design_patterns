import { Shape } from '../entities/Shape.ts';
import { Specification } from '../specifications/Specification.ts';

export type Comparator<T> = (a: T, b: T) => number;

export class ShapeRepository {
  private data: Shape[] = [];

  add(shape: Shape): void {
    this.data.push(shape);
  }

  deleteById(id: string): boolean {
    const idx = this.data.findIndex((s) => s.id === id);
    if (idx === -1) return false;
    this.data.splice(idx, 1);
    return true;
  }

  findById(id: string): Shape | undefined {
    return this.data.find((s) => s.id === id);
  }

  find(spec?: Specification<Shape>): Shape[] {
    if (!spec) return [...this.data];
    return this.data.filter((s) => spec.isSatisfiedBy(s));
  }

  sort(comparator: Comparator<Shape>): Shape[] {
    return [...this.data].sort(comparator);
  }

  getAll(): Shape[] {
    return [...this.data];
  }
}
