import type Coords from './Coords.ts'
import { createCoords } from './Coords.ts'

interface Cell {
  id: number
  type: 'land' | 'water'
  coords: Coords
  point: {
    x: number
    y: number
  }
  area: number
  elevation: number
  neighbors: number[]
}

export const createCell = (overrides?: Partial<Cell>): Cell => {
  return {
    id: 1,
    type: 'water',
    coords: createCoords(overrides?.coords),
    point: { x: 0, y: 0 },
    area: 100,
    elevation: 20,
    neighbors: [],
    ...overrides
  }
}

export default Cell
