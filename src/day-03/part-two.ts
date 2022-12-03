// https://adventofcode.com/2022/day/3#part2

const GROUP_SIZE = 3

export function partTwo(input: string) {
  let lines = input.split('\n').map((line) => line.trim().split(''))
  let numGroups = lines.length / GROUP_SIZE
  let groups = new Array<ElfGroup>()

  for (let i = 0; i < numGroups; i++) {
    let [elf01Items, elf02Items, elf03Items] = lines.slice(
      i * GROUP_SIZE,
      i * GROUP_SIZE + GROUP_SIZE
    )
    let group = {
      elf01: { items: elf01Items },
      elf02: { items: elf02Items },
      elf03: { items: elf03Items },
      badge: '',
    }
    findGroupBadge(group)
    groups.push(group)
  }

  let priorityTotal = 0
  for (const group of groups) {
    priorityTotal += getItemPriority(group.badge)
  }

  return priorityTotal
}

type ElfGroup = {
  elf01: Elf
  elf02: Elf
  elf03: Elf
  badge: string
}

type Elf = {
  items: string[]
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

function findGroupBadge(group: ElfGroup) {
  let { elf01, elf02, elf03 } = group

  let [smallestItemBag, bag02, bag03] = [elf01.items, elf02.items, elf03.items].sort(
    (a, b) => a.length - b.length
  )

  for (let i = 0; i < smallestItemBag.length; i++) {
    let item = smallestItemBag[i]
    if (bag02.includes(item) && bag03.includes(item)) {
      group.badge = item
      return
    }
  }
}
