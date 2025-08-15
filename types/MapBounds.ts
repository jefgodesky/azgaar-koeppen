interface MapBounds {
  latitude: {
    total: number
    north: number
    south: number
  }
  longitude: {
    total: number
    east: number
    west: number
  }
}

export const createMapBounds = (overrides?: Partial<MapBounds>): MapBounds => {
  return {
    latitude: {
      total: overrides?.latitude?.total ?? 180,
      north: overrides?.latitude?.north ?? 90,
      south: overrides?.latitude?.south ?? -90
    },
    longitude: {
      total: overrides?.longitude?.total ?? 360,
      east: overrides?.longitude?.east ?? 180,
      west: overrides?.longitude?.west ?? -180
    },
    ...overrides
  }
}

export default MapBounds