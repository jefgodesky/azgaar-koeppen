import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createHex } from '../../types/Hex.ts'
import { createWorld } from '../../types/World.ts'
import calculateOrographicPressure from './orographic.ts'

describe('calculateOrographicPressure', () => {
  const world = createWorld()

  it('returns 0 at sea level', () => {
    const hex = createHex({ elevation: [0, 0]})
    const actual = calculateOrographicPressure(world, hex, 'May')
    expect(actual).toBe(0)
  })
})
