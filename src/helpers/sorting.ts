/**
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

function swap(array: Array<number>, indexA: number, indexB: number) {
  const temp = array[indexA]
  array[indexA] = array[indexB]
  array[indexB] = temp
}
