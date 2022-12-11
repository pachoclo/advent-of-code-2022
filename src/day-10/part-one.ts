import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  const input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  const cpuSignals = input.split('\n')
  const cpuSignalStack = cpuSignals.flatMap((signal) =>
    signal.split(' ').map((cmd) => (cmd === 'addx' ? 'noop' : signal))
  )

  cpuSignalStack.reverse()

  let totalSignalStrength = 0
  let registerX = 1
  let cycleNumber = 1

  while (cpuSignalStack.length > 0) {
    const [command, value] = cpuSignalStack.pop()!.split(' ')

    if (cycleNumber % 40 === 20) {
      totalSignalStrength += registerX * cycleNumber
    }

    if (command === 'addx') {
      registerX += Number.parseInt(value)
    }

    cycleNumber++
  }

  return totalSignalStrength
}

//------------------------------------------------------------ //
