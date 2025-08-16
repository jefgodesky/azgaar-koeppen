import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import fahrenheitToKelvin from './fahrenheit-kelvin.ts'

describe('fahrenheitToKelvin', () => {
  it('converts degrees Fahrenheit to degrees Kelvin', () => {
    expect(fahrenheitToKelvin(82)).toBeCloseTo(300.93)
  })
})
