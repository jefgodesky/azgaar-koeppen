import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import getYearLength from './year.ts'

describe('getYearLength', () => {
  it('returns the length of the year in days', () => {
    expect(getYearLength(createWorld())).toEqual(365)
  })

  it('returns the length of the year in seconds', () => {
    expect(getYearLength(createWorld(), 's')).toEqual(365 * 24 * 60 * 60)
  })
})
