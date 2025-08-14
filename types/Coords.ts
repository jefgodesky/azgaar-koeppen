interface Coords {
  latitude: number
  longitude: number
}

export const createCoords = (overrides?: Partial<Coords>): Coords => {
  return {
    latitude: 0,
    longitude: 0,
    ...overrides
  }
}

export default Coords
