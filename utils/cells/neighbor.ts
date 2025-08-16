import type Cell from '../../types/Cell.ts'
import angleDifference from '../math/angle-diff.ts'
import calculateDirection from '../math/direction.ts'
import findBearing from '../math/bearing.ts'
import findDistance from '../math/distance.ts'

const findNeighbor = (
  world: Record<number, Cell>,
  origin: Cell | number,
  direction: string | number
): Cell => {
  const target = typeof direction === 'string'
    ? calculateDirection(direction)
    : direction
  const o = typeof origin === 'number' ? world[origin] : origin
  let best: { neighbor: Cell, diff: number, dist: number } | undefined

  for (const nid of o.neighbors) {
    const neighbor = world[nid]
    if (!neighbor) continue
    const bearing = findBearing(o.coords, neighbor.coords)
    const dist = findDistance(o.coords, neighbor.coords)
    const diff = angleDifference(bearing, target)
    if (!best || diff < best.diff || (diff === best.diff && dist < best.dist)) {
      best = { neighbor, diff, dist }
    }
  }

  return best?.neighbor ?? o
}

export default findNeighbor

