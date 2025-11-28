import { expect } from 'chai';
import { ByIdSpecification } from '../src/specifications/ByIdSpecification.js';
import { ByNameSpecification } from '../src/specifications/ByNameSpecification.js';
import { ByAreaRangeSpecification } from '../src/specifications/ByAreaRangeSpecification.js';
import { ByPerimeterRangeSpecification } from '../src/specifications/ByPerimeterRangeSpecification.js';
import { ByVolumeRangeSpecification } from '../src/specifications/ByVolumeRangeSpecification.js';
import { ByFirstQuadrantSpecification } from '../src/specifications/ByFirstQuadrantSpecification.js';
import { Oval } from '../src/entities/Oval.js';
import { Cone } from '../src/entities/Cone.js';
import { Point } from '../src/entities/Point.js';

describe('Specifications', () => {
  it('ByIdSpecification', () => {
    const o = new Oval('o1', new Point(0, 0), new Point(2, 2));
    const spec = new ByIdSpecification('o1');
    expect(spec.isSatisfiedBy(o)).to.equal(true);
    expect(spec.isSatisfiedBy(new Oval('o2', new Point(0, 0), new Point(1, 1)))).to.equal(false);
  });

  it('ByNameSpecification', () => {
    const o = new Oval('oval1', new Point(0, 0), new Point(2, 2));
    const spec = new ByNameSpecification('Oval');
    expect(spec.isSatisfiedBy(o)).to.equal(true);
    const c = new Cone('cone1', new Point(0, 0, 0), new Point(1, 1, 1), 1, 1);
    const specC = new ByNameSpecification('Cone');
    expect(specC.isSatisfiedBy(c)).to.equal(true);
  });

  it('ByAreaRangeSpecification', () => {
    const o = new Oval('o1', new Point(0, 0), new Point(2, 2));
    const spec = new ByAreaRangeSpecification(3, 10);
    expect(spec.isSatisfiedBy(o)).to.equal(true);
    const c = new Cone('cone1', new Point(0, 0, 0), new Point(0, 0, 1), 1, 2);
    const specC = new ByAreaRangeSpecification(10, 100);
    expect(specC.isSatisfiedBy(c)).to.equal(false);
  });

  it('ByPerimeterRangeSpecification', () => {
    const o = new Oval('o1', new Point(0, 0), new Point(2, 2));
    const spec = new ByPerimeterRangeSpecification(5, 20);
    expect(spec.isSatisfiedBy(o)).to.equal(true);
    const c = new Cone('cone1', new Point(0, 0, 0), new Point(0, 0, 1), 1, 2);
    const specC = new ByPerimeterRangeSpecification(6, 7);
    expect(specC.isSatisfiedBy(c)).to.equal(true);
  });

  it('ByVolumeRangeSpecification', () => {
    const c = new Cone('cone1', new Point(0, 0, 0), new Point(0, 0, 1), 1, 2);
    const spec = new ByVolumeRangeSpecification(1, 10);
    expect(spec.isSatisfiedBy(c)).to.equal(true);
    const o = new Oval('o1', new Point(0, 0), new Point(2, 2));
    expect(spec.isSatisfiedBy(o)).to.equal(false);
  });

  it('ByFirstQuadrantSpecification', () => {
    const o = new Oval('o1', new Point(1, 1), new Point(2, 2));
    const spec = new ByFirstQuadrantSpecification();
    expect(spec.isSatisfiedBy(o)).to.equal(true);
    const o2 = new Oval('o2', new Point(-1, 1), new Point(2, 2));
    expect(spec.isSatisfiedBy(o2)).to.equal(false);
    const c = new Cone('c1', new Point(1, 1, 0), new Point(2, 2, 0), 1, 1);
    expect(spec.isSatisfiedBy(c)).to.equal(true);
  });
});
