import { toRationalEntities } from '~/helpers';

import { EnergyType } from '../enum/energy-type';
import { Rational, rational } from '../rational';
import { Entities } from '../utils';
import { ModuleEffect } from './module';
import { parseSilo, Silo, SiloJson } from './silo';

export interface MachineJson {
  /** If undefined, speed is based on belt speed */
  speed?: number | string;
  modules?: number | true;
  disallowedEffects?: ModuleEffect[];
  type?: EnergyType;
  /** Fuel categories, e.g. chemical or nuclear */
  fuelCategories?: string[];
  /** Indicates a specific fuel that must be used */
  fuel?: string;
  /** Energy consumption in kW */
  usage?: number | string;
  /** Drain in kW */
  drain?: number | string;
  /** Pollution in #/m */
  pollution?: number | string;
  silo?: SiloJson;
  consumption?: Entities<number | string>;
  /** Width and height in tiles (integers, unless off-grid entity like tree) */
  size?: [number, number];
  /** Productivity bonus that this machine always has */
  baseProductivity?: number | string;
  /** If true, hide the calculated number of machines */
  hideRate?: boolean;
  /** If true, tally totals by recipe instead of machine */
  totalRecipe?: boolean;
}

export interface Machine {
  /** If undefined, speed is based on belt speed */
  speed?: Rational;
  modules?: Rational | true;
  disallowedEffects?: ModuleEffect[];
  type?: EnergyType;
  /** Fuel categories, e.g. chemical or nuclear */
  fuelCategories?: string[];
  /** Indicates a specific fuel that must be used */
  fuel?: string;
  /** Energy consumption in kW */
  usage?: Rational;
  drain?: Rational;
  pollution?: Rational;
  silo?: Silo;
  consumption?: Entities<Rational>;
  /** Width and height in tiles (integers, unless off-grid entity like tree) */
  size?: [number, number];
  /** Productivity bonus that this machine always has */
  baseProductivity?: Rational;
  /** If true, hide the calculated number of machines */
  hideRate?: boolean;
  /** If true, tally totals by recipe instead of machine */
  totalRecipe?: boolean;
}

export function parseMachine(json: MachineJson): Machine;
export function parseMachine(
  json: MachineJson | undefined,
): Machine | undefined;
export function parseMachine(
  json: MachineJson | undefined,
): Machine | undefined {
  if (json == null) return;
  return {
    speed: rational(json.speed),
    modules: json.modules === true ? json.modules : rational(json.modules),
    disallowedEffects: json.disallowedEffects,
    type: json.type,
    fuelCategories: json.fuelCategories,
    fuel: json.fuel,
    usage: rational(json.usage),
    drain: rational(json.drain),
    pollution: rational(json.pollution),
    silo: parseSilo(json.silo),
    consumption: toRationalEntities(json.consumption),
    size: json.size,
    baseProductivity: rational(json.baseProductivity),
    hideRate: json.hideRate,
    totalRecipe: json.totalRecipe,
  };
}
