import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string) {
  const input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')
  const grid: Array<Array<Tree>> = input.split('\n').map((row) =>
    row.match(/\d{1}/g)!.map((height) => ({
      height: Number.parseInt(height),
      position: {
        row: 0,
        col: 0,
      },
      viewingDistance: {
        north: 0,
        south: 0,
        east: 0,
        west: 0,
      },
      score: 0,
    }))
  )

  let highestScore = 0

  for (let rowIndex = 0; rowIndex < grid[0].length; rowIndex++) {
    for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
      const tree = grid[rowIndex][colIndex]

      tree.position = {
        row: rowIndex,
        col: colIndex,
      }

      // north viewing distance
      let targetRow = rowIndex - 1
      while (targetRow >= 0) {
        tree.viewingDistance.north++
        if (grid[targetRow][colIndex].height >= tree.height) {
          break
        }
        targetRow--
      }

      // south viewing distance
      targetRow = rowIndex + 1
      while (targetRow < grid.length) {
        tree.viewingDistance.south++
        if (grid[targetRow][colIndex].height >= tree.height) {
          break
        }
        targetRow++
      }

      // east viewing distance
      let targetCol = colIndex + 1
      while (targetCol < grid[0].length) {
        tree.viewingDistance.east++
        if (grid[rowIndex][targetCol].height >= tree.height) {
          break
        }
        targetCol++
      }

      // west viewing distance
      targetCol = colIndex - 1
      while (targetCol >= 0) {
        tree.viewingDistance.west++
        if (grid[rowIndex][targetCol].height >= tree.height) {
          break
        }
        targetCol--
      }

      let { north, south, east, west } = tree.viewingDistance
      tree.score = north * south * east * west

      if (tree.score > highestScore) {
        highestScore = tree.score
      }
    }
  }

  return highestScore
}

// ----------------------------------------------------------------------------- //

type Tree = {
  height: number
  position: {
    row: number
    col: number
  }
  viewingDistance: {
    north: number
    south: number
    east: number
    west: number
  }
  score: number
}
