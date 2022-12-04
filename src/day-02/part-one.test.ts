import { expect, test } from 'vitest'
import { input } from './input'
import { partOne } from './part-one'

const sampleInput = `A Y
B X
C Z`

test('solution01: sample', () => {
  expect(partOne(sampleInput)).toBe(15)
})

test('solution01', () => {
  expect(partOne(input)).toBe(12586)
})
