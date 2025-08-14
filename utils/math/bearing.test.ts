import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import type Coords from '../../types/Coords.ts'
import findBearing from './bearing.ts'

describe('findBearing', () => {
  it('finds bearing from one coord to another', () => {
    const a: Coords = { latitude: 29.98, longitude: 31.13 }
    const b: Coords = { latitude: 51.18, longitude: -1.84 }
    expect(findBearing(a, b)).toBeCloseTo(320.38)
  })
})
