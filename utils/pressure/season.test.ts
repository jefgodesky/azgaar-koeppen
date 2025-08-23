import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createHex } from '../../types/Hex.ts'
import { createWorld } from '../../types/World.ts'
import calculateSeasonalFactor from './season.ts'

describe('calculateSeasonalFactor', () => {
  const world = createWorld()

  for (const latitude of [30, -30]) {
    const hex = createHex({ center: { latitude, longitude: 0 }})
    const hemisphere = latitude > 0 ? 'northern' : 'southern'
    const summer = latitude > 0 ? 'Jul' : 'Jan'
    const winter = latitude > 0 ? 'Jan' : 'Jul'

    it(`returns a positive value in winter (${hemisphere} hemisphere)`, () => {
      const actual = calculateSeasonalFactor(world, hex, winter)
      expect(actual).toBeGreaterThan(0)
    })

    it(`returns a negative value in summer (${hemisphere} hemisphere)`, () => {
      const actual = calculateSeasonalFactor(world, hex, summer)
      expect(actual).toBeLessThan(0)
    })
  }
})
