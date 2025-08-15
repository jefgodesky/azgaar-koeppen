import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createAzgaarSettings } from '../../types/AzgaarSettings.ts'
import { createAzgaarPackCell } from '../../types/AzgaarPackCell.ts'
import extractArea from './area.ts'

describe('extractArea', () => {
  const settings = createAzgaarSettings({ distanceScale: '3' })
  const cell = createAzgaarPackCell({ area: 100 })

  it('extracts the dictionary of biome names', () => {
    const actual = extractArea(cell, settings)
    expect(actual).toBe(900)
  })
})
