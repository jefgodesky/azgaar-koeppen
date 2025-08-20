const setElevation = (
  value: number,
  elevation: [number, number]
): [number, number] => {
  const numbersOnly = elevation.filter(n => !isNaN(n))
  return [
    Math.min(...numbersOnly, value),
    Math.max(...numbersOnly, value)
  ]
}

export default setElevation
