interface AzgaarMapCoords {
  latT: number
  latN: number
  latS: number
  lonT: number
  lonW: number
  lonE: number
}

export const createAzgaarMapCoords = (overrides?: Partial<AzgaarMapCoords>): AzgaarMapCoords => {
  return {
    latT: 180,
    latN: 90,
    latS: -90,
    lonT: 365,
    lonE: -180,
    lonW: 180,
    ...overrides
  }
}

export default AzgaarMapCoords
