import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string) {
  let input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')
  let terminalOutputLines: (Command | FileSystemNode)[] = parseTerminalOutput(input)

  let rootDirectory = recreateFileSystemTree(terminalOutputLines)
  computeDirectorySizes(rootDirectory)

  let totalDiskSpace = 70000000
  let totalUsedSpace = rootDirectory.size
  let availableSpace = totalDiskSpace - totalUsedSpace
  let minSpaceNeeded = 30000000 - availableSpace

  let biggusDirs: Directory[] = []
  findDirsWithSizeBiggerThan(minSpaceNeeded, rootDirectory, biggusDirs)

  let smallestOfBiggusDirs = biggusDirs.reduce(
    (smallest, { size }) => (size <= smallest ? size : smallest),
    Number.MAX_SAFE_INTEGER
  )

  return smallestOfBiggusDirs
}

// ----------------------------------------------- //

type Command = {
  type: 'command'
  command: 'cd' | 'ls'
  argument: string | null
}

type File = {
  type: 'file'
  name: string
  size: number
}

type Directory = {
  type: 'directory'
  name: string
  size: number
  children: FileSystemNode[]
}

type FileSystemNode = Directory | File

function parseTerminalOutput(input: string) {
  let terminalOutputLines = []

  for (let line of input.split('\n')) {
    let [start, middle, end] = line.split(' ')

    if (start === '$') {
      let command: Command = {
        type: 'command',
        command: middle as Command['command'],
        argument: end,
      }
      terminalOutputLines.push(command)
      continue
    }

    if (start === 'dir') {
      let directory: FileSystemNode = {
        type: 'directory',
        name: middle,
        size: 0,
        children: [],
      }
      terminalOutputLines.push(directory)
      continue
    }

    if (!isNaN(Number.parseInt(start))) {
      let file: FileSystemNode = {
        type: 'file',
        name: middle,
        size: Number.parseInt(start),
      }
      terminalOutputLines.push(file)
      continue
    }
  }

  return terminalOutputLines
}

function recreateFileSystemTree(terminalOutputLines: (Command | FileSystemNode)[]) {
  let directoryStack = new Array<Directory>()
  let currentDirectory = () => directoryStack.at(-1)!

  let root: FileSystemNode = {
    type: 'directory',
    name: '/',
    size: 0, // for now
    children: [], // for now
  }
  directoryStack.push(root)

  for (let line of terminalOutputLines) {
    if (line.type === 'command' && line.command === 'cd') {
      let { argument }: Command = line

      switch (argument) {
        case '/': {
          while (directoryStack.length > 1) {
            directoryStack.pop()
          }
          break
        }
        case '..': {
          directoryStack.pop()
          break
        }
        case null: {
          throw new Error('Received cmd "cd" without arguments')
        }
        default: {
          let newDirectory: Directory = {
            type: 'directory',
            name: argument,
            size: 0,
            children: [],
          }
          currentDirectory().children.push(newDirectory)
          directoryStack.push(newDirectory)
        }
      }
      continue
    }

    if (line.type === 'file') {
      currentDirectory().children.push(line)
      continue
    }

    if (line.type === 'directory') {
      continue
    }
  }

  return root
}

function computeDirectorySizes(directory: Directory) {
  for (let child of directory.children) {
    if (child.type === 'directory') {
      computeDirectorySizes(child)
    }
    directory.size += child.size
  }
}

function findDirsWithSizeBiggerThan(
  minSize: number,
  directory: Directory,
  biggusDirs: Directory[]
) {
  if (directory.size >= minSize) {
    biggusDirs.push(directory)
  }

  for (let child of directory.children) {
    if (child.type === 'directory') {
      findDirsWithSizeBiggerThan(minSize, child, biggusDirs)
    }
  }
}
