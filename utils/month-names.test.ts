import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../types/World.ts'
import getMonthNames from './month-names.ts'

describe('getMonthNames', () => {
  it('returns an array of the world\'s months', () => {
    const expected = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'
    const actual = getMonthNames(createWorld()).join(' ')
    expect(actual).toBe(expected)
  })
})
