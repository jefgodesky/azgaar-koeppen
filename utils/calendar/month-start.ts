import type World from '../../types/World.ts'
import getMonthNames from './month-names.ts'
import getSum from '../math/sum.ts'

const getMonthStart = (world: World, month: string | number): number => {
  const months = getMonthNames(world)
  const m = typeof month === 'number' ? month : months.indexOf(month)
  if (m < 0 || m > months.length) return -1

  const before = months.slice(0, m).map(name => world.months[name])
  return getSum(...before)
}

export default getMonthStart
