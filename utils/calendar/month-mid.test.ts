import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import getMonthMidpoint from './month-mid.ts'

describe('getMonthMidpoint', () => {
  const world = createWorld()
  const cases: Array<[string, number]> = [
    ['Jan', 15.5],
    ['Feb', 45],
    ['Mar', 74.5],
    ['Apr', 105],
    ['May', 135.5],
    ['Jun', 166],
    ['Jul', 196.5],
    ['Aug', 227.5],
    ['Sep', 258],
    ['Oct', 288.5],
    ['Nov', 319],
    ['Dec', 349.5]
  ]

  for (const [month, expected] of cases) {
    it(`returns ${expected} for ${month} (given earth)`, () => {
      expect(getMonthMidpoint(world, month)).toBe(expected)
    })
  }

  it('returns -1 if not given a valid month', () => {
    expect(getMonthMidpoint(world, 'Blo')).toBe(-1)
  })
})
