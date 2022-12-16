import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  let input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  let rockPaths = parseInputIntoPaths(input)

  let { minX, maxX, minY, maxY } = findGridEdges(rockPaths)

  // Make a grid using what we know

  let rows = maxY - minY + 1
  let cols = maxX - minX + 1

  let grid: GridCell[][] = []

  for (let r = 0; r < rows; r++) {
    grid.push(new Array<GridCell>())

    for (let c = 0; c < cols; c++) {
      grid[r][c] = {
        coordinates: {
          x: minX + c,
          y: minY + r,
        },
        content: '.',
      }
    }
  }

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

  // Add sand source to grid

  const sandSource = findCell({ x: 500, y: 0 })!
  sandSource.content = '+'

  // logGrid(grid)

  // Simulate sand falling from (500, 0)

  let sandGrains = 0
  let isSandFlowing = false

  while (!isSandFlowing) {
    let cameToRest = false
    sandGrains++
    let sandCoords: Coordinates = {
      x: 500,
      y: 0,
    }

    while (!cameToRest) {
      let down
      let downLeft
      let downRight

      // grab the cells below
      down = findCell({ x: sandCoords.x, y: sandCoords.y + 1 })
      downLeft = findCell({ x: sandCoords.x - 1, y: sandCoords.y + 1 })
      downRight = findCell({ x: sandCoords.x + 1, y: sandCoords.y + 1 })

      if (!down || !downLeft || !downRight) {
        isSandFlowing = true
        break
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
      findCell({ x: sandCoords.x, y: sandCoords.y })!.content = 'o'
      cameToRest = true

      // logGrid(grid)
    }
  }

  return sandGrains - 1
}

function logGrid(grid: GridCell[][]) {
  console.log('\n')
  console.log(
    grid.map((gridRow) => gridRow.map((cell) => cell.content).join('')).join('\n')
  )
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

function findGridEdges(rockPaths: Path[]) {
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
