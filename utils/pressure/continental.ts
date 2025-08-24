import type Hex from '../../types/Hex.ts'
import type World from '../../types/World.ts'
import calculateSeasonalFactor from './season.ts'

const calculateContinentalPressure = (
  world: World,
  hex: Hex,
  month: string | number
): number => {
  const { continentality } = hex.climate
  if (continentality < 1) return 0
  const latitude = Math.abs(hex.center.latitude)
  const intensity = Math.min(continentality / 15, 0.8) * Math.max(0, (latitude - 25) / 65)
  const seasonal = calculateSeasonalFactor(world, hex, month)
  return intensity * seasonal * 20
}

export default calculateContinentalPressure
