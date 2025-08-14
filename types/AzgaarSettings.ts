interface AzgaarSettings {
  distanceUnit: string
  distanceScale: string
  areaUnit: string
  heightUnit: string
  heightExponent: string
  temperatureScale: string
  populationRate: string
  urbanization: string
  mapSize: string
  latitude: string
  longitude: string
  prec: string
  options: {
    pinNotes: boolean
    winds: number[]
    temperatureEquator: number
    temperatureNorthPole: number
    temperatureSouthPole: number
    stateLabelsMode: string
    showBurgPreview: boolean
    villageMaxPopulation: number
    year: number
    era: string
    eraShort: string
    military: Array<{
      icon: string
      name: string
      rural: number
      urban: number
      crew: number
      power: number
      type: string
      separate: number
    }>
  }
  mapName: string
  hideLabels: boolean
  stylePreset: string
  rescaleLabels: boolean
  urbanDensity: number
}

export const createAzgaarSettings = (overrides?: Partial<AzgaarSettings>): AzgaarSettings => {
  return {
    distanceUnit: 'km',
    distanceScale: '20',
    areaUnit: 'square',
    heightUnit: 'm',
    heightExponent: '2',
    temperatureScale: '° C',
    populationRate: '1000',
    urbanization: '1',
    mapSize: '256',
    latitude: '50',
    longitude: '50',
    prec: '100',
    options: {
      pinNotes: false,
      winds: [225, 45, 225, 315, 135, 315],
      temperatureEquator: 30,
      temperatureNorthPole: -40,
      temperatureSouthPole: -40,
      stateLabelsMode: 'auto',
      showBurgPreview: true,
      villageMaxPopulation: 2000,
      year: 1000,
      era: 'Common',
      eraShort: 'CE',
      military: []
    },
    mapName: 'Test',
    hideLabels: true,
    stylePreset: 'atlas',
    rescaleLabels: true,
    urbanDensity: 10,
    ...overrides
  }
}

export default AzgaarSettings
