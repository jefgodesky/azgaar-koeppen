import type World from '../../types/World.ts'
import getYearFraction from '../calendar/year-fraction.ts'
import degreesToRadians from '../math/degrees-to-radians.ts'
import clamp from '../clamp.ts'

const calculateDeclination = (world: World, day: number): number => {
  const equinoxFraction = getYearFraction(world, world.equinox)
  const dayFraction = getYearFraction(world, day)
  const tiltRadians = degreesToRadians(world.tilt)
  const seasonalAngle = 2 * Math.PI * (dayFraction - equinoxFraction)
  const delta = clamp(Math.sin(tiltRadians) * Math.sin(seasonalAngle), -1, 1)
  return Math.asin(delta)
}

export default calculateDeclination
