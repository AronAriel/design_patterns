import { Shape } from '../entities/Shape.ts';
import { Oval } from '../entities/Oval.ts';
import { Cone } from '../entities/Cone.ts';

export const sortById = (a: Shape, b: Shape) => a.id.localeCompare(b.id);

export const sortByName = (a: Shape, b: Shape) => a.getName().localeCompare(b.getName());

function firstPointX(shape: Shape): number {
  if (shape instanceof Oval) return shape.point1.x;
  if (shape instanceof Cone) return shape.apex.x;
  return 0;
}

export const sortByFirstPointX = (a: Shape, b: Shape) => firstPointX(a) - firstPointX(b);

function firstPointY(shape: Shape): number {
  if (shape instanceof Oval) return shape.point1.y;
  if (shape instanceof Cone) return shape.apex.y;
  return 0;
}

export const sortByFirstPointY = (a: Shape, b: Shape) => firstPointY(a) - firstPointY(b);
