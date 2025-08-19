import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import type { BBox } from 'geojson'
import doBBoxesOverlap from './bbox-overlap.ts'

describe('doBBoxesOverlap', () => {
  const a: BBox = [0, 0, 5, 5]
  const b: BBox = [2, 2, 7, 7]
  const c: BBox = [10, 10, 15, 15]

  it('returns true when bounding boxes overlap', () => {
    expect(doBBoxesOverlap(a, b)).toBe(true)
  })

  it('returns false when bounding boxes do not overlap', () => {
    expect(doBBoxesOverlap(a, c)).toBe(false)
  })
})
