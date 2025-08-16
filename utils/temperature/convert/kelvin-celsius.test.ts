import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import kelvinToCelsius from './kelvin-celsius.ts'

describe('kelvinToCelsius', () => {
  it('converts degrees Kelvin to degrees Celsius', () => {
    expect(kelvinToCelsius(300)).toBeCloseTo(26.85)
  })
})
