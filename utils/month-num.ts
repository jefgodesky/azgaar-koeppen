import type World from '../types/World.ts'

const getMonthNum = (world: World, month: string): number => {
  return Object.keys(world.months).indexOf(month)
}

export default getMonthNum
