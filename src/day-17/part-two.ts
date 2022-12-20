import { readFile } from 'fs/promises'

const boardWidth = 7

export async function partTwo(inputFile: string) {
  let moves = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  let currentMove = 0

  const nextSideMove = () => {
    let nextMove = moves[currentMove]
    if (currentMove + 1 >= moves.length) {
      currentMove = 0
    } else {
      currentMove += 1
    }
    return nextMove
  }

  let currentPiece = 0

  const nextPiece = () => {
    let nextPiece = pieces[currentPiece]
    if (currentPiece + 1 >= pieces.length) {
      currentPiece = 0
    } else {
      currentPiece += 1
    }
    return nextPiece
  }

  const board: string[][] = []
  const newBoardRow = Array<string>(boardWidth).fill('.')
  board.push([...newBoardRow].fill('#'))

  let topRow = 0

  for (let i = 0; i < 1_000_000_000_000; i++) {
    const piece = nextPiece()

    const rowsToAdd = 3 + piece.height - (board.length - 1 - topRow)

    for (let k = 0; k < rowsToAdd; k++) {
      board.push([...newBoardRow])
    }

    // printBoard()

    let piecePos: Point = {
      x: 2,
      y: topRow + 4,
    }

    while (true) {
      const move = nextSideMove()

      if (move === '>') {
        let canMoveRight = piece.blocks.every(
          (block) =>
            piecePos.x + block.x + 1 < boardWidth &&
            board[piecePos.y + block.y][piecePos.x + block.x + 1] !== '#'
        )
        if (canMoveRight) {
          piecePos.x += 1
        }
      }

      if (move === '<') {
        let canMoveLeft = piece.blocks.every(
          (block) =>
            piecePos.x + block.x - 1 >= 0 &&
            board[piecePos.y + block.y][piecePos.x + block.x - 1] !== '#'
        )
        if (canMoveLeft) {
          piecePos.x -= 1
        }
      }

      let canMoveDown = piece.blocks.every(
        (block) => board[piecePos.y + block.y - 1][piecePos.x + block.x] !== '#'
      )

      if (canMoveDown) {
        piecePos.y -= 1
        continue
      }

      // add to grid
      piece.blocks.forEach((block) => {
        board[piecePos.y + block.y][piecePos.x + block.x] = '#'
      })

      topRow = board.findIndex((row) => !row.includes('#')) - 1

      break
    }
  }

  return topRow
}

// --------------------------------------------------------------- //

type Point = {
  x: number
  y: number
}

type Piece = {
  type: '_' | '+' | 'L' | '|' | '[]'
  height: number
  width: number
  blocks: readonly Point[]
}

const pieces: Piece[] = [
  // _
  {
    type: '_',
    height: 1,
    width: 4,
    blocks: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ],
  } as const,
  // +
  {
    type: '+',
    height: 3,
    width: 3,
    blocks: [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
    ],
  } as const,
  // L
  {
    type: 'L',
    height: 3,
    width: 3,
    blocks: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ],
  } as const,
  // |
  {
    type: '|',
    height: 4,
    width: 1,
    blocks: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ],
  } as const,
  // []
  {
    type: '[]',
    height: 2,
    width: 2,
    blocks: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
  } as const,
]

const printBoard = (board: string[][]) => {
  for (let row = board.length - 1; row >= 0; row--) {
    console.log(board[row].join(''))
  }
  console.log('')
}
