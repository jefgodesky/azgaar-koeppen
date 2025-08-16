import type World from '../../types/World.ts'
import getMonthNames from './month-names.ts'
import getMonth from './month.ts'
import getSum from '../math/sum.ts'

const getMonthStart = (world: World, month: string | number): number => {
  const months = getMonthNames(world)
  const { index } = getMonth(world, month)
  if (index < 0) return -1

  const before = months.slice(0, index).map(name => world.months[name])
  return getSum(...before)
}

export default getMonthStart
