import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string) {
  const input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')
  const moves: Move[] = getMovesFromInput(input)

  const initialPosition = {
    row: 0,
    col: 0,
  }

  const rope: Knot[] = []
  let previousKnot: Knot | null = null
  for (let i = 0; i < 10; i++) {
    const newKnot: Knot = new Knot({ ...initialPosition }, previousKnot)
    rope.push(newKnot)
    previousKnot = newKnot
  }

  const head = rope.at(0)!
  const tail = rope.at(-1)!

  for (const move of moves) {
    let { direction, steps } = move

    for (let step = 0; step < steps; step++) {
      head.moveOneStep(direction)

      for (let i = 1; i < rope.length; i++) {
        let currentKnot = rope[i]
        let previousKnot = currentKnot.parent!

        let vertical = currentKnot.position.row - previousKnot.position.row
        let horizontal = currentKnot.position.col - previousKnot.position.col

        let areOverlapping =
          previousKnot.position.row === currentKnot.position.row &&
          previousKnot.position.col === currentKnot.position.col
        let areTouching = Math.abs(vertical) <= 1 && Math.abs(horizontal) <= 1

        if (areOverlapping || areTouching) {
          continue
        }

        // move horizontally
        if (horizontal < 0) {
          currentKnot.moveOneStep('R')
        } else if (horizontal > 0) {
          currentKnot.moveOneStep('L')
        }

        // move vertically
        if (vertical < 0) {
          currentKnot.moveOneStep('U')
        } else if (vertical > 0) {
          currentKnot.moveOneStep('D')
        }

        currentKnot.markVisited()
      }
    }
  }

  return tail.visited.size
}

// ------------------------------------------------ //

type Move = {
  direction: 'R' | 'L' | 'U' | 'D'
  steps: number
}

type Position = {
  row: number
  col: number
}

class Knot {
  position: Position
  visited
  moveHistory
  parent

  constructor(position: Position, parent: Knot | null) {
    this.position = { ...position }
    this.parent = parent
    this.visited = new Set<string>()
    this.markVisited()
    this.moveHistory = new Array<string>()
    this.moveHistory.push(`${this.position.row},${this.position.col}`)
  }

  markVisited() {
    this.visited.add(`${this.position.row},${this.position.col}`)
  }

  move(direction: Move['direction'], steps: number) {
    switch (direction) {
      case 'U':
        this.position.row += steps
        break
      case 'D':
        this.position.row -= steps
        break
      case 'R':
        this.position.col += steps
        break
      case 'L':
        this.position.col -= steps
        break
    }
    this.moveHistory.push(`${this.position.row},${this.position.col}`)
  }

  moveOneStep(direction: Move['direction']) {
    this.move(direction, 1)
  }
}

function getMovesFromInput(input: string) {
  let moves: Move[] = input.split('\n').map((line) => {
    let [direction, steps] = line.split(' ')

    return {
      direction: direction as Move['direction'],
      steps: Number.parseInt(steps),
    }
  })

  return moves
}
