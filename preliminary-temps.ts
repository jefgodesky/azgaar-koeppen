import { program } from 'commander'

import type World from './types/World.ts'
import type Cell from './types/Cell.ts'
import world from './world.ts'
import extract from './extract.ts'
import getMonthNames from './utils/calendar/month-names.ts'
import calculateBaseTemp from './utils/temperature/base.ts'
import calculateRelaxedTemp from './utils/temperature/relaxed.ts'
import calculateDiffusedTemps from './utils/temperature/diffused.ts'
import updateConsole from './utils/update-console.ts'

const calculatePreliminaryTemps = (world: World, cells: Record<number, Cell>, years: number = 250): Record<number, Cell> => {
  const arr = Object.values(cells)
  const months = getMonthNames(world)
  const temps = new Map<number, number>()

  for (let y = 1; y <= years; y++) {
    updateConsole(`Calculating preliminary temperatures for year ${y}/${years}...`)

    for (const month of months) {
      const relaxed = new Map<number, number>()
      for (const cell of arr) {
        const prev = temps.get(cell.id) ?? calculateBaseTemp(world, cell, month)
        const r = calculateRelaxedTemp(world, cell, month, prev)
        relaxed.set(cell.id, r)
      }

      const diffused = calculateDiffusedTemps(cells, relaxed)
      for (const [id, temp] of diffused.entries()) {
        temps.set(id, temp)
        if (y === years) cells[id].climate.temperatures[month] = temp
      }
    }
  }

  return cells
}

if (import.meta.main) {
  program
    .name('azgaar-koeppen-base-temps')
    .description('Calculate first-pass, baseline temperatures from the full JSON export of a map created with Azgaar’s Fantasy Map Generator.')
    .version('1.0.0')
    .option('-s, --source <path>', 'The full JSON export to extract.')
    .option('-d, --dest <path>', 'A JSON file to save extracted data to.')
    .option('-y, --years <number>', 'The number of years to run before taking temperatures.', (val: string) => parseInt(val), 250)

  program.parse(Deno.args, { from: 'user' })
  const { source, dest, years } = program.opts()
  const data = calculatePreliminaryTemps(world, extract(source), years)
  Deno.writeTextFileSync(dest, JSON.stringify(data))
}
