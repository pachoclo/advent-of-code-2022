import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string, max: number) {
  const input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  let tuples: SensorBeaconTuple[] = parseInputIntoTuples(input)

  for (let row = 0; row <= max; row++) {
    const ranges: [from: number, to: number][] = []

    for (const tuple of tuples) {
      const { sensor, md } = tuple

      const sensorMinY = sensor.y - md
      const sensorMaxY = sensor.y + md

      if (row >= sensorMinY && row <= sensorMaxY) {
        const deltaY = Math.abs(md - Math.abs(sensor.y - row))
        ranges.push([sensor.x - deltaY, sensor.x + deltaY])
      }
    }

    // sort the row's ranges on their 'from' value
    ranges.sort((rA, rB) => rA[0] - rB[0])

    let rA = ranges[0]

    for (let i = 1; i < ranges.length; i++) {
      const rB = ranges[i]

      if (rA[1] >= rB[0] - 1) {
        let minX = Math.min(rA[0], rB[0])
        let maxX = Math.max(rA[1], rB[1])
        rA = [minX, maxX]
        continue
      }

      // no overlap -> found a gap! -> here's the beacon 🚨
      return (rA[1] + 1) * 4_000_000 + row
    }
  }

  return -1
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
