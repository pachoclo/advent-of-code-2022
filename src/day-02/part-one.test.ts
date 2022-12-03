import { expect, test } from 'vitest'
import { input } from './input'
import { partOne } from './part-one'

test('solution01: sample', () => {
  const sampleInput = `A Y
  B X
  C Z`

  expect(partOne(sampleInput)).toBe(15)
})

test('solution01', () => {
  expect(partOne(input)).toBe(12586)
})
