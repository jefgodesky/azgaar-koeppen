import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import { createCell } from '../../types/Cell.ts'
import calculateBaseTemp from './base.ts'

describe('calculateBaseTemp', () => {
  interface TestCase {
    latitude: number
    month: string
    expected: number
  }

  const world = createWorld()
  const cases: TestCase[] = [
    { latitude: 0, month: 'Jan', expected: 27.31 },
    { latitude: 0, month: 'Jun', expected: 26.94 },
    { latitude: 70, month: 'Jan', expected: -50 },
    { latitude: 70, month: 'Jun', expected: 31.77 },
  ]

  for (const { latitude, month, expected } of cases) {
    it(`returns ~${expected}°C for a cell at ${latitude}° N in ${month}`, () => {
      const cell = createCell({ coords: { latitude, longitude: 0 } })
      const actual = calculateBaseTemp(world, cell, month)
      expect(actual).toBeCloseTo(expected)
    })
  }
})
