import { polygon } from '@turf/turf'
import type { Feature, Polygon, Position } from 'geojson'
import { cellToBoundary } from 'npm:h3-js'

/**
 * Returns the GeoJSON feature for an H3 hexagon
 * @param {string} id - The ID of an H3 hexagon.
 * @returns {Feature<Polygon>} - A GeoJSON polygon feature corresponding to the
 *   H3 hexagon specified.
 */

const getHexFeature = (id: string): Feature<Polygon> => {
  const ring = cellToBoundary(id, true)
  const first = ring[0].join(',')
  const last = ring[ring.length - 1].join(',')
  const closed: Position[] = first === last ? ring : [...ring, ring[0]]
  return polygon([closed])
}

export default getHexFeature
