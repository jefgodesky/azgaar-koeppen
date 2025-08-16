import type World from '../../types/World.ts'
import getMonthNames from './month-names.ts'

interface MonthData {
  name: string
  index: number
}

const getMonth = (world: World, month: string | number): MonthData => {
  const months = getMonthNames(world)
  const index = typeof month === 'number' ? month : months.indexOf(month)
  const name = months[index] ?? 'n/a'
  return { name, index: name === 'n/a' ? -1 : index }
}

export default getMonth
