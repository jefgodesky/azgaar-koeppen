import { describe, it, beforeEach } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Hex, { createHex } from '../../types/Hex.ts'
import { createWorld } from '../../types/World.ts'
import calculateContinentalPressure from './continental.ts'

describe('calculateContinentalPressure', () => {
  const world = createWorld()

  const makeTestHex = (type: 'ocean' | 'coastal' | 'interior'): Hex => {
    const land = type === 'ocean' ? 0 : type === 'interior' ? 1 : 0.5
    const water = 1 - land
    const hex = createHex({ center: { latitude: 40, longitude: 0 }, type: [water, land] })
    hex.climate.continentality = type === 'interior' ? 10 : 0
    return hex
  }

  it('returns zero for ocean', () => {
    const actual = calculateContinentalPressure(world, makeTestHex('ocean'), 'May')
    expect(actual).toBe(0)
  })

  it('returns zero for coasts', () => {
    const actual = calculateContinentalPressure(world, makeTestHex('coastal'), 'May')
    expect(actual).toBe(0)
  })

  it('increases further inland', () => {
    const coastal = calculateContinentalPressure(world, makeTestHex('coastal'), 'Jan')
    const interior = calculateContinentalPressure(world, makeTestHex('interior'), 'Jan')
    expect(coastal).toBeLessThan(interior)
  })

  it('is positive in winter', () => {
    const actual = calculateContinentalPressure(world, makeTestHex('interior'), 'Jan')
    expect(actual).toBeGreaterThan(0)
  })

  it('is negative in summer', () => {
    const actual = calculateContinentalPressure(world, makeTestHex('interior'), 'Jun')
    expect(actual).toBeLessThan(0)
  })
})
