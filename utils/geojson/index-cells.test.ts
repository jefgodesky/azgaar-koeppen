import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { polygon, multiPolygon } from 'npm:@turf/helpers'
import type { FeatureCollection, Polygon, MultiPolygon } from 'geojson'
import type AzgaarCellProperties from '../../types/AzgaarCellProperties.ts'
import indexCells from './index-cells.ts'

type AzgaarCells = FeatureCollection<Polygon | MultiPolygon, AzgaarCellProperties>

describe('indexCells', () => {
  const coll = (): AzgaarCells => ({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { height: 10, biome: 0 },
        geometry: polygon([[
          [0, 0], [1, 0], [1, 1], [0, 1], [0, 0]
        ]]).geometry
      },
      {
        type: 'Feature',
        properties: { height: 200, biome: 1 },
        geometry: polygon([[
          [2, 2], [3, 2], [3, 3], [2, 3], [2, 2]
        ]]).geometry
      },
      {
        type: 'Feature',
        // @ts-ignore testing invalid input
        properties: null,
        geometry: polygon([[
          [4, 4], [5, 4], [5, 5], [4, 5], [4, 4]
        ]]).geometry
      },
      {
        type: 'Feature',
        properties: { height: 50, biome: 2 },
        geometry: multiPolygon([
          [[[10, 10], [11, 10], [11, 11], [10, 11], [10, 10]]]
        ]).geometry
      }
    ]
  })

  it('returns an empty array for an empty FeatureCollection', () => {
    const empty = { type: 'FeatureCollection', features: [] } as AzgaarCells
    const actual = indexCells(empty)
    expect(actual.length).toEqual(0)
  })

  it('indexes only valid features (skips missing properties/geometry)', () => {
    const actual = indexCells(coll())
    expect(actual.length).toEqual(3)
  })

  it('identifies water cells', () => {
    const actual = indexCells(coll())
    expect(actual[0].type).toBe('water')
  })

  it('identifies land cells', () => {
    const actual = indexCells(coll())
    expect(actual[1].type).toBe('land')
  })

  it('copies elevation from properties.height', () => {
    const actual = indexCells(coll())
    expect(actual[1].elevation).toEqual(200)
  })

  it('computes bounding boxes', () => {
    const actual = indexCells(coll())
    expect(actual[0].bbox).toEqual([0, 0, 1, 1])
    expect(actual[1].bbox).toEqual([2, 2, 3, 3])
  })
})
