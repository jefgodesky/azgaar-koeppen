const angleDifference = (a: number, b: number): number => Math.abs(((a - b + 540) % 360) - 180)
export default angleDifference
