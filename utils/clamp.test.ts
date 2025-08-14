import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import clamp from './clamp.ts'

describe('clamp', () => {
  it('returns number if it\'s in range', () => {
    expect(clamp(5, 1, 10)).toBe(5)
  })

  it('returns min if it\'s too low', () => {
    expect(clamp(1, 5, 10)).toBe(5)
  })

  it('returns max if it\'s too high', () => {
    expect(clamp(10, 1, 5)).toBe(5)
  })
})
