import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import { createHex } from '../../types/Hex.ts'
import calculateInsolation from './insolation.ts'

describe('calculateInsolation', () => {
  interface TestCase {
    latitude: number
    month: string
    expected: number
  }

  const world = createWorld()
  const cases: TestCase[] = [
    { latitude: 0, month: 'Jan', expected: 405.29 },
    { latitude: 0, month: 'Jun', expected: 397.67 },
    { latitude: 70, month: 'Jan', expected: 0 },
    { latitude: 70, month: 'Jun', expected: 507.38 },
  ]

  for (const { latitude, month, expected } of cases) {
    it(`returns ~${expected} W/m² daily mean TOA for a cell at ${latitude}° N latitude in ${month}`, () => {
      const hex = createHex({ center: { latitude, longitude: 0 } })
      const actual = calculateInsolation(world, hex, month)
      expect(actual).toBeCloseTo(expected)
    })
  }
})
