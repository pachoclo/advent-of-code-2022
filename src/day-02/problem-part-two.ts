enum Shape {
  ROCK,
  PAPER,
  SCISSORS,
}

type Encrypted = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z'

type RoundOutcome = 'WIN' | 'LOSE' | 'DRAW'

const decryptLetter = (letter: Encrypted): Shape | RoundOutcome => {
  switch (letter) {
    case 'A':
      return Shape.ROCK
    case 'B':
      return Shape.PAPER
    case 'C':
      return Shape.SCISSORS
    case 'X':
      return 'LOSE'
    case 'Y':
      return 'DRAW'
    case 'Z':
      return 'WIN'
  }
}

const shapeScore = {
  [Shape.ROCK]: 1,
  [Shape.PAPER]: 2,
  [Shape.SCISSORS]: 3,
}

const beatsMap = {
  [Shape.ROCK]: Shape.SCISSORS,
  [Shape.SCISSORS]: Shape.PAPER,
  [Shape.PAPER]: Shape.ROCK,
}

const beatenByMap = {
  [Shape.ROCK]: Shape.PAPER,
  [Shape.SCISSORS]: Shape.ROCK,
  [Shape.PAPER]: Shape.SCISSORS,
}

export function partTwo(input: string) {
  let myTotalScore = 0

  const rounds = input.split('\n').map((round) => round.replaceAll(' ', ''))

  for (let row of rounds) {
    const opponentShape = decryptLetter(row.at(0)! as Encrypted) as Shape
    const roundOutcome = decryptLetter(row.at(1)! as Encrypted) as RoundOutcome

    let yourShape: Shape

    if (roundOutcome === 'LOSE') {
      yourShape = beatsMap[opponentShape]
    } else if (roundOutcome === 'WIN') {
      myTotalScore += 6
      yourShape = beatenByMap[opponentShape]
    } else {
      myTotalScore += 3
      yourShape = opponentShape
    }

    myTotalScore += shapeScore[yourShape]
  }

  return myTotalScore
}
