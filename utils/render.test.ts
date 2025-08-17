import { describe, it, beforeEach } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import chroma from 'chroma-js'
import Cell, { createTinyWorld } from '../types/Cell.ts'
import render, { type RenderColorOptions } from './render.ts'

describe('render', () => {
  let world: Record<number, Cell> = {}
  const values = new Map<number, number>()
  const color1 = '0000ff'
  const color2 = 'ff0000'
  const scale = chroma.scale([color1, color2]).domain([0,100])
  const options: RenderColorOptions = { values, scale }

  beforeEach(() => {
    world = createTinyWorld()
    values.clear()
    for (const cell of Object.values(world)) values.set(cell.id, cell.id * 5)
  })

  it('renders an SVG', () => {
    const actual = render(world, options)
    expect(actual.startsWith('<svg')).toBe(true)
    expect(actual.includes('xmlns="http://www.w3.org/2000/svg"')).toBe(true)
    console.log(actual)
  })

  it('sizes to contain all cells', () => {
    const actual = render(world, options)
    const viewbox = /viewBox="([^"]+)"/.exec(actual)?.[1]
    expect(viewbox).toBe('10 10 30 30')
  })

  it('renders one polygon per cell', () => {
    const actual = render(world, options)
    const polys = actual.match(/<polygon /g) ?? []
    expect(polys.length).toBe(Object.keys(world).length)
  })

  it('applies the color scale', () => {
    const actual = render(world, options)
    expect(actual.includes(`fill="#0d00f2"`)).toBe(true)
  })

  it('applies filters', () => {
    world[1].type = 'land'
    const options: RenderColorOptions = {
      conditions: [
        { condition: (cell: Cell) => cell.type === 'land', color: `#${color1}` }
      ]
    }
    const actual = render(world, options)
    expect(actual.includes(`fill="#${color1}"`)).toBe(true)
  })
})
