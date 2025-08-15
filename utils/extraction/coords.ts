import type AzgaarInfo from '../../types/AzgaarInfo.ts'
import type AzgaarPackCell from '../../types/AzgaarPackCell.ts'
import type Coords from '../../types/Coords.ts'
import type MapBounds from '../../types/MapBounds.ts'

const extractCoords = (
  cell: AzgaarPackCell,
  info: AzgaarInfo,
  bounds: MapBounds
): Coords => {
  const [x, y] = cell.p
  const { width, height } = info
  const { north, total: latitudes } = bounds.latitude
  const { west, total: longitudes } = bounds.longitude

  return {
    latitude: north - ((y / height) * latitudes),
    longitude: west + ((x / width) * longitudes)
  }
}

export default extractCoords
