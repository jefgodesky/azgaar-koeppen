import type Hex from '../types/Hex.ts'

const isWater = (hex: Hex): boolean => hex.type[0] > hex.type[1]

export default isWater
