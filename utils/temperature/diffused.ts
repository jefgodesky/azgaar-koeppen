import type Cell from '../../types/Cell.ts'

/**
 * Runs a single Jacobi-style diffusion pass over the temperature field and
 * returns a new map of temperatures after smoothing.
 * @param {Record<number, Cell>} cells - The cells being smoothed.
 * @param {Map<number, number>} temps - A map of temperatures to smooth. The
 *   keys are cell IDs and the values are previous temperatures for each cell
 *   in degrees Celsius (°C).
 * @returns {Map<number, number>} - A map of new, smoothed-out temperatures.
 *   The keys are cell IDs and the values are updated temperatures for each
 *   cell in degrees Celsius (°C).
 */

const calculateDiffusedTemps = (
  cells: Record<number, Cell>,
  temps: Map<number, number>
): Map<number, number> => {
  const land = 0.20 // How much diffusion takes place over land
  const water = 0.08 // How much diffusion takes place over water
  const crossType = 0.60 // How much diffusion takes place over coasts
  const ridge = 0.002 // How much diffusion takes place over elevation

  const next = new Map<number, number>()

  for (const cell of Object.values(cells)) {
    const { id, neighbors } = cell
    const diffusion = cell.type === 'water' ? water : land
    const orig = temps.get(id) ?? 0
    if (!neighbors.length) { next.set(id, orig); continue }

    let weightSum = 0
    let weightedTempSum = 0

    for (const nid of neighbors) {
      const neighbor = cells[nid]
      if (!neighbor) continue

      const temp = temps.get(nid)
      if (temp === undefined || !Number.isFinite(temp)) continue

      let weight = 1
      if (cell.type !== neighbor.type) weight *= crossType
      const rise = Math.abs(cell.elevation - neighbor.elevation)
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
