// https://adventofcode.com/2022/day/1
export function partOne(input: string) {
  const elves = getElves(input)
  let biggusElfCalories = 0

  for (const elf of elves) {
    if (elf.totalCalories > biggusElfCalories) {
      biggusElfCalories = elf.totalCalories
    }
  }

  return biggusElfCalories
}

// https://adventofcode.com/2022/day/1#part2
export function partTwo(input: string) {
  const elves = getElves(input)

  // sort bigger > smaller
  const sortedElves = elves
    .sort((elfA, elfB) => elfA.totalCalories - elfB.totalCalories)
    .reverse()
    .map((elf) => elf.totalCalories)

  // grab first 3
  const topThreeElves = sortedElves.slice(0, 3)

  // compute total calories out of those 3
  const totalCalories = topThreeElves.reduce((total, current) => total + current, 0)

  return totalCalories
}

type Elf = {
  calories: Array<number>
  totalCalories: number
}

function getElves(input: string): Array<Elf> {
  const elves = Array<Elf>()
  const elfLines = input.split('\n\n')

  for (const line of elfLines) {
    if (line === '') {
      continue
    }

    const calories = []
    let totalCalories = 0

    for (const calorieString of line.split('\n')) {
      const calorieNumber = Number.parseInt(calorieString)
      if (isNaN(calorieNumber)) {
        continue
      }
      calories.push(calorieNumber)
      totalCalories += calorieNumber
    }

    const elf = {
      calories,
      totalCalories,
    }

    elves.push(elf)
  }

  return elves
}
