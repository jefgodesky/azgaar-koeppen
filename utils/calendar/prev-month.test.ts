import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import getPrevMonth from './prev-month.ts'

describe('getPrevMonth', () => {
  const world = createWorld()
  const cases: Array<[string, string, number]> = [
    ['Jan', 'Dec', 11],
    ['Feb', 'Jan', 0],
    ['Mar', 'Feb', 1],
    ['Apr', 'Mar', 2],
    ['May', 'Apr', 3],
    ['Jun', 'May', 4],
    ['Jul', 'Jun', 5],
    ['Aug', 'Jul', 6],
    ['Sep', 'Aug', 7],
    ['Oct', 'Sep', 8],
    ['Nov', 'Oct', 9],
    ['Dec', 'Nov', 10],
  ]

  for (const [curr, expectedName, expectedIndex] of cases) {
    it(`returns ${expectedName} for ${curr}`, () => {
      const { name, index } = getPrevMonth(world, curr)
      expect(name).toBe(expectedName)
      expect(index).toBe(expectedIndex)
    })
  }
})
