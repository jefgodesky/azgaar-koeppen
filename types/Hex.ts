interface Hex {
  id: string
  type: [number, number]
  elevation: [number, number]
  climate: {
    classification: string
    temperatures: Record<string, number>
    precipitation: Record<string, number>
  }
}

export const createHex = (overrides?: Partial<Hex>): Hex => {
  return {
    id: '85283473fffffff',
    type: [1, 0],
    elevation: [0, 0],
    climate: {
      classification: '-',
      temperatures: {},
      precipitation: {}
    },
    ...overrides
  }
}

export const createHexes = (): Record<string, Hex> => {
  const keys = [0, 1, 2, 3, 4, 5, 6].map(n => `83000${n}fffffffff`)
  const hexes: Record<string, Hex> = {}
  for (const id of keys) {
    hexes[id] = createHex({ id })
  }

  return hexes
}

export default Hex
