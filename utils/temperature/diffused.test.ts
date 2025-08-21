import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Hex, { createHexes } from '../../types/Hex.ts'
import getAverage from '../math/avg.ts'
import isWater from '../is-water.ts'
import calculateDiffusedTemps from './diffused.ts'

describe('calculateDiffusedTemps', () => {
  const hexes = createHexes()
  const keys = Object.keys(hexes)
  const elevations = [0, 0, 0, 0, 5, 5, 2000]
  const before: Map<string, number> = new Map()

  keys.entries().forEach(([index, id]) => {
    before.set(id, 10)
    const l = elevations[index]
    hexes[id].elevation = [l, l]
    hexes[id].type = l === 0 ? [1,0] : [0,1]
  })

  it('keeps a uniform field unchanged (fixed point)', () => {
    const actual = calculateDiffusedTemps(hexes, before)
    for (const { id } of Object.values(hexes)) {
      expect(actual.get(id)).toBeCloseTo(before.get(id) ?? 0)
    }
  })

  it('smooths the field', () => {
    const keys = Object.keys(hexes)
    for (const [index, id] of keys.entries()) {
      before.set(id, index * 5)
    }

    const actual = calculateDiffusedTemps(hexes, before)
    expect(actual.get(keys[keys.length - 1])).toBeLessThan(7 * 5)
  })

  it('changes less over water', () => {
    const actual = calculateDiffusedTemps(hexes, before)

    const getDeltas = (type: 'land' | 'water'): number[] => {
      const h = Object.values(hexes)
        .filter(hex => (type === 'water' && isWater(hex)) || (type === 'land' && !isWater(hex)))
      return h.map((hex: Hex) => Math.abs(actual.get(hex.id)! - before.get(hex.id)!))
    }

    const land = getAverage(...getDeltas('land'))
    const water = getAverage(...getDeltas('water'))
    expect(land).toBeGreaterThan(water)
  })
})
