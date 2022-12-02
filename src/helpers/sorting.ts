/**
 * BUBBLE SORT
 *
 * Sorts the array in-place
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

function swap(array: Array<number>, indexA: number, indexB: number) {
  const temp = array[indexA]
  array[indexA] = array[indexB]
  array[indexB] = temp
}
