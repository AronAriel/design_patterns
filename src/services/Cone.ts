import { Point } from '../entities/Point.ts';
import { Cone } from '../entities/Cone.ts';
import { InvalidInputException } from '../exceptions/InvalidInputException.ts';
import { logger } from '../utils/logger.ts';

export class ConeService {
  static calculateSlantHeight(cone: Cone): number {
    const { baseCenter, apex } = cone;
    const r = cone.radius;
    const h = Math.abs(apex.z - baseCenter.z);
    return Math.sqrt(r * r + h * h);
  }

  static calculateSurfaceArea(cone: Cone): number {
    const { radius } = cone;
    const l = this.calculateSlantHeight(cone);
    const res = Math.PI * radius * (radius + l);
    logger.debug({ coneId: cone.id, radius, slantHeight: l, surfaceArea: res }, 'Surface area calculated');
    return res;
  }

  static calculateVolume(cone: Cone): number {
    const { radius, baseCenter, apex } = cone;
    const h = Math.abs(apex.z - baseCenter.z);
    const res = (Math.PI * Math.pow(radius, 2) * h) / 3;
    logger.debug({ coneId: cone.id, radius, height: h, volume: res }, 'Volume calculated');
    return res;
  }

  static volumeRatio(cone: Cone, cutHeight: number): number {
    const { baseCenter, apex } = cone;
    const h = Math.abs(apex.z - baseCenter.z);
    if (cutHeight <= 0 || cutHeight >= h) {
      logger.warn({ cutHeight, coneId: cone.id }, 'Invalid cut height for cone');
      throw new InvalidInputException('Invalid cut height', String(cutHeight));
    }
    const numerator = Math.pow(cutHeight, 3);
    const denominator = Math.pow(h, 3) - Math.pow(cutHeight, 3);
    return numerator / denominator;
  }

  static isValidCone(cone: Cone): boolean {
    const { radius, baseCenter, apex } = cone;
    return radius > 0 && apex.z !== baseCenter.z;
  }

  static isBaseOnPlane(cone: Cone): boolean {
    const { baseCenter } = cone;
    return baseCenter.x === 0 || baseCenter.y === 0 || baseCenter.z === 0;
  }
}
