import { describe, expect, test } from 'vitest'
import { input } from './input'
import { partTwo } from './part-two'

const sampleInput = ``

describe('day 05 - part two', () => {
  test('part two: sample', () => {
    expect(partTwo(sampleInput)).toBe(0)
  })

  test('part two: solution', () => {
    expect(partTwo(input)).toBe(0)
  })
})
