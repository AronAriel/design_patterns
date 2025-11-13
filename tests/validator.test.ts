import { expect } from 'chai';
import { DataValidator } from '../src/validators/DataValidator.js';
import { InvalidDataError } from '../src/exceptions/InvalidDataError.js';

describe('DataValidator', () => {
  it('parses valid oval line', () => {
    const line = 'oval oval1 0 0 4 2';
    const parsed = DataValidator.parseLine(line);

    expect(parsed.type).to.equal('oval');
    expect(parsed.id).to.equal('oval1');
    expect(parsed.numbers).to.have.length(4);
    expect(parsed.numbers.every((n) => typeof n === 'number')).to.be.true;
  });

  it('parses valid cone line', () => {
    const line = 'cone cone1 0 0 5 0 0 0 3 5';
    const parsed = DataValidator.parseLine(line);

    expect(parsed.type).to.equal('cone');
    expect(parsed.numbers).to.have.length(8);
    expect(parsed.numbers[6]).to.be.greaterThan(0);
    expect(parsed.numbers[7]).to.be.greaterThan(0);
  });

  it('throws error for invalid numeric parameters', () => {
    const invalidLine = 'oval oval1 0 0 a 5';
    expect(() => DataValidator.parseLine(invalidLine)).to.throw(InvalidDataError);
  });

  it('throws error for negative cone height', () => {
    const line = 'cone cone2 1 2 3 1 2 3 3 -5';
    expect(() => DataValidator.parseLine(line)).to.throw(InvalidDataError);
  });
});
