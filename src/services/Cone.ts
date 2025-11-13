import { Point } from '../entities/Point.ts';
import { Cone } from '../entities/Cone.ts';

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
    return Math.PI * radius * (radius + l);
  }

  static calculateVolume(cone: Cone): number {
    const { radius, baseCenter, apex } = cone;
    const h = Math.abs(apex.z - baseCenter.z);
    return (Math.PI * Math.pow(radius, 2) * h) / 3;
  }

  static volumeRatio(cone: Cone, cutHeight: number): number {
    const { baseCenter, apex } = cone;
    const h = Math.abs(apex.z - baseCenter.z);
    if (cutHeight <= 0 || cutHeight >= h) throw new Error('Invalid cut height');
    return Math.pow(cutHeight, 3) / (Math.pow(h, 3) - Math.pow(cutHeight, 3));
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
