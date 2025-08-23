import type Hex from '../../types/Hex.ts'

const calculateCirculationPressure = (hex: Hex): number => {
  const latitude = Math.abs(hex.center.latitude)

  if (latitude < 5) return -12
  if (latitude < 15) return -12 + (latitude - 5) * 2.4
  if (latitude < 35) return 12
  if (latitude < 45) return 12 - (latitude - 35) * 1.8
  if (latitude < 65) return -6
  if (latitude < 75) return -6 + (latitude - 65) * 1.4
  return 8
}

export default calculateCirculationPressure
