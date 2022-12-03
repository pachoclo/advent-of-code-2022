export function partOne(input: string) {
  const lines = input.split('\n').map((line) => line.trim())

  const allRuckSacks = new Array<RuckSack>()

  for (let line of lines) {
    const middleIndex = Math.ceil(line.length / 2)

    allRuckSacks.push({
      compartment01: line.substring(0, middleIndex),
      compartment02: line.substring(middleIndex).trim(),
    })
  }

  let repeatedItemPrioritiesSum = 0

  for (const ruckSack of allRuckSacks) {
    const repeatedItem = findRepeatedItem(ruckSack)
    const priority = getItemPriority(repeatedItem)
    repeatedItemPrioritiesSum += priority
  }

  return repeatedItemPrioritiesSum
}

type RuckSack = {
  compartment01: string
  compartment02: string
}

function getItemPriority(item: string) {
  if (item.length !== 1) {
    throw new Error('Item must be exactly one char long')
  }

  const asciiValue = item.charCodeAt(0)

  if (asciiValue < 65 || (asciiValue > 90 && asciiValue < 97) || asciiValue > 122) {
    throw new Error('Item must be a lowercase or uppercase letter of the alphabet')
  }

  const isLowerCase = asciiValue >= 97 && asciiValue <= 122

  if (isLowerCase) {
    return asciiValue - 96
  } else {
    return asciiValue - 38
  }
}

function findRepeatedItem(ruckSack: RuckSack) {
  const { compartment01, compartment02 } = ruckSack
  for (let i = 0; i < compartment01.length; i++) {
    let char01 = compartment01[i]

    for (const char02 of compartment02) {
      if (char01 === char02) {
        return char01
      }
    }
  }
  throw new Error('No repeated item found')
}
