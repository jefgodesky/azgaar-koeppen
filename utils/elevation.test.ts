import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import setElevation from './elevation.ts'

describe('setElevation', () => {
  interface TestCase {
    value: number
    input: [number, number]
    expected: [number, number]
  }

  const cases: TestCase[] = [
    { value: 0, input: [Number.NaN, Number.NaN], expected: [0, 0] },
    { value: 0, input: [-1, Number.NaN], expected: [-1, 0] },
    { value: 0, input: [1, Number.NaN], expected: [0, 1] },
    { value: 0, input: [Number.NaN, -1], expected: [-1, 0] },
    { value: 0, input: [Number.NaN, 1], expected: [0, 1] },
    { value: -1, input: [0, 0], expected: [-1, 0] },
    { value: 1, input: [0, 0], expected: [0, 1] },
  ]

  for (const { value, input, expected } of cases) {
    const sep = ','
    const desc = `applies ${value} to ${input.join(sep)} to get ${expected.join(sep)}`
    it(desc, () => {
      const actual = setElevation(value, input).join(sep)
      expect(actual).toBe(expected.join(sep))
    })
  }
})
