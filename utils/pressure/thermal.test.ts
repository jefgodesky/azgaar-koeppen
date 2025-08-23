import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createHex } from '../../types/Hex.ts'
import { createWorld } from '../../types/World.ts'
import calculateThermalPressure from './thermal.ts'

describe('calculateThermalPressure', () => {
  it('returns lower pressure when the temperature is greater', () => {
    const hex = createHex()
    const world = createWorld()
    hex.climate.temperatures.Jan = 10
    hex.climate.temperatures.Jun = 20
    const hot = calculateThermalPressure(world, hex, 'Jun')
    const cold = calculateThermalPressure(world, hex, 'Jan')
    expect(cold).toBeGreaterThan(hot)
  })
})
