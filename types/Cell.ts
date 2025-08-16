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

export const createTinyWorld = (): Record<number, Cell> => {
  return {
    1: createCell({ id: 1, neighbors: [2, 4] }),
    2: createCell({ id: 2, neighbors: [1, 3, 5] }),
    3: createCell({ id: 3, neighbors: [2, 6] }),
    4: createCell({ id: 4, neighbors: [1, 5, 7] }),
    5: createCell({ id: 5, neighbors: [2, 6, 8, 4] }),
    6: createCell({ id: 6, neighbors: [3, 5, 9] }),
    7: createCell({ id: 7, neighbors: [4, 8] }),
    8: createCell({ id: 8, neighbors: [5, 7, 9] }),
    9: createCell({ id: 9, neighbors: [6, 8] })
  }
}

export default Cell
