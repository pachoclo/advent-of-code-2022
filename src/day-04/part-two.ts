// https://adventofcode.com/2022/day/4#part2

export function partTwo(input: string) {
  let lines = input.split('\n').map((line) => line.trim())
  let pairs = new Array<Pair>()

  for (const line of lines) {
    pairs.push(getSectionAssignmentPair(line))
  }

  let numOverlappingPairs = 0

  for (let pair of pairs) {
    if (hasOverlap(pair)) {
      numOverlappingPairs += 1
    }
  }

  return numOverlappingPairs
}

// ================
// Supporting cast
// ================

type Elf = {
  sectionIds: number[]
}

type Pair = {
  elf01: Elf
  elf02: Elf
}

function getSectionAssignmentPair(inputLine: string): Pair {
  let [range01, range02] = inputLine
    .split(',')
    .map((rangeStr) => rangeStr.split('-').map((str) => Number.parseInt(str)))

  return {
    elf01: {
      sectionIds: getSectionIdsArray(range01),
    },
    elf02: {
      sectionIds: getSectionIdsArray(range02),
    },
  }
}

function getSectionIdsArray(range: number[]) {
  let [range01Start, range01End] = range
  let range01Length = range01End - range01Start + 1
  let sectionIds = [...Array(range01Length)].map((_, index) => index + range01Start)
  return sectionIds
}

function hasOverlap(pair: Pair) {
  let { elf01, elf02 } = pair

  let [longestRange, shorterRange] =
    elf01.sectionIds.length > elf02.sectionIds.length
      ? [elf01.sectionIds, elf02.sectionIds]
      : [elf02.sectionIds, elf01.sectionIds]

  let isOutOfRange =
    longestRange[0] > shorterRange[shorterRange.length - 1] ||
    shorterRange[0] > longestRange[longestRange.length - 1]

  if (isOutOfRange) {
    return false
  }

  for (let sectionId of shorterRange) {
    if (longestRange.includes(sectionId)) {
      return true
    }
  }

  return false
}
