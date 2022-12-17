import { readFile } from 'fs/promises'

export async function partOne(inputFile: string, yValue: number) {
  const input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  let tuples: SensorBeaconTuple[] = parseInputIntoTuples(input)

  let minX = Number.MAX_SAFE_INTEGER
  let maxX = Number.MIN_SAFE_INTEGER

  for (const tuple of tuples) {
    if (tuple.sensor.x - tuple.md < minX) {
      minX = tuple.sensor.x - tuple.md
    }

    if (tuple.sensor.x + tuple.md > maxX) {
      maxX = tuple.sensor.x + tuple.md
    }
  }

  const Y = yValue
  let cannotBeCount = 0

  for (let i = minX; i < maxX; i++) {
    for (const { sensor, beacon: _, md } of tuples) {
      if (manhattanDistance(sensor, { x: i, y: Y }) <= md) {
        cannotBeCount++
        break
      }
    }
  }

  return cannotBeCount - 1
}

// --------------------------------------------------------------------------- //
type Point = {
  x: number
  y: number
}

type SensorBeaconTuple = { sensor: Point; beacon: Point; md: number }

function parseInputIntoTuples(input: string): SensorBeaconTuple[] {
  return input.split('\n').map((line) => {
    const { sx, sy, bx, by } = line.match(
      /Sensor at x=(?<sx>[\-0-9]+), y=(?<sy>[\-0-9]+): closest beacon is at x=(?<bx>[\-0-9]+), y=(?<by>[\-0-9]+)/
    )!.groups!

    let sensor = { x: Number.parseInt(sx), y: Number.parseInt(sy) }
    let beacon = { x: Number.parseInt(bx), y: Number.parseInt(by) }
    let md = manhattanDistance(sensor, beacon)

    return { sensor, beacon, md }
  })
}

function manhattanDistance(pointA: Point, pointB: Point) {
  return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y)
}
