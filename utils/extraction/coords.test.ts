import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createAzgaarInfo } from '../../types/AzgaarInfo.ts'
import { createAzgaarPackCell } from '../../types/AzgaarPackCell.ts'
import { createMapBounds } from '../../types/MapBounds.ts'
import extractCoords from './coords.ts'

describe('extractCoords', () => {
  const info = createAzgaarInfo({ width: 100, height: 100 })
  const cell = createAzgaarPackCell({ p: [50, 50] })
  const bounds = createMapBounds()

  it('extracts the dictionary of biome names', () => {
    const { latitude, longitude } = extractCoords(cell, info, bounds)
    expect(latitude).toBe(0)
    expect(longitude).toBe(0)
  })
})
