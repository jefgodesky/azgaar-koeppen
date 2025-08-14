const getSum = (...numbers: number[]): number => {
  return numbers.reduce((acc, sum) => sum + acc, 0)
}

export default getSum
