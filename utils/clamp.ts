const clamp = (x: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, x))
}

export default clamp
