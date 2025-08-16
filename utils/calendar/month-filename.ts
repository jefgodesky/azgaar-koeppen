import type World from '../../types/World.ts'
import getMonth from './month.ts'

const getMonthFilename = (world: World, month: string): string => {
  const { index } = getMonth(world, month)
  const n = index + 1
  if (n < 1) return '00-na'

  const total = Object.keys(world.months).length
  const padding = total.toString().length
  const padded = n.toString().padStart(padding, '0')
  return `${padded}-${month.toLowerCase()}`
}

export default getMonthFilename
