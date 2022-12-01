import { assert, expect, test } from 'vitest'
import { solution01, solution02 } from './calorie-counting'
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
  expect(solution01(inputSample)).toBe(24000)
})

test('calorie-counting sol-01', () => {
  expect(solution01(input)).toBe(69795)
})

test('calorie-counting sol-02: sample', () => {
  expect(solution02(inputSample)).toBe(45000)
})

test('calorie-counting sol-02', () => {
  expect(solution02(input)).toBe(208437)
})
