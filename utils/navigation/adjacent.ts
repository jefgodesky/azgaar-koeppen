import type Cell from '../../types/Cell.ts'

const findAdjacent = (world: Record<number, Cell>, set: number[]): number[] => {
  return [...new Set(set.flatMap(index => world[index].neighbors))]
    .filter(id => !set.includes(id))
}

export default findAdjacent
