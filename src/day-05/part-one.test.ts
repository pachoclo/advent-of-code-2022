import { describe, expect, test } from 'vitest'
import { partOne } from './part-one'

let sampleInputFile = 'sample-input.txt'
let inputFile = 'input.txt'

describe('day 05 - part one', () => {
  test('part one: sample', async () => {
    let res = await partOne(sampleInputFile)
    expect(res).toBe('CMZ')
  })

  test('part one: solution', async () => {
    let res = await partOne(inputFile)
    expect(res).toBe('WSFTMRHPP')
  })
})
