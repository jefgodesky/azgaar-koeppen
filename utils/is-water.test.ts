import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createHex } from '../types/Hex.ts'
import isWater from './is-water.ts'

describe('isWater', () => {
  it('returns true if the hex is more water than land', () => {
    const hex = createHex({ type: [0.55, 0.45] })
    expect(isWater(hex)).toBe(true)
  })

  it('returns false if the hex is more land than water', () => {
    const hex = createHex({ type: [0.45, 0.55] })
    expect(isWater(hex)).toBe(false)
  })
})
