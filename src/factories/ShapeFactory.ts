import { Oval } from '../entities/Oval.ts';
import { Cone } from '../entities/Cone.ts';
import { Point } from '../entities/Point.ts';
import { DataValidator } from '../validators/DataValidator.ts';
import { InvalidDataError } from '../exceptions/InvalidDataError.ts';
import { logger } from '../utils/logger.ts';


export class ShapeFactory {
  static createFromLine(line: string): Oval | Cone {
    try {
      const parsed = DataValidator.parseLine(line);

      if (parsed.type === 'oval') {
        const [x1, y1, x2, y2] = parsed.numbers;
        const p1 = new Point(x1, y1);
        const p2 = new Point(x2, y2);
        const oval = new Oval(parsed.id, p1, p2);
        logger.debug({ action: 'create', shape: 'oval', id: parsed.id }, 'Oval created');
        return oval;
      }

      if (parsed.type === 'cone') {
        const [ax, ay, az, bx, by, bz, radius, height] = parsed.numbers;
        const apex = new Point(ax, ay, az);
        const baseCenter = new Point(bx, by, bz);
        const cone = new Cone(parsed.id, apex, baseCenter, radius, height);
        logger.debug({ action: 'create', shape: 'cone', id: parsed.id }, 'Cone created');
        return cone;
      }

      throw new InvalidDataError('Factory could not create shape: unsupported type', line);
    } catch (err) {
      if (err instanceof InvalidDataError) {
        logger.warn({ err: err.message, line }, 'Invalid input line skipped');
        throw err;
      }
      logger.error({ err: (err as Error).message, line }, 'Unexpected error while parsing line');
      throw new InvalidDataError('Unexpected error during parsing', line);
    }
  }
}
