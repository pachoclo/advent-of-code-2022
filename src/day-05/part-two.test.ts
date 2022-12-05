import { describe, expect, test } from 'vitest'
import { partTwo } from './part-two'

let sampleInputFile = 'sample-input.txt'
let inputFile = 'input.txt'

describe.skip('day 05 - part two', () => {
  test('part one: sample', async () => {
    let res = await partTwo(sampleInputFile)
    expect(res).toBe('CMZ')
  })

  test('part one: solution', async () => {
    let res = await partTwo(inputFile)
    expect(res).toBe('WSFTMRHPP')
  })
})
