import type Coords from '../../types/Coords.ts'
import World, { createWorld } from '../../types/World.ts'
import radiansToDegrees from './radians-to-degrees.ts'
import degreesToRadians from './degrees-to-radians.ts'

const followBearing = (
  origin: Coords,
  dist: number,
  bearing: number,
  world: World = createWorld()
): Coords => {
  if (dist === 0) return { ...origin }

  const { latitude, longitude } = origin
  const startingLatRad = degreesToRadians(latitude)
  const startingLngRad = degreesToRadians(longitude)
  const bearingRad = degreesToRadians(bearing)
  const angularDistance = dist / world.radius

  const destLat =
    Math.sin(startingLatRad) * Math.cos(angularDistance) +
    Math.cos(startingLatRad) * Math.sin(angularDistance) * Math.cos(bearingRad)

  const destLatRad = Math.asin(Math.min(1, Math.max(-1, destLat)))

  const y = Math.sin(bearingRad) * Math.sin(angularDistance) * Math.cos(startingLatRad)
  const x = Math.cos(angularDistance) - Math.sin(startingLatRad) * Math.sin(destLatRad)
  const destLngRad = startingLngRad + Math.atan2(y, x)

  return {
    latitude: radiansToDegrees(destLatRad),
    longitude: radiansToDegrees(destLngRad)
  }
}

export default followBearing
