import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { area } from '@turf/turf'
import getHexFeature from './hex-feature.ts'

describe('getHexFeature', () => {
  const feature = getHexFeature('85283473fffffff')

  it('returns a Polygon feature', () => {
    expect(feature.geometry.type).toEqual('Polygon')
  })

  it('returns exactly one linear ring', () => {
    expect(feature.geometry.coordinates.length).toEqual(1)
  })

  it('returns a closed ring (first coord equals last)', () => {
    const ring = feature.geometry.coordinates[0]
    const first = ring[0]
    const last = ring[ring.length - 1]
    expect(first).toEqual(last)
  })

  it('returns 5 or 6 distinct vertices plus the closing vertex', () => {
    const ring = feature.geometry.coordinates[0]
    const ok = [6, 7]
    expect(ok.includes(ring.length)).toBe(true)
  })

  it('produces coordinates in [lon, lat] ranges', () => {
    const ring = feature.geometry.coordinates[0] as [number, number][]
    const ok = ring.every(([lon, lat]) =>
      Number.isFinite(lon) && Number.isFinite(lat) &&
      Math.abs(lon) <= 180 && Math.abs(lat) <= 90
    )
    expect(ok).toEqual(true)
  })

  it('has positive area', () => {
    expect(area(feature) > 0).toEqual(true)
  })
})
