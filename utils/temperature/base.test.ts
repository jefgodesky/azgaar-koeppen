import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import { createHex } from '../../types/Hex.ts'
import calculateBaseTemp from './base.ts'

describe('calculateBaseTemp', () => {
  const world = createWorld()
  const longitude = 0

  it('is hotter in summer than winter (northern hemisphere)', () => {
    const hex = createHex({ center: { latitude: 30, longitude }})
    const summer = calculateBaseTemp(world, hex, 'Jun')
    const winter = calculateBaseTemp(world, hex, 'Jan')
    expect(summer).toBeGreaterThan(winter)
  })

  it('is hotter in summer than winter (southern hemisphere)', () => {
    const hex = createHex({ center: { latitude: -30, longitude }})
    const summer = calculateBaseTemp(world, hex, 'Jan')
    const winter = calculateBaseTemp(world, hex, 'Jun')
    expect(summer).toBeGreaterThan(winter)
  })

  it('is hotter closer to the equator', () => {
    const polar = calculateBaseTemp(world, createHex({ center: { latitude: 70, longitude } }), 'May')
    const equatorial = calculateBaseTemp(world, createHex({ center: { latitude: 0, longitude } }), 'May')
    expect(equatorial).toBeGreaterThan(polar)
  })

  it('is hotter at lower elevations', () => {
    const high = calculateBaseTemp(world, createHex({ elevation: [2000, 2000] }), 'May')
    const low = calculateBaseTemp(world, createHex({ elevation: [0, 0] }), 'May')
    expect(low).toBeGreaterThan(high)
  })
})
