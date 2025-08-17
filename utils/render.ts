import { Delaunay } from 'npm:d3-delaunay'
import chroma from 'chroma-js'
import type Cell from '../types/Cell.ts'
import type CellFilter from '../types/CellFilter.ts'

export interface RenderColorOptions {
  conditions?: Array<{ condition: CellFilter, color: string }>
  values?: Map<number, number>
  scale?: (value: number) => chroma.Color | string
}

const getScaleColor = (value: number, scale: (value: number) => chroma.Color | string): string => {
  const color = scale(value)
  return typeof color === 'string' ? color : chroma(color).hex()
}

const getConditionColor = (cell: Cell, conditions: Array<{ condition: CellFilter, color: string }>): string => {
  for (const { condition, color } of conditions) {
    if (condition(cell)) return color
  }

  return ''
}

const getColor = (cell: Cell, options: RenderColorOptions): string => {
  if (options.values && options.scale) {
    const value = options.values.get(cell.id)
    return value ? getScaleColor(value, options.scale) : ''
  }

  if (options.conditions) return getConditionColor(cell, options.conditions)
  return ''
}

/**
 * Render an SVG map of the provided cells.
 * @param {Record<number, Cell>} cells - The cells to render.
 * @param {RenderColorOptions} options - Options for how cells should be colored.
 * @param {Array<{ condition: CellFilter, color: string }>} options.conditions
 *   - If provided, these conditions will be applied to color cells. This will
 *   return the first color in the array that the cell meets the condition for,
 *   meaning that conditions that appear earlier in the array will take
 *   precedence over those that appear later. This option is only used if
 *   `options.values` and `options.scale` are _not_ provided.
 * @param {Map<number, number>} options.values - If this and `options.scale`
 *   are provided, then a color scale will be applied to each cell based on
 *   the values provided by this map (mapping each cell's ID to the value that
 *   the cell should be colored according to). If all three of this,
 *   `options.conditions`, and `options.scale` are provided, this and
 *   `options.scale` will be used and `options.conditions` will be ignored.
 * @param {(value: number) => chroma.Color | string} options.scale - If this
 *   and `options.values` are both provided, this function will be used to
 *   apply a color scale to each cell based on the values provided in
 *   `options.values`. If all three of this, `options.values`, and
 *   `options.conditions` are provided, this and `options.values` will be used
 *   and `options.conditions` will be ignored.
 * @returns {string} - The rendered SVG map.
 */

const renderSVG = (
  cells: Record<number, Cell>,
  options: RenderColorOptions
): string => {
  const arr = Object.values(cells).sort((a, b) => a.id - b.id)
  const pts = arr.map(c => [c.point.x, c.point.y]) as [number, number][]

  const xs = pts.map(p => p[0])
  const ys = pts.map(p => p[1])
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  const delaunay = Delaunay.from(pts)
  const voronoi = delaunay.voronoi([minX, minY, maxX, maxY])

  const polygons = arr.map((cell: Cell, index: number) => {
    const poly = voronoi.cellPolygon(index)
    if (!poly) return null

    const points = (poly as [number, number][])
      .map(([x, y]) => `${x},${y}`)
      .join(' ')

    const color = getColor(cell, options)

    return color
      ? `<polygon points="${points}" fill="${color}" />`
      : `<polygon points="${points}" />`
  }).filter(poly => poly !== null)

  return `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="${minX} ${minY} ${maxX} ${maxY}"
preserveAspectRatio="xMidYMid meet">
${polygons.join('\n')}
</svg>`
}

export default renderSVG
