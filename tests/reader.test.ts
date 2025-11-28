import { expect } from 'chai';
import path from 'path';
import { Reader } from '../src/utils/Reader.js';
import { FileReadException } from '../src/exceptions/FileReadException.js';
import { Shape } from '../src/entities/Shape.js';

describe('Reader', () => {
  it('reads shapes from data file and skips invalid lines', () => {
    const dataFile = path.resolve(process.cwd(), 'data', 'shapes.txt');
    const shapes: Shape[] = Reader.readShapesFromFile(dataFile);
    expect(shapes).to.be.an('array');
    expect(shapes.length).to.equal(3);
  });

  it('throws FileReadException when reading files outside the project folder', () => {
    const badFile = path.resolve('..', 'outside.txt');
    expect(() => Reader.readShapesFromFile(badFile)).to.throw(FileReadException);
  });
});
