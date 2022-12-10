import { describe, test, expect } from 'vitest'
import { partOne } from './part-one'
import { partTwo } from './part-two'

const day = __filename.split('/').at(-2)?.toUpperCase()
const sampleInputFile = 'sample-input.txt'
const sampleInputFile02 = 'sample-input-02.txt'
const inputFile = 'input.txt'

describe(`${day}`, () => {
  test('Part One: sample', async () => {
    let res = await partOne(sampleInputFile)
    expect(res).toStrictEqual(13)
  })

  test('Part One: Solution', async () => {
    let res = await partOne(inputFile)
    expect(res).toStrictEqual(6011)
  })

  test('Part Two: sample one', async () => {
    let res = await partTwo(sampleInputFile)
    expect(res).toStrictEqual(1)
  })

  test('Part Two: sample two', async () => {
    let res = await partTwo(sampleInputFile02)
    expect(res).toStrictEqual(36)
  })

  test('Part Two: Solution', async () => {
    let res = await partTwo(inputFile)
    expect(res).toStrictEqual(null)
  })
})
