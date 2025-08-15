import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createAzgaarMapCoords } from '../../types/AzgaarMapCoords.ts'
import extractMapBounds from './map-bounds.ts'

describe('extractMapBounds', () => {
  it('extracts map bounds', () => {
    const src = createAzgaarMapCoords()
    const actual = extractMapBounds(src)

    const matches: Array<[number, number]> = [
      [actual.latitude.total, src.latT],
      [actual.latitude.north, src.latN],
      [actual.latitude.south, src.latS],
      [actual.longitude.total, src.lonT],
      [actual.longitude.east, src.lonE],
      [actual.longitude.west, src.lonW],
    ]

    for (const [actual, expected] of matches) {
      expect(actual).toBe(expected)
    }
  })
})