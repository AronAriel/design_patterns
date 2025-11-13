import { expect } from 'chai';
import { Point } from '../src/entities/Point.js';
import { Oval } from '../src/entities/Oval.js';
import { OvalService } from '../src/services/Oval.js';

describe('OvalService', () => {
  const oval = new Oval('oval1', new Point(0, 0), new Point(4, 2));
  const degenerateOval = new Oval('oval2', new Point(1, 1), new Point(1, 5));

  it('calculates area and perimeter correctly for valid oval', () => {
    const area = OvalService.calculateArea(oval);
    const perimeter = OvalService.calculatePerimeter(oval);

    expect(area).to.be.a('number');
    expect(area).to.be.closeTo(Math.PI * 2 * 1, 0.01);
    expect(perimeter).to.be.greaterThan(0);
    expect(OvalService.isCircle(oval)).to.be.false;
    expect(OvalService.areValidPoints(oval)).to.be.true;
  });

  it('detects invalid oval points and zero area', () => {
    const valid = OvalService.areValidPoints(degenerateOval);
    const area = OvalService.calculateArea(degenerateOval);
    expect(valid).to.be.false;
    expect(area).to.be.equal(0);
    expect(OvalService.isCircle(degenerateOval)).to.be.false;
  });
});
