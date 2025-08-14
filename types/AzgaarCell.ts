interface AzgaarCell {
  i: number
  v: number[]
  c: number[]
  h: number
  f: number
  t: number
}

export const createAzgaarCell = (overrides?: Partial<AzgaarCell>): AzgaarCell => {
  return {
    i: 1,
    v: [],
    c: [],
    h: 20,
    f: 1,
    t: 0,
    ...overrides
  }
}

export default AzgaarCell
