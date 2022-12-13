import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  const input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  const { nodeGrid, startNode, endNode } = parseInput(input)

  calculateEdges(nodeGrid)
  // printNodeGrid(nodeGrid)

  const shortestPath = findShortestPath(startNode, endNode)

  return shortestPath.length - 1
}

// --------------------------------------------------- //

type NodeEdges = { [key in 'north' | 'south' | 'east' | 'west']: Node | null }

type Node = {
  position: {
    row: number
    col: number
  }
  elevation: number // should we parse this into an Integer?
  value: string
  nodeEdges: NodeEdges
}

function parseInput(input: string) {
  const inputRows = input.split('\n')

  const nodeGrid = new Array<Array<Node>>()
  let startNode: Node
  let endNode: Node

  for (let rowIdx = 0; rowIdx < inputRows.length; rowIdx++) {
    const nodeRow = new Array<Node>()

    nodeGrid.push(nodeRow)

    for (let colInx = 0; colInx < inputRows[0].length; colInx++) {
      const squareValue = inputRows[rowIdx][colInx]

      const newNode: Node = {
        position: {
          row: rowIdx,
          col: colInx,
        },
        elevation: squareValue.charCodeAt(0),
        value: squareValue,
        nodeEdges: { north: null, south: null, west: null, east: null },
      }

      if (squareValue === 'S') {
        newNode.elevation = 'a'.charCodeAt(0)
        startNode = newNode
      } else if (squareValue === 'E') {
        newNode.elevation = 'z'.charCodeAt(0)
        endNode = newNode
      }

      nodeRow.push(newNode)
    }
  }

  return {
    nodeGrid,
    startNode: startNode!,
    endNode: endNode!,
  }
}

function printNodeGrid(nodeGrid: Array<Array<Node>>) {
  for (const row of nodeGrid) {
    const lineToPrint = []

    for (const node of row) {
      lineToPrint.push(node.elevation)
    }

    console.log(lineToPrint.join(''))
  }
}

function calculateEdges(nodeGrid: Node[][]) {
  for (let rowIdx = 0; rowIdx < nodeGrid.length; rowIdx++) {
    const row = nodeGrid[rowIdx]

    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      const node = nodeGrid[rowIdx][colIdx]

      // find the node's edges

      const nodeEdges = node.nodeEdges

      if (
        rowIdx - 1 >= 0 &&
        nodeGrid[rowIdx - 1][colIdx].elevation <= node.elevation + 1
      ) {
        nodeEdges.north = nodeGrid[rowIdx - 1][colIdx]
      }

      if (
        rowIdx + 1 < nodeGrid.length &&
        nodeGrid[rowIdx + 1][colIdx].elevation <= node.elevation + 1
      ) {
        nodeEdges.south = nodeGrid[rowIdx + 1][colIdx]
      }

      if (
        colIdx - 1 >= 0 &&
        nodeGrid[rowIdx][colIdx - 1].elevation <= node.elevation + 1
      ) {
        nodeEdges.west = nodeGrid[rowIdx][colIdx - 1]
      }

      if (
        colIdx + 1 < row.length &&
        nodeGrid[rowIdx][colIdx + 1].elevation <= node.elevation + 1
      ) {
        nodeEdges.east = nodeGrid[rowIdx][colIdx + 1]
      }
    }
  }
}

let minPathLength = Number.MAX_SAFE_INTEGER

function findShortestPath(from: Node, to: Node, path = new Array<Node>()): Node[] {
  if (path.includes(from) || path.includes(to)) {
    // already visited this node in the current path -> cycle -> no bueno 🚫
    return []
  }

  const localPath = [from, ...path]

  if (localPath.length >= minPathLength) {
    return []
  }

  if (to === from) {
    // reached the end ✅
    if (localPath.length < minPathLength) {
      minPathLength === localPath.length
      return localPath
    }

    return []
  }

  const edgeTargets = Object.values(from.nodeEdges)

  const shortestPath: Node[] = edgeTargets
    .map((edgeTarget) =>
      edgeTarget ? findShortestPath(edgeTarget, to, [...localPath]) : []
    )
    .filter((edgeTarget) => !!edgeTarget)
    .filter((path) => path && path.length > 0)
    .sort((nodeA, nodeB) => nodeA.length - nodeB.length)[0]

  return shortestPath
}
