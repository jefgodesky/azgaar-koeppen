import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createAzgaarPackCell } from '../../types/AzgaarPackCell.ts'
import { createAzgaarGridCell } from '../../types/AzgaarGridCell.ts'
import extractElevation from './elevation.ts'

describe('extractElevation', () => {
  it('returns elevation above sea level in meters', () => {
    const pack = createAzgaarPackCell({ h: 67 })
    const grid = createAzgaarGridCell()
    const actual = extractElevation(pack, grid, 2)
    expect(actual).toBe(2401)
  })

  it('returns ocean depth as negative meters', () => {
    const pack = createAzgaarPackCell({ h: 2 })
    const grid = createAzgaarGridCell({ h: 2 })
    const actual = extractElevation(pack, grid, 2)
    expect(actual).toBe(-450)
  })
})
