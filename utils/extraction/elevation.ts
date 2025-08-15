import type AzgaarPackCell from '../../types/AzgaarPackCell.ts'
import type AzgaarGridCell from '../../types/AzgaarGridCell.ts'

const extractElevation = (
  p: AzgaarPackCell,
  g: AzgaarGridCell,
  heightExponent: number = 2
) => {
  const h = p.h >= 20 ? p.h : g.h
  if (h >= 20) return Math.pow(h - 18, +heightExponent)
  return ((h - 20) / h) * 50
}

export default extractElevation
