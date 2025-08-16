import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import fahrenheitToCelsius from './fahrenheit-celsius.ts'

describe('fahrenheitToCelsius', () => {
  it('converts degrees Fahrenheit to degrees Celsius', () => {
    expect(fahrenheitToCelsius(75)).toBeCloseTo(23.89)
  })
})
