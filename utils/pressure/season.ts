import type Hex from '../../types/Hex.ts'
import type World from '../../types/World.ts'
import getMonth from '../calendar/month.ts'
import getMonthNames from '../calendar/month-names.ts'

const calculateSeasonalFactor = (
  world: World,
  hex: Hex,
  month: string | number
): number => {
  const months = getMonthNames(world)
  const { index } = getMonth(world, month)
  const s = Math.cos(index * Math.PI / (months.length / 2))
  return hex.center.latitude >= 0 ? s : s * -1
}

export default calculateSeasonalFactor
