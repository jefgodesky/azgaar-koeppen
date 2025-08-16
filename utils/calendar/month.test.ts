import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import getMonthNames from './month-names.ts'
import getMonth from './month.ts'

describe('getMonth', () => {
  const world = createWorld()
  const months = getMonthNames(world)

  for (const [i, month] of months.entries()) {
    it(`returns ${month} for ${i} (given earth)`, () => {
      const { name, index } = getMonth(world, i)
      expect(name).toBe(month)
      expect(index).toBe(i)
    })

    it(`returns ${i} for ${month} (given earth)`, () => {
      const { name, index } = getMonth(world, month)
      expect(name).toBe(month)
      expect(index).toBe(i)
    })
  }

  it('returns -1 if not given a valid month', () => {
    const { name, index } = getMonth(world, 'Blo')
    expect(name).toBe('n/a')
    expect(index).toBe(-1)
  })

  it('returns n/a if not given a valid index', () => {
    const { name, index } = getMonth(world, 13)
    expect(name).toBe('n/a')
    expect(index).toBe(-1)
  })
})
