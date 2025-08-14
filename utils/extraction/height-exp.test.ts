import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createAzgaarSettings } from '../../types/AzgaarSettings.ts'
import extractHeightExp from './height-exp.ts'

describe('extractHeightExp', () => {
  it('returns the height exponent from a settings object', () => {
    const settings = createAzgaarSettings({ heightExponent: '3' })
    expect(extractHeightExp(settings)).toBe(3)
  })

  it('returns NaN if not given a settings object with a valid height exponent', () => {
    const settings = createAzgaarSettings({ heightExponent: 'three' })
    expect(isNaN(extractHeightExp(settings))).toBe(true)
  })
})
