import type World from '../../types/World.ts'
import type Hex from '../../types/Hex.ts'
import calculateBaseTemp from './base.ts'
import getPrevMonth from '../calendar/prev-month.ts'

/**
 * Applies Newtonian relazation to the base temperature to factor in
 * thermal inertia (e.g., six months of daylight in the summer isn't
 * enough to melt the ice caps because it's very cold to begin with).
 * This is also where a lot of our land vs. sea differences come into play,
 * as they hold on to heat differently.
 * @param {World} world - The world under consideration.
 * @param {Hex} hex - The hexagon under consideration.
 * @param {string | number} month - The month we're getting a relaxed
 *   temperature for.
 * @param {number?} prev - The previous month's temperature in degrees
 *   Celsius (°C). If not provided, the method gets the baseline temperature
 *   for that month, but a loop that moves forward through time, sending each
 *   month's temperature into the next calculation, is the only way to get
 *   reliable, long-term results.
 * @returns - The updated temperature for the hexagon after applying Newtonian
 *   relaxation, measured in degrees Celsius (°C)
 */

const calculateRelaxedTemp = (
  world: World,
  hex: Hex,
  month: string | number,
  prev?: number
): number => {
  const p = prev ?? calculateBaseTemp(world, hex, getPrevMonth(world, month).name)
  const base = calculateBaseTemp(world, hex, month)
  const { water, land } = world.temperature.inertia
  const baseInertia = (hex.type[0] * water) + (hex.type[1] * land)

  // Snow pack and ice caps reduce temperature changes.
  const hasSnow = p <= -5
  const warming = base > p
  const inertia = hasSnow && warming ? baseInertia * 0.5 : baseInertia

  return p + (inertia * (base - p))
}

export default calculateRelaxedTemp
