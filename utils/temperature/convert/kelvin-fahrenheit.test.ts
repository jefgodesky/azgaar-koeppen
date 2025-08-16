import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import kelvinToFahrenheit from './kelvin-fahrenheit.ts'

describe('kelvinToFahrenheit', () => {
  it('converts degrees Kelvin to degrees Fahrenheit', () => {
    expect(kelvinToFahrenheit(373.15)).toBeCloseTo(212)
  })
})
