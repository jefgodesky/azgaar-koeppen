import type World from '../../types/World.ts'
import getYearLength from './year.ts'

const getYearFraction = (world: World, day: number): number => day / getYearLength(world)

export default getYearFraction
