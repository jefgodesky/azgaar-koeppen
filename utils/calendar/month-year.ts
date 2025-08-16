import type World from '../../types/World.ts'
import getMonthStart from './month-start.ts'
import getMonth from './month.ts'
import getYearLength from './year.ts'
import getAverage from '../math/avg.ts'

/**
 * Calculates the fraction of the year (0-1) that has passed when you reach
 * the mid-point of the month.
 * @param {World} world - The world under consideration.
 * @param {string | number} month - The name of the month or its 0-based index.
 * @returns - A number between 0 and 1, representing the fraction of the year
 *   that has passed half-way through the month.
 */

const getMonthYearFraction = (world: World, month: string | number): number => {
  const { name } = getMonth(world, month)
  if (name === 'n/a') return -1

  const start = getMonthStart(world, month)
  const end = start + world.months[name]
  return getAverage(start, end) / getYearLength(world)
}

export default getMonthYearFraction
