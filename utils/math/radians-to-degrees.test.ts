import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import radiansToDegrees from './radians-to-degrees.ts'

describe('radiansToDegrees', () => {
  it('converts radians to degrees', () => {
    expect(radiansToDegrees(Math.PI)).toBeCloseTo(180)
  })
})
