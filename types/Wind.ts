interface Wind {
  direction: number
  speed: number
}

export const createWind = (overrides?: Partial<Wind>): Wind => {
  return {
    direction: 90,
    speed: 2,
    ...overrides
  }
}

export default Wind
