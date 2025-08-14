const extractBiomes = (data: unknown): Record<number, string> => {
  const biomes: Record<number, string> = {}
  if (typeof data !== 'object' || data === null) return {}

  const { biomesData } = data as Record<string, unknown>
  if (typeof biomesData !== 'object' || biomesData === null) return {}

  const { i, name } = biomesData as Record<string, unknown>
  if (!Array.isArray(i) || !Array.isArray(name)) return {}

  for (let j = 0; j < i.length; j++) {
    biomes[i[j]] = name[j] ?? 'N/A'
  }

  return biomes
}

export default extractBiomes
