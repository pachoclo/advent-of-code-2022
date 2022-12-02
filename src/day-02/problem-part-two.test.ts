import { describe, expect, test } from 'vitest'
import { input } from './input'
import { partTwo } from './problem-part-two'

describe('day 02 - part two', () => {
  test('part two: sample', () => {
    const sampleInput = `A Y
    B X
    C Z`

    expect(partTwo(sampleInput)).toBe(12)
  })

  test('part two', () => {
    expect(partTwo(input)).toBe(13193)
  })
})
