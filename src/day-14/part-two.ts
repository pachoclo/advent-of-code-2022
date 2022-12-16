import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string) {
  let input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  let rockPaths = parseInputIntoPaths(input)

  let { maxY } = findGridBoundaries(rockPaths)

  let floorRowIdx = maxY + 2
  let floorWidth = (floorRowIdx + 1) * 2
  let minX = 500 - floorRowIdx - 1

  // Make a grid using what we know

  let rows = floorRowIdx + 1
  let cols = floorWidth

  let grid: GridCell[][] = []

  for (let r = 0; r < rows; r++) {
    grid.push(new Array<GridCell>())

    for (let c = 0; c < cols; c++) {
      grid[r][c] = {
        coordinates: {
          x: minX + c,
          y: r,
        },
        content: '.',
      }
    }
  }

  // utility func to find a cell, duh

  const findCell = ({ x, y }: Coordinates) => {
    try {
      return grid[y][x - minX]
    } catch (err) {
      return undefined
    }
  }

  // Add rock paths to grid

  for (const path of rockPaths) {
    for (const { x, y } of path) {
      findCell({ x, y })!.content = '#'
    }
  }

  // Add floor to grid
  let floorRow = grid[floorRowIdx]
  floorRow.forEach((cell) => (cell.content = '#'))

  // Add sand source to grid

  const sandSourceCell = findCell({ x: 500, y: 0 })!
  sandSourceCell.content = '+'

  // Simulate sand falling from (500, 0)

  let sandGrains = 0
  let isSandFlowing = true

  while (isSandFlowing) {
    let cameToRest = false
    sandGrains++
    let sandCoords: Coordinates = {
      x: 500,
      y: 0,
    }

    while (!cameToRest) {
      // grab the cells below current sand grain
      let down = findCell({ x: sandCoords.x, y: sandCoords.y + 1 })
      let downLeft = findCell({ x: sandCoords.x - 1, y: sandCoords.y + 1 })
      let downRight = findCell({ x: sandCoords.x + 1, y: sandCoords.y + 1 })

      if (!down || !downLeft || !downRight) {
        throw new Error('this should not have happened')
      }

      // check down
      if (down?.content === '.') {
        sandCoords.y++
        continue
      }

      // check down-left
      if (downLeft?.content === '.') {
        sandCoords.y++
        sandCoords.x--
        continue
      }

      // check down-right
      if (downRight?.content === '.') {
        sandCoords.y++
        sandCoords.x++
        continue
      }

      // sand can't move -> come to rest
      let currentCell = findCell({ x: sandCoords.x, y: sandCoords.y })
      currentCell!.content = 'o'
      cameToRest = true

      if (currentCell === sandSourceCell) {
        isSandFlowing = false
      }
    }
  }

  // logGrid(grid)

  return sandGrains
}

function logGrid(grid: GridCell[][]) {
  console.log('\n')
  for (const row of grid) {
    console.log(row.map((cell) => cell.content).join(''))
  }
}

function parseInputIntoPaths(input: string): Path[] {
  return input
    .split('\n')
    .map((line) =>
      line
        .split(' -> ')
        .map((coordinateStr) => coordinateStr.split(','))
        .map(([x, y]) => ({ x: Number.parseInt(x), y: Number.parseInt(y) }))
        .reverse()
    )
    .map(fillInMissingCoordinates)
}

function fillInMissingCoordinates(rockPathCoordinateStack: Path) {
  let expandedCoordinates = []

  let nodeA = rockPathCoordinateStack.pop()!
  expandedCoordinates.push(nodeA)

  while (rockPathCoordinateStack.length > 0) {
    let nodeB = rockPathCoordinateStack.pop()!

    // vertical gap
    {
      let verticalDiff = nodeB.y - nodeA.y

      if (verticalDiff > 1) {
        for (let i = 1; i < verticalDiff; i++) {
          expandedCoordinates.push({
            x: nodeA.x,
            y: nodeA.y + i,
          })
        }
      }

      if (verticalDiff < 1) {
        for (let i = 1; i < Math.abs(verticalDiff); i++) {
          expandedCoordinates.push({
            x: nodeA.x,
            y: nodeA.y - i,
          })
        }
      }
    }

    // horizontal gap
    {
      let horizontalDiff = nodeB.x - nodeA.x

      if (horizontalDiff > 1) {
        for (let i = 1; i < horizontalDiff; i++) {
          expandedCoordinates.push({
            x: nodeA.x + i,
            y: nodeA.y,
          })
        }
      }

      if (horizontalDiff < 1) {
        for (let i = 1; i < Math.abs(horizontalDiff); i++) {
          expandedCoordinates.push({
            x: nodeA.x - i,
            y: nodeA.y,
          })
        }
      }
    }

    expandedCoordinates.push(nodeB)
    nodeA = nodeB
  }

  return expandedCoordinates
}

function findGridBoundaries(rockPaths: Path[]) {
  let minY = 0
  let maxY = 0
  let minX = 500
  let maxX = 500

  rockPaths.forEach((path) =>
    path.forEach(({ x, y }) => {
      if (x > maxX) maxX = x
      if (x < minX) minX = x

      if (y > maxY) maxY = y
      if (y < minY) minY = y
    })
  )

  return { minX, maxX, minY, maxY }
}

// ::::::::::::::::: - ::::::::::::::::: - ::::::::::::::::: - ::::::::::::::::: //

type Coordinates = { x: number; y: number }

type Path = Coordinates[]

type GridCell = {
  coordinates: Coordinates
  content: '#' | 'o' | '.' | '+'
}
