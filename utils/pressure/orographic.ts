import type Hex from '../../types/Hex.ts'
import type World from '../../types/World.ts'
import getMonth from '../calendar/month.ts'
import { TREF } from './thermal.ts'

const calculateOrographicPressure = (
  world: World,
  hex: Hex,
  month: string | number
): number => {
  const [_, elevation] = hex.elevation
  if (elevation <= 0) return 0
  const { name: m } = getMonth(world, month)
  const effect = Math.min(elevation / 2000, 1)
  const temp = hex.climate.temperatures[m]
  return effect * (temp > TREF ? -3 : 2)
}

export default calculateOrographicPressure
