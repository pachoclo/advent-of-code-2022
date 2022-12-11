import { readFile } from 'fs/promises'

export async function partTwo(this: any, inputFile: string) {
  let input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  // the CRT draws a single pixel during each cycle

  const cpuCycles = input
    .split('\n')
    .flatMap((signal) =>
      signal.split(' ').map((cmd) => (cmd === 'addx' ? 'noop' : signal))
    )
  cpuCycles.reverse()

  let spritePosition = 1
  const crt = new Crt()

  while (cpuCycles.length > 0) {
    if (
      spritePosition === crt.currentLinePixel ||
      spritePosition - 1 === crt.currentLinePixel ||
      spritePosition + 1 === crt.currentLinePixel
    ) {
      crt.drawPixel('#')
    } else {
      crt.drawPixel('.')
    }

    const [cmd, value] = cpuCycles.pop()!.split(' ')

    if (cmd === 'addx') {
      spritePosition += Number.parseInt(value)
    }
  }

  return crt.lines
}

class Crt {
  lines: string[][]
  currentLine: number
  currentLinePixel: number

  constructor(height: number = 6) {
    this.lines = new Array(height)
    this.currentLine = 0
    this.lines[this.currentLine] = new Array<string>()
    this.currentLinePixel = 0
  }

  moveToNextLine() {
    this.currentLine++
    this.lines[this.currentLine] = new Array<string>()
    this.currentLinePixel = 0
  }

  printLine() {
    console.log(this.lines[this.currentLine].join(''))
  }

  drawPixel(char: '.' | '#') {
    this.lines[this.currentLine].push(char)

    this.currentLinePixel++

    if (this.currentLinePixel === 40) {
      this.printLine()
      this.moveToNextLine()
    }
  }
}
