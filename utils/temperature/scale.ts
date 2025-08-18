import chroma from 'chroma-js'

const data: Array<{ color: string, c: number }> = [
  { color: '010a3d', c: -30 },
  { color: '3c9eb8', c: -15 },
  { color: '31ca76', c: 0 },
  { color: '77cf0a', c: 15 },
  { color: 'd34502', c: 30 },
  { color: '810100', c: 45 }
]

export default chroma
  .scale(data.map(stop => stop.color))
  .domain(data.map(stop => stop.c))
