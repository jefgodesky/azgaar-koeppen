import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import getMonthStart from './month-start.ts'
import getMonthNames from './month-names.ts'
import getYearLength from './year.ts'
import getMonthYearFraction from './month-year.ts'

describe('getMonthYearFraction', () => {
  const world = createWorld()
  const months = getMonthNames(world)
  const year = getYearLength(world)

  for (const month of months) {
    const start = getMonthStart(world, month)
    const end = start + world.months[month]
    const mid = (start + end) / 2
    const expected = Math.round((mid / year) * 100) / 100

    it(`returns ${expected} for ${month} (given earth)`, () => {
      expect(getMonthYearFraction(world, month)).toBeCloseTo(expected)
    })
  }

  it('returns -1 if not given a valid month', () => {
    expect(getMonthYearFraction(world, 'Blo')).toBe(-1)
  })
})
