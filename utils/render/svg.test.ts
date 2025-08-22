import { describe, it, beforeEach } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import * as d3 from 'd3'
import Hex, { createHexes } from '../../types/Hex.ts'
import render, { type RenderOptions } from './svg.ts'

describe('render', () => {
  let world: Record<string, Hex> = {}
  const values = new Map<string, number>()
  const color1 = '#0000ff'
  const color2 = '#ff0000'
  const scale = d3.scaleLinear<string>()
    .domain([0, 35])
    .range([color1, color2])
    .interpolate(d3.interpolateRgb)
  const options: RenderOptions = { values, scale }

  beforeEach(() => {
    world = createHexes()
    values.clear()
    const entries = Object.keys(world).entries()
    for (const [index, id] of entries) values.set(id, index * 5)
  })

  it('renders an SVG', () => {
    const actual = render(world, options)
    expect(actual.startsWith('<svg')).toBe(true)
    expect(actual.includes('xmlns="http://www.w3.org/2000/svg"')).toBe(true)
  })

  it('renders one path per hexagon', () => {
    const actual = render(world, options)
    const polys = actual.match(/<path /g) ?? []
    expect(polys.length).toBe(Object.keys(world).length)
  })

  it('applies the color scale', () => {
    const actual = render(world, options)
    expect(actual.includes(`fill="#db0024"`)).toBe(true)
  })

  it('applies filters', () => {
    world[Object.keys(world)[0]].type = [0, 1]
    const options: RenderOptions = {
      conditions: [
        { condition: (hex: Hex) => hex.type[1] > 0.5, color: color1 }
      ]
    }
    const actual = render(world, options)
    expect(actual.includes(`fill="${color1}"`)).toBe(true)
  })
})
