import type World from '../../types/World.ts'
import type Cell from '../../types/Cell.ts'
import calculateInsolation from './insolation.ts'
import clamp from '../clamp.ts'
import degreesToRadians from '../math/degrees-to-radians.ts'

/**
 * This method heuristically maps daily-mean TOA insolation to baseline
 * near-surface air temperature for a given month. This calculation is so
 * theoretical as to be practically useless, without any consideration for
 * winds, thermal inertia, or any of the other factors that go into real
 * temperature, but it is a starting point for our model so we can start
 * layering those factors in.
 * @param {World} world - The world under consideration.
 * @param {Cell} cell - The cell that we're finding the baseline temperature
 *   for.
 * @param {string | number} month - The month that we're finding the baseline
 *   temperature for.
 * @returns - A baseline near-surface air temperature for the given cell in
 *   the given month, measured in degrees Celsius (°C).
 */

const calculateBaseTemp = (world: World, cell: Cell, month: string | number): number => {
  const insolation = calculateInsolation(world, cell, month)
  const { insolation: [_, insolMax], celsius: [tempMin, tempMax], extremes } = world.temperature

  // Latitude efficiency (sun's coming in at an angle at higher latitudes)
  const latitude = degreesToRadians(cell.coords.latitude)
  const s = Math.sin(Math.abs(latitude))
  const efficiency = Math.max(0, 1 - 0.8 * Math.pow(s, 2))
  const i = Math.max(0, insolation * efficiency)

  const k = (tempMax - tempMin) / Math.pow(insolMax, 0.25)
  const c = tempMin
  const seaLevel = k * Math.pow(Math.max(0, i), 0.25) + c

  const elevation = cell.type === 'water' ? 0 : cell.elevation / 1000
  const temp = seaLevel - (0.5 * elevation)

  return extremes
    ? clamp(temp, extremes[0], extremes[1])
    : temp
}

export default calculateBaseTemp
