import * as d3 from 'd3'
import type { Feature, Polygon } from 'geojson'
import type Hex from '../../types/Hex.ts'
import type HexFilter from '../../types/HexFilter.ts'
import getHexFeature from '../geojson/hex-feature.ts'

export interface RenderOptions {
  conditions?: Array<{ condition: HexFilter, color: string }>
  values?: Map<string, number>
  scale?: d3.ScaleLinear<string, string, never>
  width?: number
  height?: number
}

const getScaleColor = (value: number, scale: d3.ScaleLinear<string, string, never>): string => {
  const color = d3.color(scale(value))
  return color?.formatHex() ?? '#000000'
}

const getConditionColor = (hex: Hex, conditions: Array<{ condition: HexFilter, color: string }>): string => {
  for (const { condition, color } of conditions) {
    if (condition(hex)) return color
  }

  return 'none'
}

const getColor = (hex: Hex, options: RenderOptions): string => {
  if (options.values && options.scale) {
    const value = options.values.get(hex.id)
    return value === undefined ? 'none' : getScaleColor(value, options.scale)
  }

  if (options.conditions) return getConditionColor(hex, options.conditions)
  return 'none'
}

/**
 * Render an SVG map of the provided hexagons.
 * @param {Record<string, Hex>} hexes - The hexagons to render.
 * @param {RenderOptions} options - Options for how hexagons should be
 *   rendered.
 * @param {Array<{ condition: HexFilter, color: string }>} options.conditions
 *   - If provided, these conditions will be applied to color hexagons. This
 *   will return the first color in the array that the hexagon meets the
 *   condition for, meaning that conditions that appear earlier in the array
 *   will take precedence over those that appear later. This option is only
 *   used if `options.values` and `options.scale` are _not_ provided.
 * @param {Map<string, number>} options.values - If this and `options.scale`
 *   are provided, then a color scale will be applied to each hexagon based on
 *   the values provided by this map (mapping each hexagon's ID to the value
 *   that the hexagon should be colored according to). If all three of this,
 *   `options.conditions`, and `options.scale` are provided, this and
 *   `options.scale` will be used and `options.conditions` will be ignored.
 * @param {d3.ScaleLinear<string, string, never>} options.scale - If this and
 *   `options.values` are both provided, this function will be used to
 *   apply a color scale to each hexagon based on the values provided in
 *   `options.values`. If all three of this, `options.values`, and
 *   `options.conditions` are provided, this and `options.values` will be used
 *   and `options.conditions` will be ignored.
 * @param {number} width - The width of the SVG to render (default: 1000px).
 * @param {number} height - The height of the SVG to render (default: 500px).
 * @returns {string} - The rendered SVG map.
 */

const renderSVG = (
  hexes: Record<string, Hex>,
  options: RenderOptions
): string => {
  const w = options.width ?? 1000
  const h = options.height ?? 500

  const features: Map<string, Feature<Polygon>> = new Map()
  for (const id of Object.keys(hexes)) features.set(id, getHexFeature(id))

  const coll = {
    type: 'FeatureCollection',
    features: Array.from(features.values())
  } as GeoJSON.FeatureCollection
  const projection = d3.geoEquirectangular()
    .fitExtent([[0, 0], [w, h]], coll)
  const generator = d3.geoPath()
    .projection(projection)

  const paths = Object.values(hexes).map(hex => {
    const { id } = hex
    const d = generator(features.get(id))
    if (!d) return null

    const color = getColor(hex, options)
    return color === 'none'
      ? `<path id="${id}" d="${d}" />`
      : `<path id="${id}" fill="${color}" d="${d}" />`
  }).filter(path => path !== null)

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`,
    ...paths.map(path => '  ' + path),
    '</svg>'
  ].join('\n')
}

export default renderSVG
