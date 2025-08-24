import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createWorld } from '../../types/World.ts'
import Hex, { createHex } from '../../types/Hex.ts'
import getMonthNames from '../calendar/month-names.ts'
import calculatePressure, { SEA_LEVEL_PRESSURE } from './index.ts'

describe('calculatePressure', () => {
  const world = createWorld()
  const months = getMonthNames(world)

  const createTestHex = (elevation: [number, number]): Hex => {
    const hex = createHex({ elevation })
    for (const month of months) hex.climate.temperatures[month] = 15
    return hex
  }

  it('factors in altitude and temperature', () => {
    const hex = createTestHex([2000, 2000])
    hex.climate.temperatures.Jan = 25
    const actual = calculatePressure(world, hex, 'Jan')
    expect(actual).toBeLessThan(SEA_LEVEL_PRESSURE)
  })
})
