import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Cell, { createTinyWorld } from '../../types/Cell.ts'
import getAverage from '../math/avg.ts'
import calculateDiffusedTemps from './diffused.ts'

describe('calculateDiffusedTemps', () => {
  const cells = createTinyWorld()
  const elevations = [0, 0, 0, 0, 0, 0, 5, 0, 5, 2000]
  elevations.forEach((elevation: number, index: number) => {
    if (!cells[index]) return
    cells[index].elevation = elevation
    cells[index].type = elevation === 0 ? 'water' : 'land'
  })

  const before: Map<number, number> = new Map()
  Object.keys(cells)
    .map(key => parseInt(key))
    .forEach(key => before.set(key, 10))

  it('keeps a uniform field unchanged (fixed point)', () => {
    const actual = calculateDiffusedTemps(cells, before)
    for (const { id } of Object.values(cells)) {
      expect(actual.get(id)).toBeCloseTo(before.get(id) ?? 0)
    }
  })

  it('smooths the field', () => {
    Object.keys(cells)
      .map(key => parseInt(key))
      .forEach(key => before.set(key, key * 5))
    const actual = calculateDiffusedTemps(cells, before)
    expect(actual.get(1)).toBeGreaterThan(5)
  })

  it('changes less over water', () => {
    const actual = calculateDiffusedTemps(cells, before)

    const getDeltas = (type: 'land' | 'water'): number[] => {
      const c = Object.values(cells).filter(cell => cell.type === type)
      return c.map((cell: Cell) => Math.abs(actual.get(cell.id)! - before.get(cell.id)!))
    }

    const land = getAverage(...getDeltas('land'))
    const water = getAverage(...getDeltas('water'))
    expect(land).toBeGreaterThan(water)
  })
})
