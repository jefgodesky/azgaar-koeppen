import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Hex, { createHex } from '../types/Hex.ts'
import findContinentality from './continentality.ts'

describe('calculateContinentality', () => {
  const a = '8384fffffffffff'
  const b = '8385fffffffffff'

  it('handles empty hex collection', () => {
    const hexes: Record<string, Hex> = {}
    findContinentality(hexes)
    expect(Object.keys(hexes)).toHaveLength(0)
  })

  it('sets ocean hex to 0', () => {
    const hexes: Record<string, Hex> = {
      [a]: createHex({ id: a, type: [1, 0] })
    }

    findContinentality(hexes)
    expect(hexes[a].climate.continentality).toBe(0)
  })

  it('sets coastal hex to 0', () => {
    const hexes: Record<string, Hex> = {
      [a]: createHex({ id: a, type: [0.3, 0.7] })
    }

    findContinentality(hexes)
    expect(hexes[a].climate.continentality).toBe(0)
  })

  it('handles water world', () => {
    const hexes: Record<string, Hex> = {
      [a]: createHex({ id: a, type: [1, 0] }),
      [b]: createHex({ id: b, type: [0.5, 0.5] })
    }

    findContinentality(hexes)
    expect(hexes[a].climate.continentality).toBe(0)
    expect(hexes[b].climate.continentality).toBe(0)
  })

  it('preserves existing hex properties', () => {
    const hexes: Record<string, Hex> = {
      [a]: createHex({ id: a, type: [1, 0], elevation: [100, 200] })
    }

    findContinentality(hexes)
    expect(hexes[a].elevation).toEqual([100, 200])
  })
})
