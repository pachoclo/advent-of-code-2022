import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string) {
  const input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  const solidCubes: Point[] = input.split('\n').map((line) => {
    const [x, y, z] = line.split(',').map((str) => Number.parseInt(str))
    return { x, y, z }
  })

  // store coordinates (string form for easier look-up) in a Set
  const solidCubesSet = new Set<string>(
    solidCubes.map(({ x, y, z }) => `${x},${y},${z}`)
  )

  // calculate bounds for the entire thing
  const { minX, maxX, minY, maxY, minZ, maxZ } = calculateBounds(solidCubes)

  let surfaceFaces = 0

  // for each solid cube, check if the adjacent cubes are empty (air)
  for (const solidCube of solidCubes) {
    const airBlocks = getAdjacentAirBlocks(solidCube, solidCubesSet)

    for (const airBlock of airBlocks) {
      // one of the cube's faces is next to an air block
      // we need to find out if that air block can reach the outside

      const q = []
      q.push(airBlock)

      const visited = new Set<string>()

      let canGetOut = false

      while (q.length > 0) {
        const { x, y, z }: Point = q.shift() as Point

        if (visited.has(`${x},${y},${z}`)) {
          continue
        }

        // test if this block of air is at the boundary
        if (
          x >= maxX ||
          x <= minX ||
          y >= maxY ||
          y <= minY ||
          z >= maxZ ||
          z <= minZ
        ) {
          // YES => we found a surface face
          canGetOut = true
          break
        }

        visited.add(`${x},${y},${z}`)

        // not at the boundary -> test if this air block has a path out
        // through its neighbor air blocks
        q.push(...getAdjacentAirBlocks({ x, y, z }, solidCubesSet))
      }

      if (canGetOut) {
        surfaceFaces++
      }
    }
  }

  return surfaceFaces
}

// --------------------------------------------------------------------------- //

type Point = {
  x: number
  y: number
  z: number
}

function getAdjacentAirBlocks(cube: Point, cubeSet: Set<string>) {
  let freeSides: Point[] = []

  const adjacent: Point[] = [
    { x: cube.x - 1, y: cube.y, z: cube.z },
    { x: cube.x + 1, y: cube.y, z: cube.z },
    { x: cube.x, y: cube.y - 1, z: cube.z },
    { x: cube.x, y: cube.y + 1, z: cube.z },
    { x: cube.x, y: cube.y, z: cube.z - 1 },
    { x: cube.x, y: cube.y, z: cube.z + 1 },
  ]

  for (const { x, y, z } of adjacent) {
    if (!cubeSet.has(`${x},${y},${z}`)) {
      freeSides.push({ x, y, z })
    }
  }

  return freeSides
}

export function calculateBounds(cubes: Point[]) {
  const xSorted = [...cubes.sort((cubeA, cubeB) => cubeA.x - cubeB.x)]
  const ySorted = [...cubes.sort((cubeA, cubeB) => cubeA.y - cubeB.y)]
  const zSorted = [...cubes.sort((cubeA, cubeB) => cubeA.z - cubeB.z)]

  const minX = xSorted.at(0)!.x
  const maxX = xSorted.at(-1)!.x

  const minY = ySorted.at(0)!.y
  const maxY = ySorted.at(-1)!.y

  const minZ = zSorted.at(0)!.z
  const maxZ = zSorted.at(-1)!.z

  return { minX, maxX, minY, maxY, minZ, maxZ }
}
