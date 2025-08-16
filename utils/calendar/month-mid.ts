import type World from '../../types/World.ts'
import getMonth from './month.ts'
import getMonthStart from './month-start.ts'
import getAverage from '../math/avg.ts'

const getMonthMidpoint = (world: World, month: number | string): number => {
  const { name } = getMonth(world, month)
  if (name === 'n/a') return -1

  const start = getMonthStart(world, month)
  const end = start + world.months[name]
  return getAverage(start, end)
}

export default getMonthMidpoint
