import { expect } from 'chai';
import { Oval } from '../src/entities/Oval.js';
import { Cone } from '../src/entities/Cone.js';
import { Point } from '../src/entities/Point.js';
import { sortById, sortByName, sortByFirstPointX, sortByFirstPointY } from '../src/comparators/index.js';

describe('Comparators', () => {
  it('sortById', () => {
    const a = new Oval('a', new Point(0, 0), new Point(1, 1));
    const b = new Oval('b', new Point(0, 0), new Point(1, 1));
    expect(sortById(a, b)).to.be.lessThan(0);
  });

  it('sortByName', () => {
    const a = new Oval('a', new Point(0, 0), new Point(1, 1));
    const c = new Cone('c', new Point(0, 0, 0), new Point(0, 0, 1), 1, 1);
    expect(sortByName(c, a)).to.be.lessThan(0); // Cone < Oval
  });

  it('sort by first point X/Y', () => {
    const a = new Oval('a', new Point(2, 0), new Point(3, 1));
    const b = new Oval('b', new Point(1, 0), new Point(2, 1));
    const comp = sortByFirstPointX(a, b);
    expect(a.point1.x).to.equal(2);
    expect(b.point1.x).to.equal(1);
    expect(comp).to.be.greaterThan(0);
    const arr = [a, b];
    const compY = sortByFirstPointY(a, b);
    expect(a.point1.y).to.equal(0);
    expect(b.point1.y).to.equal(0);
    expect(compY).to.be.equal(0);
    const arrY = [a, b];
  });
});
