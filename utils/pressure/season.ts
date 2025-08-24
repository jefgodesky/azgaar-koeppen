import type Hex from '../../types/Hex.ts'
import type World from '../../types/World.ts'
import getMonth from '../calendar/month.ts'
import getYearLength from '../calendar/year.ts'

const calculateSeasonalFactor = (
  world: World,
  hex: Hex,
  month: string | number
): number => {
  const { index } = getMonth(world, month)
  const halfYear = getYearLength(world, 'm') / 2
  const s = Math.cos(index * Math.PI / halfYear)
  return hex.center.latitude >= 0 ? s : s * -1
}

export default calculateSeasonalFactor
