import type World from '../../types/World.ts'
import getMonthMidpoint from './month-mid.ts'
import getYearFraction from './year-fraction.ts'

/**
 * Calculates the fraction of the year (0-1) that has passed when you reach
 * the mid-point of the month.
 * @param {World} world - The world under consideration.
 * @param {string | number} month - The name of the month or its 0-based index.
 * @returns - A number between 0 and 1, representing the fraction of the year
 *   that has passed half-way through the month.
 */

const getMonthYearFraction = (world: World, month: string | number): number => {
  const mid = getMonthMidpoint(world, month)
  return mid < 0 ? -1 : getYearFraction(world, mid)
}

export default getMonthYearFraction
