import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string) {
  let input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  // the CRT draws a single pixel during each cycle

  const cpuSignals = input.split('\n')
  const tickStack = cpuSignals.flatMap((signal) =>
    signal.split(' ').map((cmd) => (cmd === 'addx' ? 'noop' : signal))
  )

  tickStack.reverse()
}
