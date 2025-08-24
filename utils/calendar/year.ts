import type World from '../../types/World.ts'
import getSum from '../math/sum.ts'

const getYearLength = (world: World, unit: 'm' | 'd' | 's' = 'd') => {
  if (unit === 'm') return Object.keys(world.months).length

  const days = getSum(...Object.values(world.months))
  return unit === 'd' ? days : days * world.secondsPerDay
}

export default getYearLength
