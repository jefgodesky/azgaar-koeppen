import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import getAverage from './avg.ts'

describe('getAverage', () => {
  it('returns the average of its arguments', () => {
    expect(getAverage(1, 2, 3)).toBe(2)
  })
})
