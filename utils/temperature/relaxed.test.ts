import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import { createHex } from '../../types/Hex.ts'
import calculateRelaxedTemp from './relaxed.ts'
import calculateBaseTemp from './base.ts'

describe('calculateRelaxedTemp', () => {
  const world = createWorld()

  it('reduces temperature change', () => {
    const hex = createHex()
    const base = calculateBaseTemp(world, hex, 'Jan')
    const relaxed = calculateRelaxedTemp(world, hex, 'Jan', 0)
    expect(relaxed).toBeLessThan(base)
  })

  it('changes less if previous is -5 or lower', () => {
    const hex = createHex()
    const a = calculateRelaxedTemp(world, hex, 'Jan', -5)
    const b = calculateRelaxedTemp(world, hex, 'Jan', 0)
    expect(Math.abs(-5 - a)).toBeLessThan(Math.abs(0 - b))
  })

  it('takes prev from previous month base if not provided', () => {
    const hex = createHex({ center: { latitude: 0, longitude: 0 } })
    const a = calculateRelaxedTemp(world, hex, 'Jan')
    const b = calculateRelaxedTemp(world, hex, 'Jan', 50)
    expect(a).toBeLessThan(b)
  })
})
