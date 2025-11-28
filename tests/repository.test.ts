import { expect } from 'chai';
import { ShapeRepository } from '../src/repositories/ShapeRepository.js';
import { Oval } from '../src/entities/Oval.js';
import { Cone } from '../src/entities/Cone.js';
import { Point } from '../src/entities/Point.js';
import { sortById, sortByName, sortByFirstPointX, sortByFirstPointY } from '../src/comparators/index.js';

describe('ShapeRepository', () => {
  it('add and find', () => {
    const repo = new ShapeRepository();
    const o = new Oval('o1', new Point(0, 0), new Point(1, 1));
    repo.add(o);
    expect(repo.findById('o1')).to.equal(o);
  });

  it('deleteById', () => {
    const repo = new ShapeRepository();
    const o = new Oval('o1', new Point(0, 0), new Point(1, 1));
    repo.add(o);
    expect(repo.deleteById('o1')).to.equal(true);
    expect(repo.findById('o1')).to.equal(undefined);
  });

  it('sort', () => {
    const repo = new ShapeRepository();
    const a = new Oval('a', new Point(2, 2), new Point(3, 3));
    const b = new Oval('b', new Point(0, 0), new Point(1, 1));
    const c = new Cone('c', new Point(1, 1, 0), new Point(2, 2, 0), 1, 1);
    repo.add(c);
    repo.add(a);
    repo.add(b);
    const sorted = repo.sort(sortById);
    expect(sorted.map((s) => s.id)).to.deep.equal(['a', 'b', 'c']);
    const sortedName = repo.sort(sortByName);
    expect(sortedName.map((s) => s.getName())).to.deep.equal(['Cone', 'Oval', 'Oval']);
    const sortedX = repo.sort(sortByFirstPointX);
    expect(sortedX[0].id).to.equal('b');
    const sortedY = repo.sort(sortByFirstPointY);
    expect(sortedY[0].id).to.equal('b');
  });
});
