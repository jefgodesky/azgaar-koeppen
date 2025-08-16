import type Cell from '../../types/Cell.ts'
import type CellFilter from '../../types/CellFilter.ts'
import findAdjacent from './adjacent.ts'

const findRegion = (
  world: Record<number, Cell>,
  start: Cell | number,
  filter: CellFilter
): number[] => {
  let indices = [typeof start === 'number' ? start : start.id]
  let previousSize

  do {
    previousSize = indices.length
    const adjacent = findAdjacent(world, indices)
      .filter(index => filter(world[index]))
    indices = [...new Set([...indices, ...adjacent])]
  } while (indices.length > previousSize)

  return indices
}

export default findRegion
