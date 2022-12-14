import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string) {
  let input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  let packets = parseInput(input).flat(1)

  let dividerTwo: Packet = [[2]]
  let dividerSix: Packet = [[6]]

  packets.push(dividerTwo)
  packets.push(dividerSix)

  packets.sort((packetA, packetB) => comparePair([packetA, packetB])).reverse()

  return (
    (packets.findIndex((packet) => packet === dividerTwo) + 1) *
    (packets.findIndex((packet) => packet === dividerSix) + 1)
  )
}

// ---------------------------------------------------------------- //

type Packet = Array<Packet> | number

type PacketPair = [left: Packet, right: Packet]

function parseInput(input: string) {
  const pairs: PacketPair[] = input.split('\n\n').map((pairLines) => {
    const [left, right] = pairLines.split('\n')
    return [parseListLine(left)!, parseListLine(right)!]
  })

  return pairs
}

function parseListLine(listLine: string) {
  let listStack = new Array<Array<Packet>>()

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
        currentList.push(Number.parseInt(currentNumberAsStr))
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
function comparePair([left, right]: PacketPair): -1 | 1 | 0 {
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
    for (let i = 0; i < left.length && right.length; i++) {
      let res = comparePair([left[i], right[i]])

      if (res !== 0) {
        // decision was made, return the result
        return res
      }
    }

    // a list ran out of items and no decision was made
    // attempt tp make a decision using the lists' length
    let result: 1 | -1 | 0 =
      right.length > left.length ? 1 : left.length > right.length ? -1 : 0

    return result
  }

  if (typeof left === 'number' && right instanceof Array) {
    return comparePair([[left], right])
  }

  if (left instanceof Array && typeof right === 'number') {
    return comparePair([left, [right]])
  }

  return 0
}
