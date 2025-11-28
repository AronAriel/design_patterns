import { expect } from 'chai';
import { Warehouse } from '../src/warehouse/Warehouse.js';
import { Oval } from '../src/entities/Oval.js';
import { Cone } from '../src/entities/Cone.js';
import { Point } from '../src/entities/Point.js';

describe('Warehouse', () => {
  it('register and compute values', () => {
    const w = Warehouse.getInstance();
    const o = new Oval('o1', new Point(0, 0), new Point(2, 2));
    w.registerShape(o);
    const calc = w.get('o1');
    expect(calc).to.not.be.undefined;
    expect(calc!.area).to.be.greaterThan(0);
    expect(calc!.perimeter).to.be.greaterThan(0);
    const c = new Cone('c1', new Point(0, 0, 0), new Point(0, 0, 3), 1, 3);
    w.registerShape(c);
    const calcC = w.get('c1');
    expect(calcC).to.not.be.undefined;
    expect(calcC!.volume).to.be.greaterThan(0);
  });

  it('recompute on update', () => {
    const w = Warehouse.getInstance();
    const o = new Oval('o2', new Point(0, 0), new Point(1, 1));
    w.registerShape(o);
    const before = w.get('o2')!.area;
    o.setPoints(new Point(0, 0), new Point(2, 2));
    const after = w.get('o2')!.area;
    expect(after).to.be.greaterThan(before!);
  });
});
