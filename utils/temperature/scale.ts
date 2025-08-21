import * as d3 from 'd3'

const data: Array<{ color: string, c: number }> = [
  { color: '7c7c7c', c: -60 },
  { color: 'cbc2cf', c: -40 },
  { color: 'ab2ee0', c: -20 },
  { color: '00d9d9', c: 0 },
  { color: '2bb100', c: 5 },
  { color: 'e3e300', c: 20 },
  { color: 'b23300', c: 30 },
  { color: '4a0200', c: 50 }
]

export default d3.scaleLinear<string>()
  .domain(data.map(stop => stop.c))
  .range(data.map(stop => stop.color))
  .interpolate(d3.interpolateRgb)
