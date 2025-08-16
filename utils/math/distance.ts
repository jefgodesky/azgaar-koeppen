import type Coords from '../../types/Coords.ts'
import World, { createWorld } from '../../types/World.ts'
import degreesToRadians from './degrees-to-radians.ts'

/**
 * Based heavily on Chris Veness's work found here:
 * https://www.movable-type.co.uk/scripts/latlong.html
 */

const findDistance = (
  a: Coords,
  b: Coords,
  world: World = createWorld()
): number => {
  const aLatRad = degreesToRadians(a.latitude)
  const bLatRad = degreesToRadians(b.latitude)
  const deltaLat = degreesToRadians(b.latitude - a.latitude)
  const deltaLng = degreesToRadians(b.longitude - a.longitude)

  const squareHalfChord = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(aLatRad) * Math.cos(bLatRad) *
    Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2)
  const angularDistance = 2 * Math.atan2(Math.sqrt(squareHalfChord), Math.sqrt(1 - squareHalfChord))
  return world.radius * angularDistance
}

export default findDistance
