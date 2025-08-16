import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Cell, { createTinyWorld } from '../../types/Cell.ts'
import type CellFilter from "../../types/CellFilter.ts"
import findRegion from './region.ts'

describe('findRegion', () => {
  it('finds all contiguous cells that match filter', () => {
    const filter: CellFilter = (_c: Cell) => true
    const actual = findRegion(createTinyWorld(), 1, filter)
    expect(actual).toHaveLength(9)
  })
})
