/**
 * BUBBLE SORT
 *
 * Sorts the array in-place
 *
 * Stable.
 *
 * best O(n)
 * avg. O(n^2)
 * worst O(n^2)
 *
 * @param array array of numbers to sort
 */
export function bubbleSort(array: Array<number>): void {
  if (array.length <= 1) {
    return
  }

  for (let pass = 0; pass < array.length; pass++) {
    let swaps = 0

    for (let index = 1; index < array.length - pass; index++) {
      const numA = array[index - 1]
      const numB = array[index]

      if (numA > numB) {
        swap(array, index - 1, index)
        swaps += 1
      }
    }

    if (swaps === 0) {
      break
    }
  }
}

/**
 * INSERTION SORT
 *
 * Sorts the array in-place
 *
 * Stable.
 *
 * best O(n)
 * avg. O(n^2)
 * worst. O(n^2)
 *
 * @param array array of numbers to sort
 */
export function insertionSort(array: Array<number>): void {
  for (let i = 1; i < array.length; i++) {
    for (let j = i; j > 0; j--) {
      const elementA = array[j]
      const elementB = array[j - 1]

      if (elementB > elementA) {
        swap(array, j, j - 1)
      }
    }
  }
}

/**
 * Merge SORT
 *
 * Sorts the array with a divide and conquer strategy (i.e. NOT in-place).
 *
 * Recursive version.
 *
 * Stable.
 *
 * best O(n log n)
 * avg. O(n log n)
 * worst. O(n log n)
 *
 * @param array array of numbers to sort
 */
export function mergeSort(array: Array<number>): Array<number> {
  // Step 00: Base Case
  if (array.length <= 1) {
    return array
  }

  // Step 01: Divide
  const middleIndex = Math.ceil(array.length / 2)
  const arrayOne = array.slice(0, middleIndex)
  const arrayTwo = array.slice(middleIndex, array.length)

  // Step 02: Conquer
  const left = mergeSort(arrayOne)
  const right = mergeSort(arrayTwo)

  // Step 03: Merge
  const merged = new Array<number>()

  let leftIndex = 0
  let rightIndex = 0
  while (leftIndex < left.length && rightIndex < right.length) {
    const leftElement = left[leftIndex]
    const rightElement = right[rightIndex]

    if (leftElement <= rightElement) {
      merged.push(leftElement)
      leftIndex++
    } else {
      merged.push(rightElement)
      rightIndex++
    }
  }

  // flush remaining elements
  merged.push(...left.slice(leftIndex, left.length))
  merged.push(...right.slice(rightIndex, right.length))

  return merged
}

function swap(array: Array<number>, indexA: number, indexB: number) {
  const temp = array[indexA]
  array[indexA] = array[indexB]
  array[indexB] = temp
}
