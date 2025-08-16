import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import getYearFraction from './year-fraction.ts'

describe('getYearFraction', () => {
  const world = createWorld()

  it('returns the fraction of the year passed on given day', () => {
    expect(getYearFraction(world, 182.5)).toBeCloseTo(0.5)
  })
})
