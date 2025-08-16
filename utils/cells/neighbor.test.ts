import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { createTinyWorld } from '../../types/Cell.ts'
import findNeighbor from './neighbor.ts'

describe('findNeighbor', () => {
  it('finds the next neighbor in a direction', () => {
    const actual = findNeighbor(createTinyWorld(), 5, 'e')
    expect(actual.id).toBe(6)
  })

  it('finds the next neighbor along a bearing', () => {
    const actual = findNeighbor(createTinyWorld(), 5, 90)
    expect(actual.id).toBe(6)
  })
})
