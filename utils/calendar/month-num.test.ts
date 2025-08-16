import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import getMonthNum from './month-num.ts'

describe('getMonthNum', () => {
  const world = createWorld()
  for (const [i, month] of Object.keys(world.months).entries()) {
    it(`given earth, returns ${i} for ${month}`, () => {
      expect(getMonthNum(world, month)).toBe(i)
    })
  }

  it('returns -1 if not given a valid month', () => {
    expect(getMonthNum(world, 'lol')).toBe(-1);
  })
})
