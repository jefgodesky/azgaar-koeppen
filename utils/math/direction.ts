const calculateDirection = (direction: string): number => {
  const directions = ['n', 'nne', 'ne', 'ene', 'e', 'ese', 'se', 'sse', 's', 'ssw', 'sw', 'wsw', 'w', 'wnw', 'nw', 'nnw']
  return 22.5 * Math.max(directions.indexOf(direction), 0)
}

export default calculateDirection
