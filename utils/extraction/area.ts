import type AzgaarSettings from '../../types/AzgaarSettings.ts'
import type AzgaarPackCell from '../../types/AzgaarPackCell.ts'

const extractArea = (cell: AzgaarPackCell, settings: AzgaarSettings): number => {
  const { area } = cell
  const { distanceScale } = settings
  const parsed = parseInt(distanceScale)
  const scale = isNaN(parsed) ? 2 : parsed
  return area * scale ** 2
}

export default extractArea
