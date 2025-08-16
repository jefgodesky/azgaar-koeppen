import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Cell, { createCell } from '../../types/Cell.ts'
import findAdjacent from './adjacent.ts'

describe('findAdjacent', () => {
  // Create a 3x3 grid
  const tinyWorld: Record<number, Cell> = {
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

  it('finds all adjacent cells to a set of cells', () => {
    const set = [1, 2, 3]
    const expected = [4, 5, 6]
    const actual = findAdjacent(tinyWorld, set)
    expect(actual.every(id => expected.includes(id))).toBe(true)
  })
})
