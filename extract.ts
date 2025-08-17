import type AzgaarInfo from './types/AzgaarInfo.ts'
import type AzgaarMapCoords from './types/AzgaarMapCoords.ts'
import type AzgaarSettings from './types/AzgaarSettings.ts'
import type AzgaarPackCell from './types/AzgaarPackCell.ts'
import type AzgaarGridCell from './types/AzgaarGridCell.ts'
import Cell, { createCell } from './types/Cell.ts'
import extractHeightExp from './utils/extraction/height-exp.ts'
import extractMapBounds from './utils/extraction/map-bounds.ts'
import extractBiomes from './utils/extraction/biomes.ts'
import extractArea from './utils/extraction/area.ts'
import extractCoords from './utils/extraction/coords.ts'
import extractElevation from './utils/extraction/elevation.ts'

type DataObj = Record<string, unknown>

const extract = (src: string, output: string): void => {
  try {
    const content = Deno.readTextFileSync(src)
    const data: DataObj = JSON.parse(content)
    const info = data.info as AzgaarInfo
    const settings = data.settings as AzgaarSettings

    const heightExponent = extractHeightExp(data.settings as AzgaarSettings)
    const bounds = extractMapBounds(data.mapCoordinates as AzgaarMapCoords)
    const biomes = extractBiomes(data)
    const packCells = (data.pack as DataObj).cells as AzgaarPackCell[]
    const gridCells = (data.grid as DataObj).cells as AzgaarGridCell[]

    const cells: Record<number, Cell> = {}
    packCells.forEach(p => {
      const id = p.i
      const [x, y] = p.p
      const g = gridCells.find(g => g.i === p.g)

      cells[id] = createCell({
        id,
        type: biomes[p.biome] === 'Marine' ? 'water' : 'land',
        coords: extractCoords(p, info, bounds),
        point: { x, y },
        area: extractArea(p, settings),
        elevation: g ? extractElevation(p, g, heightExponent) : 0,
        neighbors: p.c
      })
    })

    Deno.writeTextFileSync(output, JSON.stringify(cells))
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'No error message provided'
    console.error(`Error reading file: ${msg}`)
    Deno.exit(1)
  }
}

if (import.meta.main) {
  const srcFlagIndex = Deno.args.indexOf('-src')
  if (srcFlagIndex < 0 || srcFlagIndex === Deno.args.length - 1) {
    console.error('Usage: deno task extract -src <value>')
    Deno.exit(1)
  }

  const oFlagIndex = Deno.args.indexOf('-o') || Deno.args.indexOf('--output')
  if (oFlagIndex < 0 || oFlagIndex === Deno.args.length - 1) {
    console.error('Usage: deno task extract -o <value>')
    Deno.exit(1)
  }

  const src = Deno.args[srcFlagIndex + 1]
  const output = Deno.args[oFlagIndex + 1]
  extract(src, output)
}

export default extract
