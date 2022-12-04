import { describe, expect, test } from 'vitest'
import { input } from './input'
import { partOne } from './part-one'

const sampleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

describe('day 04 - part one', () => {
  test('solution01: sample', () => {
    expect(partOne(sampleInput)).toBe(2)
  })

  test('solution01', () => {
    expect(partOne(input)).toBe(536)
  })
})
