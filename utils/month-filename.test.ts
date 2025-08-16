import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../types/World.ts'
import getMonthFilename from './month-filename.ts'

describe('getMonthFilename', () => {
  const world = createWorld()
  const cases: Array<[string, string]> = [
    ['Jan', '01-jan'],
    ['Feb', '02-feb'],
    ['Mar', '03-mar'],
    ['Apr', '04-apr'],
    ['May', '05-may'],
    ['Jun', '06-jun'],
    ['Jul', '07-jul'],
    ['Aug', '08-aug'],
    ['Sep', '09-sep'],
    ['Oct', '10-oct'],
    ['Nov', '11-nov'],
    ['Dec', '12-dec']
  ]

  for (const [month, filename] of cases) {
    it(`returns ${filename} for ${month} (given earth)`, () => {
      expect(getMonthFilename(world, month)).toBe(filename)
    })
  }

  it('returns 00-na if not given a valid month', () => {
    expect(getMonthFilename(world, 'Blo')).toBe('00-na')
  })
})
