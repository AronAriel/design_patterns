import { InvalidDataError } from '../exceptions/InvalidDataError.ts';

const NUMBER_RE = /^-?\d+(\.\d+)?$/i;
type ParsedLine = {
  type: 'oval' | 'cone';
  id: string;
  numbers: number[]; 
};

export class DataValidator {
  static trimAndSplit(line: string): string[] {
    return line.trim().split(/\s+/).filter((s) => s.length > 0);
  }

  static isNumberToken(token: string): boolean {
    return NUMBER_RE.test(token);
  }

  static parseLine(line: string): ParsedLine {
    const raw = line ?? '';
    const parts = this.trimAndSplit(raw);
    if (parts.length === 0) {
      throw new InvalidDataError('Empty line', line);
    }

    const typeToken = parts[0].toLowerCase();
    if (typeToken !== 'oval' && typeToken !== 'cone') {
      throw new InvalidDataError(`Unknown shape type: ${parts[0]}`, line);
    }

    if (parts.length < 2) {
      throw new InvalidDataError('Missing id/token', line);
    }

    const id = parts[1];

    const paramTokens = parts.slice(2);
    if (paramTokens.length === 0) {
      throw new InvalidDataError('Missing numeric parameters', line);
    }

    if (!paramTokens.every((t) => this.isNumberToken(t))) {
      throw new InvalidDataError('One or more parameters are not valid numbers', line);
    }

    const nums = paramTokens.map((t) => Number(t));

    if (typeToken === 'oval') {
      if (nums.length < 4) {
        throw new InvalidDataError('Oval requires 4 numeric parameters: x1 y1 x2 y2', line);
      }
      const [x1, y1, x2, y2] = nums.slice(0, 4);
      if (x1 === x2 || y1 === y2) {
        throw new InvalidDataError('Oval points must not be on the same X or Y coordinate (zero width/height)', line);
      }
      return { type: 'oval', id, numbers: nums.slice(0, 4) };
    }

    if (typeToken === 'cone') {
      if (nums.length < 8) {
        throw new InvalidDataError(
          'Cone requires 8 numeric parameters: ax ay az bx by bz radius height',
          line
        );
      }

      const radius = nums[6];
      const height = nums[7];
      if (radius <= 0) {
        throw new InvalidDataError('Cone radius must be positive', line);
      }
      if (height <= 0) {
        throw new InvalidDataError('Cone height must be positive', line);
      }
      return { type: 'cone', id, numbers: nums.slice(0, 8) };
    }

    throw new InvalidDataError('Unsupported shape type', line);
  }
}
