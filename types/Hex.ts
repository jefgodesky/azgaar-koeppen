import { cellToLatLng } from 'h3-js'
import type Coords from './Coords.ts'
import type Wind from './Wind.ts'

interface Hex {
  id: string
  center: Coords,
  type: [number, number]
  elevation: [number, number]
  climate: {
    classification: string
    continentality: number
    temperatures: Record<string, number>
    pressure: Record<string, number>
    winds: Record<string, Wind>
    precipitation: Record<string, number>
  }
}

export const createHex = (overrides?: Partial<Hex>): Hex => {
  const id = '82754ffffffffff'
  let center = overrides?.center
  if (!center) {
    const [latitude, longitude] = cellToLatLng(id)
    center = { latitude, longitude }
  }

  return {
    id,
    center,
    type: [1, 0],
    elevation: [0, 0],
    climate: {
      classification: '-',
      continentality: -1,
      temperatures: {},
      pressure: {},
      winds: {},
      precipitation: {}
    },
    ...overrides
  }
}

export const createHexes = (): Record<string, Hex> => {
  const keys = ['8', '9', 'a', 'b', 'c', 'd', 'e'].map(n => `83754${n}fffffffff`)
  const hexes: Record<string, Hex> = {}
  for (const id of keys) {
    hexes[id] = createHex({ id })
  }

  return hexes
}

export default Hex
