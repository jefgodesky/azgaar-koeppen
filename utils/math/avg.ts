import getSum from './sum.ts'

const getAverage = (...numbers: number[]): number => {
  return getSum(...numbers) / numbers.length;
}

export default getAverage
