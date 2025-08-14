import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import extractBiomes from './biomes.ts'

describe('extractBiomes', () => {
  const data = {
    biomesData: {
      i: [0, 1, 14],
      name: ['Marine', 'Hot desert', 'Custom biome']
    }
  }

  it('extracts the dictionary of biome names', () => {
    const actual = extractBiomes(data)
    expect(actual[0]).toBe('Marine')
    expect(actual[1]).toBe('Hot desert')
    expect(actual[14]).toBe('Custom biome')
  })
})
