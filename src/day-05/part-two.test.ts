import { describe, expect, test } from 'vitest'
import { partTwo } from './part-two'

let sampleInputFile = 'sample-input.txt'
let inputFile = 'input.txt'

describe('Day 05 - Part Two', () => {
  test('Sample', async () => {
    let res = await partTwo(sampleInputFile)
    expect(res).toBe('MCD')
  })

  test('Solution', async () => {
    let res = await partTwo(inputFile)
    expect(res).toBe('GSLCMFBRP')
  })
})
