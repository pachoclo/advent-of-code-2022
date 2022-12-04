import { describe, expect, test } from 'vitest'
import { input } from './input'
import { partTwo } from './part-two'

const sampleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

describe('day 03 - part two', () => {
  test('part two: sample', () => {
    expect(partTwo(sampleInput)).toBe(4)
  })

  test('part two', () => {
    expect(partTwo(input)).toBe(845)
  })
})
