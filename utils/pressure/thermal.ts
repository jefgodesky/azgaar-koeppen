import type Hex from '../../types/Hex.ts'
import type World from '../../types/World.ts'
import getMonth from '../calendar/month.ts'

export const TREF = 15

const calculateThermalPressure = (
  world: World,
  hex: Hex,
  month: string | number
): number => {
  const { name: m } = getMonth(world, month)
  const temperature = hex.climate.temperatures[m]
  const delta = temperature - TREF
  return -0.8 * delta -0.02 * Math.pow(delta, 2)
}

export default calculateThermalPressure
