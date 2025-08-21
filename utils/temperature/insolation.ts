import  World from '../../types/World.ts'
import type Hex from '../../types/Hex.ts'
import getMonthMidpoint from '../calendar/month-mid.ts'
import degreesToRadians from '../math/degrees-to-radians.ts'
import calculateDeclination from './declination.ts'

/**
 * Returns the daily-mean top-of-atmosphere (TOA) insolation for the
 * mid-point of the given month at the hexagon’s latitude.
 * @param {World} world - The world under consideration.
 * @param {Hex} hex - The hexagon under consideration.
 * @param {string | number} month - The month to calculate insolation for.
 * @returns = The daily-mean top-of-atmosphere (TOA) insolation for the
 *   mid-point of the given month at the hexagon's latitude in watts per square
 *   meter (W/m²).
 */

const calculateInsolation =  (world: World, hex: Hex, month: string | number): number => {
  const mid = getMonthMidpoint(world, month)
  const latitude = degreesToRadians(hex.center.latitude)
  const declination = calculateDeclination(world, mid)
  const sunrise = -Math.tan(latitude) * Math.tan(declination)
  const h0 = sunrise >= 1 ? 0 : sunrise <= -1 ? Math.PI : Math.acos(sunrise)
  const daily =
    (world.solar / Math.PI) *
    (h0 * Math.sin(latitude) * Math.sin(declination) +
      Math.cos(latitude) * Math.cos(declination) * Math.sin(h0))
  return Math.max(0, daily)
}

export default calculateInsolation
