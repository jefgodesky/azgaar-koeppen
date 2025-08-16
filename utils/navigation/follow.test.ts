import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import type Coords from '../../types/Coords.ts'
import followBearing from './follow.ts'

describe('followBearing', () => {
  const origin: Coords = {
    latitude: 29.98,
    longitude: 31.13
  }

  it('finds the coords from origin', () => {
    const { latitude, longitude } = followBearing(origin, 3596, 320.3833)
    expect(latitude).toBeCloseTo(51.178)
    expect(longitude).toBeCloseTo(-1.836)
  })
})
