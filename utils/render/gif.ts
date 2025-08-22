import { Resvg } from '@resvg/resvg-js'
import { GIFEncoder, quantize, applyPalette } from 'npm:gifenc/dist/gifenc.esm.js'
import { decode } from 'fast-png'
import type Hex from '../../types/Hex.ts'
import type World from '../../types/World.ts'
import getMonthNames from '../calendar/month-names.ts'
import renderSVG from './svg.ts'
import scale from '../temperature/scale.ts'

const renderGIF = (
  world: World,
  data: Record<string, Hex>,
  dest: string
): void => {
  const arr = Object.values(data)
  const months = getMonthNames(world)
  const frames = months.map(month => {
    const values = new Map<string, number>()
    for (const hex of arr) values.set(hex.id, hex.climate.temperatures[month])
    return renderSVG(data, { values, scale })
  })

  const gif = GIFEncoder()
  for (const frame of frames) {
    const svg = new Resvg(frame)
    const png = svg.render().asPng()
    const { data, width, height } = decode(png)
    const palette = quantize(data, 256)
    const index = applyPalette(data, palette)
    gif.writeFrame(index, width, height, {
      palette,
      delay: 300,
      transparent: false
    })
  }

  gif.finish({ loop: 0 })
  Deno.writeFileSync(dest, gif.bytes())
}

export default renderGIF
