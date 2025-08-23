import type Hex from '../../types/Hex.ts'
import type World from '../../types/World.ts'
import getAverage from '../math/avg.ts'
import getMonth from '../calendar/month.ts'

export const SEA_LEVEL_PRESSURE = 1013.25
const TREF = 15
const K_HPA_PER_C = 0.6
const A = 2.25577e-5
const EXP = 5.25588

/**
 * Calculate atmospheric pressure for a hexagon in a given month.
 * @param {World} world - The world under consideration.
 * @param {Hex} hex - The hexagon under consideration.
 * @param {string | number} month - The month under consideration.
 * @returns {number} - The atmospheric pressure for the hexagon given in the
 *   given month, in hectopascals (hPa).
 */

const calculatePressure = (world: World, hex: Hex, month: string | number): number => {
  const { name: m } = getMonth(world, month)
  const elevation = Math.max(0, getAverage(...hex.elevation))
  const bracket = Math.max(1 - A * elevation, 1e-6)
  const base = SEA_LEVEL_PRESSURE * Math.pow(bracket, EXP)
  const temp = hex.climate.temperatures[m]
  return base - K_HPA_PER_C * (temp - TREF)
}

export default calculatePressure
