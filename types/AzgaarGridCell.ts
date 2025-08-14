import AzgaarCell, { createAzgaarCell } from './AzgaarCell.ts'

interface AzgaarGridCell extends AzgaarCell {
  b: number
  temp: number
  precip: number
}

export const createAzgaarGridCell = (overrides?: Partial<AzgaarGridCell>): AzgaarGridCell => {
  return {
    b: 0,
    temp: 0,
    precip: 0,
    ...createAzgaarCell(overrides),
    ...overrides
  }
}

export default AzgaarGridCell
