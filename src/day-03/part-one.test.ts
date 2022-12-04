import { describe, expect, test } from 'vitest'
import { input } from './input'
import { partOne } from './part-one'

const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

describe('day 03 - part one', () => {
  test('solution01: sample', () => {
    expect(partOne(sampleInput)).toBe(157)
  })

  test('solution01', () => {
    expect(partOne(input)).toBe(8139)
  })
})
