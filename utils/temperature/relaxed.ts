import type World from '../../types/World.ts'
import type Cell from '../../types/Cell.ts'
import calculateBaseTemp from './base.ts'
import getPrevMonth from '../calendar/prev-month.ts'

/**
 * Applies Newtonian relazation to the base temperature to factor in
 * thermal inertia (e.g., six months of daylight in the summer isn't
 * enough to melt the ice caps because it's very cold to begin with).
 * This is also where a lot of our land vs. sea differences come into play,
 * as they hold on to heat differently.
 * @param {World} world - The world under consideration.
 * @param {Cell} cell - The cell under consideration.
 * @param {string | number} month - The month we're getting a relaxed
 *   temperature for.
 * @param {number?} prev - The previous month's temperature in degrees
 *   Celsius (°C). If not provided, the method gets the baseline temperature
 *   for that month, but a loop that moves forward through time, sending each
 *   month's temperature into the next calculation, is the only way to get
 *   reliable, long-term results.
 * @returns - The updated temperature for the cell after applying Newtonian
 *   relaxation, measured in degrees Celsius (°C)
 */

const calculateRelaxedTemp = (
  world: World,
  cell: Cell,
  month: string | number,
  prev?: number
): number => {
  const p = prev ?? calculateBaseTemp(world, cell, getPrevMonth(world, month).name)
  const base = calculateBaseTemp(world, cell, month)
  const { water, land } = world.temperature.inertia
  const inertia = cell.type === 'water' ? water : land
  return p + (inertia * (base - p))
}

export default calculateRelaxedTemp
