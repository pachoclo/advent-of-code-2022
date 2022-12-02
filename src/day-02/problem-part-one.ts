enum Shape {
  ROCK,
  PAPER,
  SCISSORS,
}

type EncryptedShape = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z'

const decryptLetter = (letter: EncryptedShape): Shape => {
  switch (letter) {
    case 'A':
    case 'X':
      return Shape.ROCK
    case 'B':
    case 'Y':
      return Shape.PAPER
    case 'C':
    case 'Z':
      return Shape.SCISSORS
  }
}

const shapeScore = {
  [Shape.ROCK]: 1,
  [Shape.PAPER]: 2,
  [Shape.SCISSORS]: 3,
}

const beatMap = {
  [Shape.ROCK]: Shape.SCISSORS,
  [Shape.SCISSORS]: Shape.PAPER,
  [Shape.PAPER]: Shape.ROCK,
}

export function partOne(input: string) {
  let myTotalScore = 0

  const rounds = input.split('\n').map((round) => round.replaceAll(' ', ''))

  for (let row of rounds) {
    const opponentShape = decryptLetter(row.at(0)! as EncryptedShape)
    const myShape = decryptLetter(row.at(1)! as EncryptedShape)

    if (beatMap[myShape] === opponentShape) {
      myTotalScore += 6
    } else if (myShape === opponentShape) {
      myTotalScore += 3
    }

    myTotalScore += shapeScore[myShape]
  }

  return myTotalScore
}
