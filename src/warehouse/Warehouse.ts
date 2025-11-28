import { Shape } from '../entities/Shape.ts';
import { Oval } from '../entities/Oval.ts';
import { Cone } from '../entities/Cone.ts';
import { OvalService } from '../services/Oval.ts';
import { ConeService } from '../services/Cone.ts';

type Calculated = {
  area?: number;
  perimeter?: number;
  volume?: number;
};

export class Warehouse {
  private static _instance: Warehouse | null = null;
  private store: Map<string, Calculated> = new Map();
  private observers: Map<string, (shape: Shape) => void> = new Map();
  private shapes: Map<string, Shape> = new Map();

  private constructor() {}

  static getInstance(): Warehouse {
    if (!this._instance) this._instance = new Warehouse();
    return this._instance;
  }

  registerShape(shape: Shape) {
    this.computeAndStore(shape);
    const observer = () => this.computeAndStore(shape);
    this.observers.set(shape.id, observer);
    this.shapes.set(shape.id, shape);
    shape.addObserver(observer);
  }

  unregisterShape(shapeId: string) {
    this.store.delete(shapeId);
    const obs = this.observers.get(shapeId);
    const shape = this.shapes.get(shapeId);
    if (obs && shape) {
      shape.removeObserver(obs);
    }
    this.observers.delete(shapeId);
    this.shapes.delete(shapeId);
  }

  private computeAndStore(shape: Shape) {
    const calc: Calculated = {};
    if (shape instanceof Oval) {
      calc.area = OvalService.calculateArea(shape);
      calc.perimeter = OvalService.calculatePerimeter(shape);
    } else if (shape instanceof Cone) {
      calc.area = ConeService.calculateSurfaceArea(shape);
      calc.perimeter = 2 * Math.PI * shape.radius;
      calc.volume = ConeService.calculateVolume(shape);
    }
    this.store.set(shape.id, calc);
  }

  get(shapeId: string): Calculated | undefined {
    return this.store.get(shapeId);
  }

  getAll(): Map<string, Calculated> {
    return new Map(this.store);
  }
}
