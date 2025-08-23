import { gridDisk } from 'h3-js'
import type Hex from '../types/Hex.ts'

const findContinentality = (hexes: Record<string, Hex>): void => {
  const arr = Object.values(hexes)

  const queue: string[] = []
  for (const hex of arr) {
    if (hex.type[0] > 0) {
      hex.climate.continentality = 0
      queue.push(hex.id)
    }
  }

  let processed = queue.length
  while (queue.length > 0) {
    const id = queue.shift()!
    const hex = hexes[id]
    if (!hex) continue

    try {
      const neighbors = gridDisk(id, 1)
      for (const nid of neighbors) {
        const neighbor = hexes[nid]
        if (!neighbor) continue

        if (neighbor.type[0] > 0 || neighbor.climate.continentality > -1) continue
        neighbor.climate.continentality = hex.climate.continentality + 1
        queue.push(nid)
        processed++
      }
    } catch (err: any) {
      console.warn(`Error while processing continentality for hex ${id}: ${err.message}`)
    }
  }
}

export default findContinentality
