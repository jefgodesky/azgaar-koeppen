// utils/indexFeatures.ts
import { bbox } from 'npm:@turf/turf'
import type { Feature, FeatureCollection, Polygon, MultiPolygon, BBox } from 'geojson'
import type AzgaarCellProperties from '../../types/AzgaarCellProperties.ts'

type CellGeometry = Polygon | MultiPolygon

export type IndexedCell = {
  feature: Feature<CellGeometry, AzgaarCellProperties>
  bbox: BBox
  elevation: number
  type: 'water' | 'land'
}

export const indexCells = (coll: FeatureCollection<CellGeometry, AzgaarCellProperties>): IndexedCell[] => {
  const index: IndexedCell[] = []

  for (const f of coll.features) {
    if (!f?.geometry || !f?.properties) continue
    const b = bbox(f) as BBox
    const elevation = f.properties.height
    const type = f.properties.biome === 0 ? 'water' : 'land'

    index.push({
      feature: f as Feature<CellGeometry, AzgaarCellProperties>,
      bbox: b,
      elevation,
      type
    })
  }

  return index
}

export default indexCells
