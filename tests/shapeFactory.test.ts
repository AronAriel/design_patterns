import { expect } from 'chai';
import { ShapeFactory } from '../src/factories/ShapeFactory.js';
import { Oval } from '../src/entities/Oval.js';
import { Cone } from '../src/entities/Cone.js';
import { InvalidDataError } from '../src/exceptions/InvalidDataError.js';

describe('ShapeFactory', () => {
  it('creates valid Oval', () => {
    const line = 'oval oval1 0 0 4 2';
    const shape = ShapeFactory.createFromLine(line);
    expect(shape).to.be.instanceOf(Oval);
    expect(shape.id).to.equal('oval1');
    expect(shape.getName()).to.be.a('string');
  });

  it('creates valid Cone', () => {
    const line = 'cone cone1 0 0 5 0 0 0 3 5';
    const shape = ShapeFactory.createFromLine(line);
    expect(shape).to.be.instanceOf(Cone);
    expect(shape.id).to.equal('cone1');
    expect(shape.getName()).to.be.a('string');
  });

  it('throws for invalid input', () => {
    const line = 'oval invalid 1 2 a 4';
    expect(() => ShapeFactory.createFromLine(line)).to.throw(InvalidDataError);
  });

  it('throws for unknown shape type', () => {
    const line = 'triangle t1 0 0 1 1 2 2';
    expect(() => ShapeFactory.createFromLine(line)).to.throw(InvalidDataError);
  });
});
