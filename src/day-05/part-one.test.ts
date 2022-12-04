import { describe, expect, test } from 'vitest'
import { input } from './input'
import { partOne } from './part-one'

const sampleInput = ``

describe('day 05 - part one', () => {
  test('part one: sample', () => {
    expect(partOne(sampleInput)).toBe(0)
  })

  test('part one: solution', () => {
    expect(partOne(input)).toBe(0)
  })
})
