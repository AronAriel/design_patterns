import fs from 'fs';
import path from 'path';
import { ShapeFactory } from '../factories/ShapeFactory.ts';
import { InvalidDataError } from '../exceptions/InvalidDataError.ts';
import { FileReadException } from '../exceptions/FileReadException.ts';
import { Shape } from '../entities/Shape.ts';
import { logger } from './logger.ts';

export class Reader {
  static readShapesFromFile(filePath: string): Shape[] {
    try {
      const resolved = path.resolve(filePath);
      const cwd = process.cwd();
      const rel = path.relative(cwd, resolved);
      if (rel.startsWith('..') || path.isAbsolute(rel) && rel.includes('..')) {
        throw new FileReadException('File outside of project folder is not allowed', filePath);
      }

      const content = fs.readFileSync(resolved, 'utf-8');
      const lines = content.split(/\r?\n/);
      const shapes: Shape[] = [];
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const shape = ShapeFactory.createFromLine(line);
          shapes.push(shape);
        } catch (err) {
          if (err instanceof InvalidDataError) {
            logger.warn({ line }, 'Invalid input line skipped by Reader');
            continue;
          }
          logger.error({ err: (err as Error).message, line }, 'Unexpected error while creating shape');
        }
      }
      return shapes;
    } catch (err) {
      if (err instanceof FileReadException) {
        logger.error({ err: err.message, path: err.path }, 'File read failed');
        throw err;
      }
      logger.error({ err: (err as Error).message, path: filePath }, 'Failed to read file');
      throw new FileReadException('Failed to read file', filePath);
    }
  }
}
