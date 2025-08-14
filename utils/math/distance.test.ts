import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import type Coords from '../../types/Coords.ts'
import findDistance from './distance.ts'

describe('findDistance', () => {
  it('finds distance between two points', () => {
    const a: Coords = { latitude: 29.98, longitude: 31.13 }
    const b: Coords = { latitude: 51.18, longitude: -1.84 }
    expect(findDistance(a, b)).toBeCloseTo(3596.18)
  })
})
