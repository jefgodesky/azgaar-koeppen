import type AzgaarMapCoords from '../../types/AzgaarMapCoords.ts'
import type MapBounds from '../../types/MapBounds.ts'

const extractMapBounds = (src: AzgaarMapCoords): MapBounds => {
  return {
    latitude: {
      total: src.latT,
      north: src.latN,
      south: src.latS
    },
    longitude: {
      total: src.lonT,
      east: src.lonE,
      west: src.lonW
    }
  }
}

export default extractMapBounds
