import { Rational, rational } from '../rational';

export type ModuleEffect =
  | 'consumption'
  | 'pollution'
  | 'productivity'
  | 'quality'
  | 'speed';

export interface ModuleJson {
  consumption?: number | string;
  pollution?: number | string;
  productivity?: number | string;
  quality?: number | string;
  speed?: number | string;
  limitation?: string;
  sprays?: number;
  proliferator?: string;
}

export interface Module {
  consumption?: Rational;
  pollution?: Rational;
  productivity?: Rational;
  quality?: Rational;
  speed?: Rational;
  limitation?: string;
  sprays?: Rational;
  proliferator?: string;
}

export function parseModule(json: ModuleJson): Module;
export function parseModule(json: ModuleJson | undefined): Module | undefined;
export function parseModule(json: ModuleJson | undefined): Module | undefined {
  if (json == null) return;
  return {
    consumption: rational(json.consumption),
    pollution: rational(json.pollution),
    productivity: rational(json.productivity),
    quality: rational(json.quality),
    speed: rational(json.speed),
    limitation: json.limitation,
    sprays: rational(json.sprays),
    proliferator: json.proliferator,
  };
}
