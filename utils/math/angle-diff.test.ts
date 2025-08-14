import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import angleDifference from './angle-diff.ts'

describe('angularDifference', () => {
  it('returns smallest angular difference in degrees', () => {
    expect(angleDifference(90, 350)).toBe(100)
  })
})
