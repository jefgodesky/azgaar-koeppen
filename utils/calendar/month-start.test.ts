import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import getMonthStart from './month-start.ts'

describe('getMonthStart', () => {
  const world = createWorld()
  const cases: Array<[string, number]> = [
    ['Jan', 0],
    ['Feb', 31],
    ['Mar', 31 + 28],
    ['Apr', 31 + 28 + 31],
    ['May', 31 + 28 + 31 + 30],
    ['Jun', 31 + 28 + 31 + 30 + 31],
    ['Jul', 31 + 28 + 31 + 30 + 31 + 30],
    ['Aug', 31 + 28 + 31 + 30 + 31 + 30 + 31],
    ['Sep', 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31],
    ['Oct', 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30],
    ['Nov', 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31],
    ['Dec', 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30]
  ]

  for (const [index, [month, days]] of cases.entries()) {
    it(`returns ${days} for ${month} (given earth)`, () => {
      expect(getMonthStart(world, month)).toBe(days)
    })

    it(`returns ${days} for 0-based month ${index} (given earth)`, () => {
      expect(getMonthStart(world, index)).toBe(days)
    })
  }

  it('returns -1 if not given a valid month', () => {
    expect(getMonthStart(world, 'Blo')).toBe(-1)
  })
})
