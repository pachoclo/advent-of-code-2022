import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  let input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  let pairs = parseInput(input)

  let correctOrderPairIndices: number[] = []

  for (let i = 0; i < pairs.length; i++) {
    if (comparePair(pairs[i]) === 1) {
      correctOrderPairIndices.push(i + 1)
    }
  }

  return correctOrderPairIndices.reduce((res, index) => res + index, 0)
}

// -------------------------------------------------- //

type Item = Array<Item> | number
type Pair = [left: Item, right: Item]

function parseInput(input: string) {
  const pairs: Pair[] = input.split('\n\n').map((pairLines) => {
    const [left, right] = pairLines.split('\n')
    return [parseListLine(left)!, parseListLine(right)!]
  })

  return pairs
}

function parseListLine(listLine: string) {
  let listStack = new Array<Array<Item>>()

  let currentNumberAsStr = ''

  for (let char of listLine) {
    if (char === '[') {
      let newList: any[] = []
      listStack.push(newList)
      continue
    }

    if (char === ']') {
      if (currentNumberAsStr !== '') {
        let currentList = listStack[listStack.length - 1]
        if (!currentList) {
          throw new Error('wtf')
        }
        if (currentList instanceof Array) {
          currentList.push(Number.parseInt(currentNumberAsStr))
        }
        currentNumberAsStr = ''
      }

      let completedList = listStack.pop()!

      if (listStack.length === 0) {
        return completedList
      }

      let currentList = listStack.at(-1)!
      currentList.push(completedList)
      continue
    }

    if (char === ',' && currentNumberAsStr !== '') {
      let currentList = listStack.at(-1)
      currentList!.push(Number.parseInt(currentNumberAsStr))
      currentNumberAsStr = ''
      continue
    }

    let number = Number.parseInt(char)

    if (!isNaN(number)) {
      // it's an actual number, wait for a comma to parse the full number
      currentNumberAsStr += char
      continue
    }
  }
}

/**
 * @returns
 * 1: pair is in the right order
 * 0: no decision could be made
 * -1: pair is in the wrong order
 */
function comparePair([left, right]: Pair): -1 | 1 | 0 {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) {
      return 1
    }

    if (left > right) {
      return -1
    }

    return 0
  }

  if (left instanceof Array && right instanceof Array) {
    for (let i = 0; i < left.length; i++) {
      if (i >= right.length) {
        // right ran out of items first
        return -1
      }

      let res = comparePair([left[i], right[i]])

      if (res !== 0) {
        // decision was made, return the result
        return res
      }
    }

    if (right.length > left.length) {
      // left ran out of items
      return 1
    }
  }

  if (typeof left === 'number' && right instanceof Array) {
    return comparePair([[left], right])
  }

  if (left instanceof Array && typeof right === 'number') {
    return comparePair([left, [right]])
  }

  return 0
}
