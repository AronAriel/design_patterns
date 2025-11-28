import path from 'path';
import { fileURLToPath } from 'url';
import { Reader } from './utils/Reader.ts';
import { OvalService } from './services/Oval.ts';
import { ConeService } from './services/Cone.ts';
import { logger } from './utils/logger.ts';
import { Oval } from './entities/Oval.ts';
import { Cone } from './entities/Cone.ts';
import { FileReadException } from './exceptions/FileReadException.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../data/shapes.txt');

function main() {
  let shapes = [];
  try {
    shapes = Reader.readShapesFromFile(DATA_FILE);
  } catch (err) {
    if (err instanceof FileReadException) {
      return;
    }
    logger.error({ err: (err as Error).message }, 'Unexpected error while reading shapes');
    return;
  }

  for (const shape of shapes) {
    if (shape instanceof Oval) {
      const area = OvalService.calculateArea(shape);
      const perimeter = OvalService.calculatePerimeter(shape);
      const isCircle = OvalService.isCircle(shape);
      const validPoints = OvalService.areValidPoints(shape);
      logger.info({ id: shape.id, area, perimeter, isCircle, validPoints }, 'Oval calculated');
    } else if (shape instanceof Cone) {
      const surfaceArea = ConeService.calculateSurfaceArea(shape);
      const volume = ConeService.calculateVolume(shape);
      const baseOnPlane = ConeService.isBaseOnPlane(shape);
      const validCone = ConeService.isValidCone(shape);
      logger.info(
        { id: shape.id, surfaceArea, volume, baseOnPlane, validCone },
        'Cone calculated'
      );
    }
  }
}

main();
