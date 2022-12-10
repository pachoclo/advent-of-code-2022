import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string) {
  const input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')
  const headMoves: Move[] = getMovesFromInput(input)

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

  for (const headMove of headMoves) {
    const { direction, steps } = headMove

    for (let step = 0; step < steps; step++) {
      head.moveOneStep(direction)

      for (let i = 1; i < rope.length; i++) {
        const currentKnot = rope[i]
        const previousKnot = currentKnot.parent!

        const verticalDiff = currentKnot.position.row - previousKnot.position.row
        const horizontalDiff = currentKnot.position.col - previousKnot.position.col

        const areOverlapping =
          previousKnot.position.row === currentKnot.position.row &&
          previousKnot.position.col === currentKnot.position.col
        const areTouching = Math.abs(verticalDiff) <= 1 && Math.abs(horizontalDiff) <= 1

        if (areOverlapping || areTouching) {
          continue
        }

        // move horizontally
        if (horizontalDiff < 0) {
          currentKnot.moveOneStep('R')
        } else if (horizontalDiff > 0) {
          currentKnot.moveOneStep('L')
        }

        // move vertically
        if (verticalDiff < 0) {
          currentKnot.moveOneStep('U')
        } else if (verticalDiff > 0) {
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
  parent

  constructor(position: Position, parent: Knot | null) {
    this.position = { ...position }
    this.parent = parent
    this.visited = new Set<string>()
    this.markVisited()
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
