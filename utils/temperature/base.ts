import type World from '../../types/World.ts'
import type Cell from '../../types/Cell.ts'
import calculateInsolation from './insolation.ts'
import clamp from '../clamp.ts'

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

  const k = (tempMax - tempMin) / Math.pow(insolMax, 0.25)
  const c = tempMin
  const temp = k * Math.pow(Math.max(0, insolation), 0.25) + c
  return extremes
    ? clamp(temp, extremes[0], extremes[1])
    : temp
}

export default calculateBaseTemp
