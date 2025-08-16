import type World from '../types/World.ts'
import getSum from './math/sum.ts'

const getYearLength = (world: World, unit: 'd' | 's' = 'd') => {
  const days = getSum(...Object.values(world.months))
  return unit === 'd' ? days : days * world.secondsPerDay
}

export default getYearLength
