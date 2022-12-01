export function alternateSolution01(input: string) {
  const elves = getElves(input)
  const sortedElves = elves.sort((elfA, elfB) => elfB.totalCalories - elfA.totalCalories)
  return sortedElves[0].totalCalories
}

type Elf = {
  calorieBag: Array<number>
  totalCalories: number
  addCalorie: (calorie: number) => void
}

function createElf(): Elf {
  return {
    calorieBag: new Array<number>(),
    totalCalories: 0,
    addCalorie: function (calorie) {
      this.totalCalories += calorie
      this.calorieBag.push(calorie)
    },
  }
}

function getElves(input: string): Array<Elf> {
  const allElves = new Array<Elf>()
  let currentElf: Elf = createElf()

  let currentCalorieString = ''
  let previousChar = ''

  for (let index = 0; index < input.length; index++) {
    const currentChar = input[index]

    if (currentChar === '\n' && previousChar === '\n') {
      // empty line -> create new elf -> skip
      allElves.push(currentElf)
      currentElf = createElf()
      continue
    }

    if (currentChar === '\n' && previousChar !== '\n') {
      // linebreak for non-empty line -> number complete -> reset current string
      const calorieAsNumber = Number.parseInt(currentCalorieString)
      currentElf.addCalorie(calorieAsNumber)
      currentCalorieString = ''
    } else {
      currentCalorieString += currentChar
    }

    previousChar = currentChar
  }

  return allElves
}
