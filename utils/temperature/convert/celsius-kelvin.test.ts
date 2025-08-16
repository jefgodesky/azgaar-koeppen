import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import celsiusToKelvin from './celsius-kelvin.ts'

describe('celsiusToKelvin', () => {
  it('converts degrees Celsius to degrees Kelvin', () => {
    expect(celsiusToKelvin(26.85)).toBeCloseTo(300)
  })
})
