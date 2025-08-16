import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import celsiusToFahrenheit from './celsius-fahrenheit.ts'

describe('celsiusToFahrenheit', () => {
  it('converts degrees Celsius to degrees Fahrenheit', () => {
    expect(celsiusToFahrenheit(21.5)).toBeCloseTo(70.7)
  })
})
