import type Hex from '../../types/Hex.ts'
import type World from '../../types/World.ts'
import calculateCirculationPressure from './circulation.ts'
import calculateThermalPressure from './thermal.ts'
import calculateContinentalPressure from './continental.ts'
import calculateOrographicPressure from './orographic.ts'

export const SEA_LEVEL_PRESSURE = 1013.25

/**
 * Calculate atmospheric pressure for a hexagon in a given month.
 * @param {World} world - The world under consideration.
 * @param {Hex} hex - The hexagon under consideration.
 * @param {string | number} month - The month under consideration.
 * @returns {number} - The atmospheric pressure for the hexagon given in the
 *   given month, in hectopascals (hPa).
 */

const calculatePressure = (world: World, hex: Hex, month: string | number): number => {
  const circulation = calculateCirculationPressure(hex)
  const thermalIntensity = (hex.type[0] > 0 ? 0.3 : 1.0)
  const thermal = calculateThermalPressure(world, hex, month) * thermalIntensity
  const continental = calculateContinentalPressure(world, hex, month)
  const orographic = calculateOrographicPressure(world, hex, month)
  return SEA_LEVEL_PRESSURE + circulation + thermal + continental + orographic
}

export default calculatePressure
