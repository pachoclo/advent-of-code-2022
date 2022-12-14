import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  let input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')
  let pairs = parseInput(input)

  let indices: number[] = []

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i]

    console.log(`\ncompairing pair no. ${i + 1}`)

    if (comparePair(pair)) {
      indices.push(i + 1)
    }
  }

  console.log(indices)

  return indices.reduce((res, index) => res + index, 0)
}

// -------------------------------------------------- //

type Item = Array<Item> | number
type Pair = [left: Item, right: Item]

function parseInput(input: string) {
  // split into pairs of lines
  const pairs = input.split('\n\n').map((pairLines) => {
    const [left, right] = pairLines.split('\n')
    return [left, right]
  })

  let listPairs: Pair[] = pairs.map((pair) => {
    let [left, right] = pair
    return [parseListLine(left)!, parseListLine(right)!]
  })

  return listPairs
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
      // it's an actual number
      currentNumberAsStr += char
      continue
    }
  }
}

function comparePair([left, right]: Pair): boolean | 'no-decision' {
  // console.log(JSON.stringify(left))
  // console.log(JSON.stringify(right), '\n')

  if (typeof left === 'number' && typeof right === 'number') {
    console.log(`  comparing numbers: ${left} and ${right}`)

    if (left < right) {
      console.log('👍 right order')
      return true
    }

    if (left > right) {
      console.log('🚫 wrong order')
      return false
    }

    return 'no-decision'
  }

  if (left instanceof Array && right instanceof Array) {
    for (let i = 0; i < left.length; i++) {
      if (i >= right.length) {
        // right ran out of items first
        console.log('🚫 wrong order')
        return false
      }

      let res = comparePair([left[i], right[i]])

      if (res !== 'no-decision') {
        // decision was made, return the result
        return res
      }
    }

    if (right.length > left.length) {
      // left ran out of items
      console.log('👍 right order')
      return true
    }
  }

  if (typeof left === 'number' && right instanceof Array) {
    return comparePair([[left], right])
  }

  if (left instanceof Array && typeof right === 'number') {
    return comparePair([left, [right]])
  }

  return 'no-decision'
}
