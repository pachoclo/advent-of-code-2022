import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  const input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')
  const grid = input.split('\n').map((row) => row.match(/\d{1}/g)!.map(Number))

  type GridCoordinate = string
  const visibleTrees = new Set<GridCoordinate>()

  const rowWidth = grid[0]!.length

  // do 4 sweeps of the entire grid

  const tallestFromTheNorth = Array(rowWidth).fill(-1)

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let colIndex = 0; colIndex < rowWidth; colIndex++) {
      const tree = grid[rowIndex]![colIndex]

      if (tree > tallestFromTheNorth[colIndex]) {
        tallestFromTheNorth[colIndex] = tree
        visibleTrees.add(`${rowIndex},${colIndex}`)
      }
    }
  }

  const tallestFromTheSouth = Array(rowWidth).fill(-1)

  for (let rowIndex = grid.length - 1; rowIndex > -1; rowIndex--) {
    for (let colIndex = 0; colIndex < rowWidth; colIndex++) {
      const tree = grid[rowIndex]![colIndex]

      if (tree > tallestFromTheSouth[colIndex]) {
        tallestFromTheSouth[colIndex] = tree
        visibleTrees.add(`${rowIndex},${colIndex}`)
      }
    }
  }

  const tallestFromTheWest = Array(rowWidth).fill(-1)

  for (let colIndex = 0; colIndex < rowWidth; colIndex++) {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      const tree = grid[rowIndex]![colIndex]

      if (tree > tallestFromTheWest[rowIndex]) {
        tallestFromTheWest[rowIndex] = tree
        visibleTrees.add(`${rowIndex},${colIndex}`)
      }
    }
  }

  const tallestFromTheEast = Array(rowWidth).fill(-1)

  for (let colIndex = rowWidth - 1; colIndex > -1; colIndex--) {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      const tree = grid[rowIndex]![colIndex]

      if (tree > tallestFromTheEast[rowIndex]) {
        tallestFromTheEast[rowIndex] = tree
        visibleTrees.add(`${rowIndex},${colIndex}`)
      }
    }
  }

  return visibleTrees.size
}
