import { program } from 'commander'
import { area, intersect, featureCollection, bbox } from '@turf/turf'
import { getRes0Cells, cellToChildren } from 'h3-js'
import { roundToFixed, roundToPrecision } from '@codemonument/simple-rounding'

import type { FeatureCollection, Polygon, MultiPolygon } from 'geojson'
import type AzgaarCellProperties from './types/AzgaarCellProperties.ts'
import Hex, { createHex } from './types/Hex.ts'
import doBBoxesOverlap from './utils/geojson/bbox-overlap.ts'
import indexCells from './utils/geojson/index-cells.ts'
import hexFeature from './utils/geojson/hex-feature.ts'
import setElevation from './utils/elevation.ts'
import updateConsole from './utils/update-console.ts'

const makeH3 = (source: string): Record<string, Hex> => {
  const geo = JSON.parse(Deno.readTextFileSync(source)) as FeatureCollection<Polygon | MultiPolygon, AzgaarCellProperties>
  const ids = getRes0Cells().flatMap(base => cellToChildren(base, 3))
  const cells = indexCells(geo)
  const hexes: Record<string, Hex> = {}

  for (const [n, id] of ids.entries()) {
    updateConsole(`Generating hexes... ${roundToFixed((n / ids.length) * 100, 2, 2)}%`)

    const hex = hexFeature(id)
    const box = bbox(hex)
    const hexa = area(hex)
    let land = 0
    let el: [number, number] = [Number.NaN, Number.NaN]

    for (const cell of cells) {
      if (!doBBoxesOverlap(box, cell.bbox)) continue
      const coll: FeatureCollection<Polygon | MultiPolygon> = featureCollection([hex, cell.feature])
      const overlap = intersect(coll)
      const a = overlap ? area(overlap) : 0
      if (a <= 0) continue

      const { type, elevation } = cell
      if (type === 'land') land += a

      el = setElevation(elevation, el)
    }

    land = roundToPrecision(land / hexa, 2)
    const water = roundToPrecision(1 - land, 2)

    hexes[id] = createHex({
      id,
      type: [water, land],
      elevation: el
    })
  }

  return hexes
}

if (import.meta.main) {
  program
    .name('azgaar-koeppen-make-h3')
    .description('Extract data from the GeoJSON export from a map created with Azgaar’s Fantasy Map Generator to H3 hexagons.')
    .version('1.0.0')
    .option('-s, --source <path>', 'The cells GeoJSON export to extract.')
    .option('-d, --dest <path>', 'A JSON file to save extracted data to.')

  program.parse(Deno.args, { from: 'user' })
  const { source, dest } = program.opts()
  const data = makeH3(source)
  Deno.writeTextFileSync(dest, JSON.stringify(data))
}

export default makeH3
