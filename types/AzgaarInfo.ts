interface AzgaarInfo {
  version: string
  description: string
  exportedAt: string
  mapName: string
  width: number
  height: number
  seed: string
  mapId: number
}

export const createAzgaarInfo = (overrides?: Partial<AzgaarInfo>): AzgaarInfo => {
  return {
    version: '1',
    description: 'Test map info',
    exportedAt: (new Date()).toLocaleTimeString(),
    mapName: 'Test',
    width: 256,
    height: 256,
    seed: '1',
    mapId: 1,
    ...overrides
  }
}

export default AzgaarInfo
