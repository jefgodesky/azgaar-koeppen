import type World from '../../types/World.ts'
import getMonth, { type MonthData } from './month.ts'

const getPrevMonth = (world: World, month: string | number): MonthData => {
  const { index } = getMonth(world, month)
  const total = Object.keys(world.months).length
  return index === 0
    ? getMonth(world, total - 1)
    : getMonth(world, index - 1)
}

export default getPrevMonth
