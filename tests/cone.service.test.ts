import { expect } from 'chai';
import { Cone } from '../src/entities/Cone.js';
import { Point } from '../src/entities/Point.js';
import { ConeService } from '../src/services/Cone.js';

describe('ConeService', () => {
  const cone = new Cone('cone1', new Point(0, 0, 5), new Point(0, 0, 0), 3, 5);
  const invalidCone = new Cone('cone2', new Point(0, 0, 1), new Point(0, 0, 1), 0, 5);

  it('computes surface area and volume correctly', () => {
    const area = ConeService.calculateSurfaceArea(cone);
    const volume = ConeService.calculateVolume(cone);

    expect(area).to.be.a('number');
    expect(volume).to.be.closeTo((1 / 3) * Math.PI * 3 ** 2 * 5, 0.01);
    expect(ConeService.isBaseOnPlane(cone)).to.be.true;
    expect(ConeService.isValidCone(cone)).to.be.true;
  });

  it('detects invalid cone with zero radius or degenerate height', () => {
    expect(ConeService.isValidCone(invalidCone)).to.be.false;
    expect(ConeService.calculateSurfaceArea(invalidCone)).to.be.a('number');
    expect(ConeService.calculateVolume(invalidCone)).to.be.equal(0);
  });
});
