import { describe, test, expect } from 'vitest'
import { bubbleSort, insertionSort } from './sorting'

describe('bubble sort', () => {
  test('simple case', () => {
    const testArray = [2, 9, 4, 6, 2, 6, 7, 2, 6]
    bubbleSort(testArray)
    expect(testArray).toStrictEqual([2, 2, 2, 4, 6, 6, 6, 7, 9])
  })

  test('already sorted array', () => {
    const testArray = [2, 2, 2, 4, 6, 6, 6, 7, 9]
    bubbleSort(testArray)
    expect(testArray).toStrictEqual([2, 2, 2, 4, 6, 6, 6, 7, 9])
  })

  test('empty array', () => {
    const testArray: any[] = []
    bubbleSort(testArray)
    expect(testArray).toStrictEqual([])
  })

  test('one element array', () => {
    const testArray = [3]
    bubbleSort(testArray)
    expect(testArray).toStrictEqual([3])
  })

  test('two element array', () => {
    const testArray = [3, 1]
    bubbleSort(testArray)
    expect(testArray).toStrictEqual([1, 3])
  })
})

describe('insertion sort', () => {
  test('simple case', () => {
    const testArray = [2, 9, 4, 6, 2, 6, 7, 2, 6]
    insertionSort(testArray)
    expect(testArray).toStrictEqual([2, 2, 2, 4, 6, 6, 6, 7, 9])
  })

  test('already sorted array', () => {
    const testArray = [2, 2, 2, 4, 6, 6, 6, 7, 9]
    insertionSort(testArray)
    expect(testArray).toStrictEqual([2, 2, 2, 4, 6, 6, 6, 7, 9])
  })

  test('empty array', () => {
    const testArray: any[] = []
    insertionSort(testArray)
    expect(testArray).toStrictEqual([])
  })

  test('one element array', () => {
    const testArray = [3]
    insertionSort(testArray)
    expect(testArray).toStrictEqual([3])
  })

  test('two element array', () => {
    const testArray = [3, 1]
    insertionSort(testArray)
    expect(testArray).toStrictEqual([1, 3])
  })
})
