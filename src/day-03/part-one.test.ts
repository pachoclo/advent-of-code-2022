import { describe, expect, test } from 'vitest'
import { input } from './input'
import { partOne } from './part-one'

describe('day 03 - part one', () => {
  test('solution01: sample', () => {
    const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
    jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
    PmmdzqPrVvPwwTWBwg
    wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
    ttgJtRGJQctTZtZT
    CrZsJsPPZsGzwwsLwLmpwMDw`

    expect(partOne(sampleInput)).toBe(157)
  })

  test('solution01', () => {
    expect(partOne(input)).toBe(8139)
  })
})
