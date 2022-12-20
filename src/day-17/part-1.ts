import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  // let moves = await readFile(`${__dirname}/${inputFile}`, 'utf-8')
  let moves = await readFile(`./${inputFile}`, 'utf-8')

  const board: string[][] = []

  moves
  pieces
}

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

partOne('sample-input.txt')
