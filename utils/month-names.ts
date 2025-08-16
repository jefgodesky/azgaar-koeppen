import type World from '../types/World.ts'

const getMonthNames = (world: World): string[] => {
  return Object.keys(world.months)
}

export default getMonthNames
