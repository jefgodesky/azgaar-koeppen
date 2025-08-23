import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createHex } from '../../types/Hex.ts'
import calculateCirculationPressure from './circulation.ts'

describe('calculateCirculationPressure', () => {
  interface TestCase {
    desc: string
    latitude: number
    expected: number
  }

  const cases: TestCase[] = [
    { desc: 'equatorial trough (ITCZ)', latitude: 2, expected: -12 },
    { desc: 'subtropics', latitude: 10, expected: 0 },
    { desc: 'subtropical ridge', latitude: 20, expected: 12 },
    { desc: 'mid-latitudes', latitude: 40, expected: 3 },
    { desc: 'subpolar trough', latitude: 60, expected: -6 },
    { desc: 'polar latitudes', latitude: 70, expected: 1 },
    { desc: 'polar highs', latitude: 80, expected: 8 }
  ]

  for (const { desc, latitude, expected } of cases) {
    it(`handles the ${desc}`, () => {
      const hex = createHex({ center: {latitude, longitude: 0} })
      const actual = calculateCirculationPressure(hex)
      expect(actual).toBe(expected)
    })
  }
})
