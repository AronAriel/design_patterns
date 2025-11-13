import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ShapeFactory } from './factories/ShapeFactory.ts';
import { OvalService } from './services/Oval.ts';
import { ConeService } from './services/Cone.ts';
import { logger } from './utils/logger.ts';
import { Oval } from './entities/Oval.ts';
import { Cone } from './entities/Cone.ts';
import { InvalidDataError } from './exceptions/InvalidDataError.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../data/shapes.txt');

function main() {
  let lines: string[];
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    lines = fileContent.split(/\r?\n/);
  } catch (err) {
    logger.error({ err: (err as Error).message }, 'Failed to read data file');
    return;
  }

  for (const line of lines) {
    if (!line.trim()) continue; 

    try {
      const shape = ShapeFactory.createFromLine(line);

      if (shape instanceof Oval) {
        const area = OvalService.calculateArea(shape);
        const perimeter = OvalService.calculatePerimeter(shape);
        const isCircle = OvalService.isCircle(shape);
        const validPoints = OvalService.areValidPoints(shape);

        logger.info(
          { id: shape.id, area, perimeter, isCircle, validPoints },
          'Oval calculated'
        );
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
    } catch (err) {
      if (err instanceof InvalidDataError) {
        continue;
      }
      logger.error({ err: (err as Error).message, line }, 'Unexpected error');
    }
  }
}

main();
