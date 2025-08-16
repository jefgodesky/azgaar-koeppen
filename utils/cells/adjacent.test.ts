import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createTinyWorld } from '../../types/Cell.ts'
import findAdjacent from './adjacent.ts'

describe('findAdjacent', () => {
  it('finds all adjacent cells to a set of cells', () => {
    const set = [1, 2, 3]
    const expected = [4, 5, 6]
    const actual = findAdjacent(createTinyWorld(), set)
    expect(actual.every(id => expected.includes(id))).toBe(true)
  })
})
