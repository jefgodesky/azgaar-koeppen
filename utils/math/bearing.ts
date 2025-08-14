import type Coords from '../../types/Coords.ts'
import degreesToRadians from './degrees-to-radians.ts'
import radiansToDegrees from './radians-to-degrees.ts'

/**
 * Based heavily on Chris Veness's work found here:
 * https://www.movable-type.co.uk/scripts/latlong.html
 */

const findBearing = (
  a: Coords,
  b: Coords
): number => {
  const aLatRad = degreesToRadians(a.latitude)
  const aLngRad = degreesToRadians(a.longitude)
  const bLatRad = degreesToRadians(b.latitude)
  const bLngRad = degreesToRadians(b.longitude)

  const y = Math.sin(bLngRad - aLngRad) * Math.cos(bLatRad);
  const x = Math.cos(aLatRad)*Math.sin(bLatRad) -
    Math.sin(aLatRad) * Math.cos(bLatRad) * Math.cos(bLngRad - aLngRad)
  return (radiansToDegrees(Math.atan2(y, x)) + 360) % 360
}

export default findBearing
