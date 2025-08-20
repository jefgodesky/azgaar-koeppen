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

export default Hex
