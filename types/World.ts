interface World {
  radius: number // Radius of the planet in kilometers (km)
  tilt: number // World's axial tilt in degrees.
  solar: number // Solar constant in Watts per square kilometer (W/m²)
  months: Record<string, number> // Codes for months, with number of days in each
  equinox: number // The day of the year on which your first (vernal) equinox occurs
  secondsPerDay: number // Number of seconds in a day on this world
  land: {
    albedo: number // What fraction of solar radiation is reflected by land?
    heatCapacity: number // Average land heat capacity in joule per kelvin (J/K)
  }
  water: {
    albedo: number // What fraction of solar radiation is reflected by water?
    heatCapacity: number // Water's heat capacity in joule per kelvin (J/K)
  }
  temperatureDiffusion: number // A fraction reflecting how much temperature diffuses between cells
  atmosphere: {
    transmissivity: number // The fraction of solar energy that makes it through.
    damping: number // Estimate of longwave linear damping
    intercept: number // How much longwave radiation remains in atmosphere
  }
}

export const createWorld = (overrides?: Partial<World>): World => {
  return {
    radius: 6371,
    tilt: 23.44,
    solar: 1361,
    months: {
      Jan: 31,
      Feb: 28,
      Mar: 31,
      Apr: 30,
      May: 31,
      Jun: 30,
      Jul: 31,
      Aug: 31,
      Sep: 30,
      Oct: 31,
      Nov: 30,
      Dec: 31
    },
    equinox: 79, // March 20
    secondsPerDay: 24 * 60 * 60,
    land: {
      albedo: 0.3,
      heatCapacity: 1e7
    },
    water: {
      albedo: 0.06,
      heatCapacity: 8e7
    },
    temperatureDiffusion: 0.1,
    atmosphere: {
      transmissivity: 0.5,
      damping: 5.6,
      intercept: 0
    },
    ...overrides
  }
}

export default World
