import { describe, test, expect } from 'vitest'
import { partOne } from './part-one'
import { partTwo } from './part-two'

const day = __filename.split('/').at(-2)?.toUpperCase()
const sampleInputFile = 'sample-input.txt'
const inputFile = 'input.txt'

describe(`${day}`, () => {
  test('Part One: sample', async () => {
    let res = await partOne(sampleInputFile)
    expect(res).toStrictEqual(13140)
  })

  test('Part One: Solution', async () => {
    let res = await partOne(inputFile)
    expect(res).toStrictEqual(13740)
  })

  test('Part Two: sample', async () => {
    let actualRes = `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`
    let res = await partTwo(sampleInputFile)
    let lines = actualRes.split('\n')
    for (let line = 0; line < lines.length; line++) {
      expect(res[line].join('')).toStrictEqual(lines[line])
    }
  })

  test('Part Two: Solution', async () => {
    let actualRes = `####.#..#.###..###..####.####..##..#....
...#.#..#.#..#.#..#.#....#....#..#.#....
..#..#..#.#..#.#..#.###..###..#....#....
.#...#..#.###..###..#....#....#....#....
#....#..#.#....#.#..#....#....#..#.#....
####..##..#....#..#.#....####..##..####.`
    let res = await partTwo(inputFile)
    let lines = actualRes.split('\n')
    for (let line = 0; line < lines.length; line++) {
      expect(res[line].join('')).toStrictEqual(lines[line])
    }
  })
})
