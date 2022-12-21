import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string) {
  const input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  const cubes: Point[] = input.split('\n').map((line) => {
    const [x, y, z] = line.split(',').map((str) => Number.parseInt(str))
    return { x, y, z }
  })

  const cubeSet = new Set<string>()

  for (const cube of cubes) {
    const { x, y, z } = cube
    if (cubeSet.has(`${x},${y},${z}`)) {
      throw new Error('attempting to add a cube coords that already exist')
    }
    cubeSet.add(`${x},${y},${z}`)
  }

  let totalFreeSides = 0

  for (const cube of cubes) {
    totalFreeSides += calculateNumOfFreeSides(cube, cubeSet)
  }

  // calculate bounding box for the entire thing
  console.log(cubes)

  const xSorted = [...cubes.sort((cubeA, cubeB) => cubeA.x - cubeB.x)]
  const ySorted = [...cubes.sort((cubeA, cubeB) => cubeA.y - cubeB.y)]
  const zSorted = [...cubes.sort((cubeA, cubeB) => cubeA.z - cubeB.z)]

  console.log(xSorted)
  console.log(ySorted)
  console.log(zSorted)

  // what can I get out of each of these sorted arrays?
  const minX = xSorted.at(0)
  const maxX = xSorted.at(-1)
  const minY = ySorted.at(0)
  const maxY = ySorted.at(-1)
  const minZ = zSorted.at(0)
  const maxZ = zSorted.at(-1)

  console.log(minX)
  console.log(maxX)
  console.log(minY)
  console.log(maxY)
  console.log(minZ)
  console.log(maxZ)
  // calculate free sides

  // for each free side of a cube, check if it can see the outside (i.e. there is no other cube blocking the outside)

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
