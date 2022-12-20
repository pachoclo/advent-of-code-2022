import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  let input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  const cubes: Point[] = input.split('\n').map((line) => {
    const [x, y, z] = line.split(',').map((str) => Number.parseInt(str))
    return { x, y, z }
  })

  const cubeSet = new Set<string>()

  for (const cube of cubes) {
    let { x, y, z } = cube
    if (cubeSet.has(`${x},${y},${z}`)) {
      throw new Error('attempting to add a cube coords that already exist')
    }
    cubeSet.add(`${x},${y},${z}`)
  }

  let totalFreeSides = 0

  for (const cube of cubes) {
    totalFreeSides += calculateNumOfFreeSides(cube, cubeSet)
  }

  return totalFreeSides
}

// --------------------------------------------------------------------------- //

type Point = {
  x: number
  y: number
  z: number
}

function calculateNumOfFreeSides(cube: Point, cubeSet: Set<string>) {
  let freeSides = 6

  const { x, y, z } = cube

  // y-adjacent
  const up: Point = { x, y: y + 1, z }
  const down: Point = { x, y: y - 1, z }

  // x-adjacent
  const left: Point = { x: x - 1, y, z }
  const right: Point = { x: x + 1, y, z }

  // z-adjacent
  const front: Point = { x, y, z: z + 1 }
  const back: Point = { x, y, z: z - 1 }

  // check how many of ☝️ these guys exist
  const adjacentCubes = [up, down, left, right, front, back]

  for (const adjacent of adjacentCubes) {
    if (!adjacent) continue
    let adjacentStr = `${adjacent.x},${adjacent.y},${adjacent.z}`
    if (cubeSet.has(adjacentStr)) {
      freeSides--
    }
  }

  return freeSides
}
