import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import degreesToRadians from './degrees-to-radians.ts'

describe('degreesToRadians', () => {
  it('converts degrees to radians', () => {
    expect(degreesToRadians(180)).toBeCloseTo(Math.PI)
  })
})