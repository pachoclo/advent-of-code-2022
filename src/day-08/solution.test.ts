import { describe, test, expect } from 'vitest'
import { partOne } from './part-one'
import { partTwo } from './part-two'

const day = __filename.split('/').at(-2)?.toUpperCase()
const sampleInputFile = 'sample-input.txt'
const inputFile = 'input.txt'

describe(`${day}`, () => {
  test('Part One: sample', async () => {
    let res = await partOne(sampleInputFile)
    expect(res).toStrictEqual(21)
  })

  test.only('Part One: Solution', async () => {
    let res = await partOne(inputFile)
    expect(res).toStrictEqual(1698)
  })

  test.skip('Part Two: sample', async () => {
    let res = await partTwo(sampleInputFile)
    expect(res).toStrictEqual(null)
  })

  test.skip('Part Two: Solution', async () => {
    let res = await partTwo(inputFile)
    expect(res).toStrictEqual(null)
  })
})
