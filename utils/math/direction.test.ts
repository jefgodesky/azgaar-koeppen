import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import calculateDirection from './direction.ts'

describe('calculateDirection', () => {
  const directions: Array<{ direction: string, bearing: number }> = [
    { direction: 'n', bearing: 0 },
    { direction: 'nne', bearing: 22.5 },
    { direction: 'ne', bearing: 45 },
    { direction: 'ene', bearing: 67.5 },
    { direction: 'e', bearing: 90 },
    { direction: 'ese', bearing: 112.5 },
    { direction: 'se', bearing: 135 },
    { direction: 'sse', bearing: 157.5 },
    { direction: 's', bearing: 180 },
    { direction: 'ssw', bearing: 202.5 },
    { direction: 'sw', bearing: 225 },
    { direction: 'wsw', bearing: 247.5 },
    { direction: 'w', bearing: 270 },
    { direction: 'wnw', bearing: 292.5 },
    { direction: 'nw', bearing: 315 },
    { direction: 'nnw', bearing: 337.5 }
  ]

  for (const { direction, bearing } of directions) {
    it(`returns ${bearing} for ${direction}`, () => {
      expect(calculateDirection(direction)).toBe(bearing)
    })
  }
})
