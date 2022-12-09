import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  let input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')
  let moves: Move[] = getMovesFromInput(input)

  let initialPosition = {
    row: 0,
    col: 0,
  }

  let head = new Knot(initialPosition)
  let tail = new Knot(initialPosition)

  for (const move of moves) {
    let { direction, steps } = move

    for (let step = 0; step < steps; step++) {
      head.moveOneStep(direction)

      let vertical = tail.position.row - head.position.row
      let horizontal = tail.position.col - head.position.col

      let areOverlapping =
        head.position.row === tail.position.row && head.position.col === tail.position.col
      let areTouching = Math.abs(vertical) <= 1 && Math.abs(horizontal) <= 1

      if (areOverlapping || areTouching) {
        // don't move the tail
        continue
      }

      // move horizontally
      if (horizontal < 0) {
        tail.moveOneStep('R')
      } else if (horizontal > 0) {
        tail.moveOneStep('L')
      }

      // move vertically
      if (vertical < 0) {
        tail.moveOneStep('U')
      } else if (vertical > 0) {
        tail.moveOneStep('D')
      }

      tail.markVisited()
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

  constructor(position: Position) {
    this.position = { ...position }
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
