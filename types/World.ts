interface World {
  radius: number // Radius of the planet in kilometers (km)
  tilt: number // World's axial tilt in degrees.
  solar: number // Solar constant in Watts per square kilometer (W/m²)
  months: Record<string, number> // Codes for months, with number of days in each
  equinox: number // The day of the year on which your first (vernal) equinox occurs
  secondsPerDay: number // Number of seconds in a day
  temperature: {
    insolation: [number, number] // Lowest, highest expected insolation in Watts per square kilometer (W/m²)
    celsius: [number, number] // Expected temps at those insolation levels in degrees Celsius (°C)
    extremes?: [number, number] // Lowest and highest temps allowed in degrees Celsius (°C)
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
    temperature: {
      insolation: [0, 420],
      celsius: [-50, 28],
      extremes: [-60, 50]
    },
    ...overrides
  }
}

export default World
