import { program } from 'commander'

import type World from './types/World.ts'
import type Hex from './types/Hex.ts'
import extract from './extract.ts'
import getAverage from './utils/math/avg.ts'
import getMonthNames from './utils/calendar/month-names.ts'
import calculateBaseTemp from './utils/temperature/base.ts'
import calculateRelaxedTemp from './utils/temperature/relaxed.ts'
import calculateDiffusedTemps from './utils/temperature/diffused.ts'
import updateConsole from './utils/update-console.ts'
import renderGIF from './utils/render/gif.ts'
import renderSVG from "./utils/render/svg.ts"

import world from './world.ts'
import scale from './utils/temperature/scale.ts'

const calculatePreliminaryTemps = (
  source: string,
  world: World,
  years: number = 250,
  maps: boolean = true
): Record<string, Hex> => {
  const hexes = extract(source)
  console.log(`\nExtracted ${Object.keys(hexes).length.toLocaleString()} H3 hexagons (resolution 3)`)

  const arr = Object.values(hexes)
  const months = getMonthNames(world)
  const temps = new Map<string, number>()

  for (let y = 1; y <= years; y++) {
    updateConsole(`Calculating preliminary temperatures for year ${y}/${years}...`)

    for (const month of months) {
      const relaxed = new Map<string, number>()
      for (const hex of arr) {
        const prev = temps.get(hex.id) ?? calculateBaseTemp(world, hex, month)
        const r = calculateRelaxedTemp(world, hex, month, prev)
        relaxed.set(hex.id, r)
      }

      const diffused = calculateDiffusedTemps(hexes, relaxed)
      for (const [id, temp] of diffused.entries()) {
        temps.set(id, temp)
        if (y === years) hexes[id].climate.temperatures[month] = temp
      }
    }
  }

  if (!maps) return hexes

  const path = './maps/preliminary'
  Deno.mkdirSync(path, { recursive: true })
  renderGIF(world, hexes, `${path}/monthly.gif`)

  const values = new Map<string, number>()
  for (const { id, climate } of arr) {
    const monthly = Object.values(climate.temperatures)
    values.set(id, getAverage(...monthly))
  }

  const svg = renderSVG(hexes, { scale, values })
  Deno.writeTextFileSync(`${path}/annual.svg`, svg)
  console.log(`\nSaved maps to ${path}`)

  return hexes
}

if (import.meta.main) {
  program
    .name('azgaar-koeppen-base-temps')
    .description('Calculate first-pass, baseline temperatures from the full JSON export of a map created with Azgaar’s Fantasy Map Generator.')
    .version('1.0.0')
    .option('-s, --source <path>', 'The full JSON export to extract.')
    .option('-d, --dest <path>', 'A JSON file to save extracted data to.')
    .option('-y, --years <number>', 'The number of years to run before taking temperatures.', (val: string) => parseInt(val), 250)
    .option('-m, --maps', 'Should the script produce monthly temperature SVG maps in /maps/prelim-temps?', true)

  program.parse(Deno.args, { from: 'user' })
  const { source, dest, years, maps } = program.opts()
  const data = calculatePreliminaryTemps(source, world, years, maps)
  Deno.writeTextFileSync(dest, JSON.stringify(data))
  console.log(`Saved data to ${dest}`)
}

export default calculatePreliminaryTemps
