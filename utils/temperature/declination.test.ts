import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import getYearLength from '../calendar/year.ts'
import degreesToRadians from '../math/degrees-to-radians.ts'
import calculateDeclination from './declination.ts'

describe('calculateDeclination', () => {
  const world = createWorld()
  const year = getYearLength(world)

  const cases: Array<{ desc: string, expected: number, percent: number }> = [
    { desc: 'vernal equinox', expected: 0, percent: 0 },
    { desc: 'summer solstice', expected: world.tilt, percent: 0.25 },
    { desc: 'autumnal equinox', expected: 0, percent: 0.5 },
    { desc: 'winter solstice', expected: world.tilt * -1, percent: 0.75 }
  ]

  for (const { desc, expected, percent } of cases) {
    const day = world.equinox + (year * percent)
    it(`returns ${expected}° at ${desc}`, () => {
      expect(calculateDeclination(world, day)).toBeCloseTo(degreesToRadians(expected))
    })
  }
})
