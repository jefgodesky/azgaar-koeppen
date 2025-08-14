import type AzgaarSettings from '../../types/AzgaarSettings.ts'

const extractHeightExp = (settings: AzgaarSettings): number => {
  return parseInt(settings.heightExponent)
}

export default extractHeightExp
