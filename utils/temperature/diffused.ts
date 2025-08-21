import { gridDisk } from 'h3-js'
import type Hex from '../../types/Hex.ts'
import isWater from '../is-water.ts'

/**
 * Runs a single Jacobi-style diffusion pass over the temperature field and
 * returns a new map of temperatures after smoothing.
 * @param {Record<string, Hex>} hexes - The hexagons being smoothed.
 * @param {Map<string, number>} temps - A map of temperatures to smooth. The
 *   keys are hexagon IDs and the values are previous temperatures for each
 *   hexagon in degrees Celsius (°C).
 * @returns {Map<string, number>} - A map of new, smoothed-out temperatures.
 *   The keys are hexagon IDs and the values are updated temperatures for each
 *   hexagon in degrees Celsius (°C).
 */

const calculateDiffusedTemps = (
  hexes: Record<string, Hex>,
  temps: Map<string, number>
): Map<string, number> => {
  const land = 0.20 // How much diffusion takes place over land
  const water = 0.08 // How much diffusion takes place over water
  const crossType = 0.60 // How much diffusion takes place over coasts
  const ridge = 0.002 // How much diffusion takes place over elevation

  const next = new Map<string, number>()

  for (const hex of Object.values(hexes)) {
    const { id } = hex
    const neighbors = gridDisk(id, 1)
    const diffusion = (hex.type[0] * water) + (hex.type[1] * land)
    const orig = temps.get(id) ?? 0
    if (!neighbors.length) { next.set(id, orig); continue }

    let weightSum = 0
    let weightedTempSum = 0

    for (const nid of neighbors) {
      const neighbor = hexes[nid]
      if (!neighbor) continue

      const temp = temps.get(nid)
      if (temp === undefined || !Number.isFinite(temp)) continue

      let weight = 1
      if (isWater(hex) !== isWater(neighbor)) weight *= crossType
      const min = Math.min(...hex.elevation, ...neighbor.elevation)
      const max = Math.max(...hex.elevation, ...neighbor.elevation)
      const rise = Math.abs(max - min)
      weight *= Math.exp(-ridge * rise)

      weightSum += weight
      weightedTempSum += weight * temp
    }

    const avg = weightSum > 0 ? weightedTempSum / weightSum : orig
    const diffused = (1 - diffusion) * orig + diffusion * avg
    next.set(id, diffused)
  }

  return next
}

export default calculateDiffusedTemps
