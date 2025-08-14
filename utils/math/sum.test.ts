import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import getSum from './sum.ts'

describe('getSum', () => {
  it('returns the sum of its arguments', () => {
    expect(getSum(1, 2, 3)).toBe(6)
  })
})
