import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import { createCell } from '../../types/Cell.ts'
import calculateRelaxedTemp from './relaxed.ts'

describe('calculateRelaxedTemp', () => {
  interface TestCase {
    latitude: number
    type: 'water' | 'land'
    month: string
    expected: number
  }

  const world = createWorld()
  const cases: TestCase[] = [
    { latitude: 0, type: 'land', month: 'Jan', expected: 23.43 },
    { latitude: 0, type: 'water', month: 'Jan', expected: 8.79 },
    { latitude: 0, type: 'land', month: 'Jun', expected: 23.13 },
    { latitude: 0, type: 'water', month: 'Jun', expected: 8.67 },
    { latitude: 70, type: 'land', month: 'Jan', expected: -40 },
    { latitude: 70, type: 'water', month: 'Jan', expected: -15 },
    { latitude: 70, type: 'land', month: 'Jun', expected: 9.39 },
    { latitude: 70, type: 'water', month: 'Jun', expected: 3.52 },
  ]

  for (const { latitude, type, month, expected } of cases) {
    it(`returns ~${expected}°C for a ${type} cell at ${latitude}°N in ${month} (prev. 0°C)`, () => {
      const coords = { latitude, longitude: 0 }
      const cell = createCell({ type, coords })
      const actual = calculateRelaxedTemp(world, cell, month, 0)
      expect(actual).toBeCloseTo(expected)
    })
  }

  it('takes prev from previous month base if not provided', () => {
    const cell = createCell({ coords: { latitude: 0, longitude: 0 } })
    const actual = calculateRelaxedTemp(world, cell, 'Jan')
    expect(actual).toBeCloseTo(29.02)
  })
})
