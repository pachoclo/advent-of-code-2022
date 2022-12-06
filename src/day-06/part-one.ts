import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  let datastream = await readFile(`${__dirname}/${inputFile}`, 'utf-8')
  let fourLetterQueue = new Array<string>()
  let packetStart = 0

  for (let i = 0; i < datastream.length; i++) {
    let currentLetter = datastream[i]
    let duplicateLetterIndex = fourLetterQueue.findIndex(
      (bufferLetter) => bufferLetter === currentLetter
    )
    let duplicateFound = duplicateLetterIndex > -1

    if (duplicateFound) {
      for (let j = 0; j <= duplicateLetterIndex; j++) {
        fourLetterQueue.shift()
      }
    }

    fourLetterQueue.push(currentLetter)

    if (fourLetterQueue.length === 4) {
      packetStart = i + 1
      break
    }
  }

  return packetStart
}
