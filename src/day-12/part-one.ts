import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  const input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  const { nodeGrid, startNode, endNode } = parseInput(input)

  calculateEdges(nodeGrid)

  return findSmallestDistance(startNode, endNode)
}

// --------------------------------------------------- //

type NodeEdges = { [key in 'north' | 'south' | 'east' | 'west']: Node | null }

type Node = {
  position: {
    row: number
    col: number
  }
  elevation: number
  value: string
  nodeEdges: NodeEdges
}

function parseInput(input: string) {
  const inputLines = input.split('\n')

  const nodeGrid = new Array<Array<Node>>()
  let startNode: Node
  let endNode: Node

  for (let rowIdx = 0; rowIdx < inputLines.length; rowIdx++) {
    const nodeRow = new Array<Node>()

    nodeGrid.push(nodeRow)

    for (let colInx = 0; colInx < inputLines[0].length; colInx++) {
      const letter = inputLines[rowIdx][colInx]

      const newNode: Node = {
        position: {
          row: rowIdx,
          col: colInx,
        },
        elevation: letter.charCodeAt(0),
        value: letter,
        nodeEdges: { north: null, south: null, west: null, east: null },
      }

      if (letter === 'S') {
        newNode.elevation = 'a'.charCodeAt(0)
        startNode = newNode
      } else if (letter === 'E') {
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

function calculateEdges(nodeGrid: Node[][]) {
  for (let rowIdx = 0; rowIdx < nodeGrid.length; rowIdx++) {
    const row = nodeGrid[rowIdx]

    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      const node = nodeGrid[rowIdx][colIdx]

      // Find the node's edges that are same or lower height

      const nodeEdges = node.nodeEdges

      if (rowIdx > 0 && nodeGrid[rowIdx - 1][colIdx].elevation <= node.elevation + 1) {
        nodeEdges.north = nodeGrid[rowIdx - 1][colIdx]
      }

      if (
        rowIdx < nodeGrid.length - 1 &&
        nodeGrid[rowIdx + 1][colIdx].elevation <= node.elevation + 1
      ) {
        nodeEdges.south = nodeGrid[rowIdx + 1][colIdx]
      }

      if (colIdx > 0 && nodeGrid[rowIdx][colIdx - 1].elevation <= node.elevation + 1) {
        nodeEdges.west = nodeGrid[rowIdx][colIdx - 1]
      }

      if (
        colIdx < row.length - 1 &&
        nodeGrid[rowIdx][colIdx + 1].elevation <= node.elevation + 1
      ) {
        nodeEdges.east = nodeGrid[rowIdx][colIdx + 1]
      }
    }
  }
}

function findSmallestDistance(startNode: Node, endNode: Node) {
  // 👇 Traverse the graph using BFS

  // queue stores visited nodes + their depth / distance
  let queue: [node: Node, depth: number][] = []

  // this set makes sure we don't visit the same node twice
  let visited = new Set<Node>()

  queue.push([startNode, 0])
  visited.add(startNode)

  while (queue.length > 0) {
    let [currentNode, depth] = queue.shift()!

    const currentDepth = depth + 1

    // enqueue all valid adjacent nodes to currentNode
    for (let adjacentNode of Object.values(currentNode.nodeEdges)) {
      if (adjacentNode === null || visited.has(adjacentNode)) {
        continue
      }

      // check the adjacent node's value
      if (adjacentNode === endNode) {
        // we found it!
        return currentDepth
      }

      queue.push([adjacentNode, currentDepth])
      visited.add(adjacentNode)
    }
  }

  return -1
}
