import { describe, expect, test } from 'vitest'
import { input } from './input'
import { partTwo } from './part-two'

describe('day 03 - part two', () => {
  test('part two: sample', () => {
    const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
    jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
    PmmdzqPrVvPwwTWBwg
    wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
    ttgJtRGJQctTZtZT
    CrZsJsPPZsGzwwsLwLmpwMDw`

    expect(partTwo(sampleInput)).toBe(70)
  })

  test('part two', () => {
    expect(partTwo(input)).toBe(2668)
  })
})
