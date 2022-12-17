import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  let input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  let pairs: SensorBeaconPair[] = parseInputIntoPairs(input)

  console.log(pairs)

  // calculate manhattan distance for each one of the pairs

  // calculate minX and maxX

  // for i in range(minX, maxX):
}

// --------------------------------------------------------------------------- //
type Point = {
  x: number
  y: number
}

type SensorBeaconPair = [sensor: Point, beacon: Point]

function parseInputIntoPairs(input: string): SensorBeaconPair[] {
  return input.split('\n').map((line) => {
    let { sx, sy, bx, by } = line.match(
      /Sensor at x=(?<sx>[\-0-9]+), y=(?<sy>[\-0-9]+): closest beacon is at x=(?<bx>[\-0-9]+), y=(?<by>[\-0-9]+)/
    )!.groups!

    return [
      { x: Number.parseInt(sx), y: Number.parseInt(sy) },
      { x: Number.parseInt(bx), y: Number.parseInt(by) },
    ]
  })
}

function manhattanDistance(pointA: Point, pointB: Point) {
  return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y)
}
