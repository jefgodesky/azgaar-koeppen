import AzgaarCell, { createAzgaarCell } from './AzgaarCell.ts'

interface AzgaarPackCell extends AzgaarCell {
  p: number[]
  g: number
  area: number
  haven: number
  harbor: number
  fl: number
  r: number
  conf: number
  biome: number
  s: number
  pop: number
  culture: number
  burg: number
  state: number
  religion: number
  province: number
}

export const createAzgaarPackCell = (overrides?: Partial<AzgaarPackCell>): AzgaarPackCell => {
  return {
    p: [],
    g: 0,
    area: 100,
    haven: 0,
    harbor: 0,
    fl: 0,
    r: 0,
    conf: 0,
    biome: 1,
    s: 0,
    pop: 0,
    culture: 0,
    burg: 0,
    state: 0,
    religion: 0,
    province: 0,
    ...createAzgaarCell(overrides),
    ...overrides
  }
}

export default AzgaarPackCell
