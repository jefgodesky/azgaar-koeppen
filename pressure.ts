import { program } from 'commander'
import * as d3 from 'd3'

import type World from './types/World.ts'
import type Hex from './types/Hex.ts'
import calculatePreliminaryTemps from './preliminary-temps.ts'
import getMonthNames from './utils/calendar/month-names.ts'
import calculatePressure from './utils/pressure/index.ts'
import renderGIF from './utils/render/gif.ts'

import world from './world.ts'

const calculateAtmosphericPressure = (
  source: string,
  world: World,
  years: number = 250,
  maps: boolean = true
): Record<string, Hex> => {
  const hexes = calculatePreliminaryTemps(source, world, years, maps)

  const months = getMonthNames(world)
  const arr = Object.values(hexes)
  for (const month of months) {
    for (const hex of arr) {
      hex.climate.pressure[month] = calculatePressure(world, hex, month)
    }
  }

  if (!maps) return hexes

  const path = './maps'
  Deno.mkdirSync(path, { recursive: true })
  const scale = d3.scaleLinear<string>()
    .domain([1000, 1025])
    .range(['#0000ff', '#ff0000'])
    .interpolate(d3.interpolateRgb)
  renderGIF(world, hexes, `${path}/pressure.gif`, 'pressure', scale)

  return hexes
}

if (import.meta.main) {
  program
    .name('azgaar-koeppen-pressure')
    .description('Calculate atmospheric pressure from the full JSON export of a map created with Azgaar’s Fantasy Map Generator.')
    .version('1.0.0')
    .option('-s, --source <path>', 'The full JSON export to extract.')
    .option('-d, --dest <path>', 'A JSON file to save extracted data to.')
    .option('-y, --years <number>', 'The number of years to run before taking temperatures.', (val: string) => parseInt(val), 250)
    .option('-m, --maps', 'Should the script produce monthly temperature SVG maps in /maps/prelim-temps?', true)

  program.parse(Deno.args, { from: 'user' })
  const { source, dest, years, maps } = program.opts()
  const data = calculateAtmosphericPressure(source, world, years, maps)
  Deno.writeTextFileSync(dest, JSON.stringify(data))
  console.log(`Saved data to ${dest}`)
}

export default calculateAtmosphericPressure
