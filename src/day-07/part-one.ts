import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  let input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')
  let terminalOutputLines: (Command | FileSystemNode)[] = parseTerminalOutput(input)

  let rootDirectory = recreateFileSystemTree(terminalOutputLines)
  computeDirectorySizes(rootDirectory)

  let smolDirs: Directory[] = []
  findDirsWithSizeSmallerThan(100000, rootDirectory, smolDirs)

  let smolDirsSizeTotal = smolDirs.reduce((sum, { size }) => sum + size, 0)
  return smolDirsSizeTotal
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
  let root: FileSystemNode = {
    type: 'directory',
    name: '/',
    size: 0, // for now
    children: [], // for now
  }

  let directoryStack = new Array<Directory>()
  let currentDirectory = () => directoryStack.at(-1)!

  directoryStack.push(root)

  for (let line of terminalOutputLines) {
    if (line.type === 'command') {
      let { command, argument }: Command = line

      switch (command) {
        case 'cd':
          if (argument === '/') {
            while (directoryStack.length > 1) {
              directoryStack.pop()
            }
          } else if (argument === '..') {
            directoryStack.pop()
          } else if (argument !== null) {
            let newDirectory: Directory = {
              type: 'directory',
              name: argument,
              size: 0,
              children: [],
            }
            currentDirectory().children.push(newDirectory)
            directoryStack.push(newDirectory)
          }
          break
        case 'ls':
          continue
      }
    }

    if (line.type === 'file') {
      let file: File = {
        ...line,
      }
      currentDirectory().children.push(file)
      continue
    }

    if (line.type === 'directory') {
      // do nothing??
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

function findDirsWithSizeSmallerThan(maxSize: number, directory: Directory, smolDirs: Directory[]) {
  if (directory.size <= maxSize) {
    smolDirs.push(directory)
  }

  for (let child of directory.children) {
    if (child.type === 'directory') {
      findDirsWithSizeSmallerThan(maxSize, child, smolDirs)
    }
  }

  return smolDirs
}
