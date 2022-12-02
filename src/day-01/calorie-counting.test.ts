import { expect, test } from 'vitest'
import { partOne, partTwo } from './calorie-counting'
import { alternateSolution01 } from './calorie-counting-alternate'
import { input } from './input'

const inputSample = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`

test('calorie-counting sol-01: sample', () => {
  expect(partOne(inputSample)).toBe(24000)
})

test('calorie-counting sol-01', () => {
  expect(partOne(input)).toBe(69795)
})

test('calorie-counting sol-02: sample', () => {
  expect(partTwo(inputSample)).toBe(45000)
})

test('calorie-counting sol-02', () => {
  expect(partTwo(input)).toBe(208437)
})

// alternate: long-ass way

test('calorie-counting alternate-sol-01: sample', () => {
  expect(alternateSolution01(inputSample)).toBe(24000)
})

test('calorie-counting alternate-sol-01', () => {
  expect(alternateSolution01(input)).toBe(69795)
})
