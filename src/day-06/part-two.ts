import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string) {
  let datastream = await readFile(`${__dirname}/${inputFile}`, 'utf-8')
  let fourteenLetterQueue = new Array<string>()
  let packetStart = 0

  for (let i = 0; i < datastream.length; i++) {
    let currentLetter = datastream[i]
    let duplicateLetterIndex = fourteenLetterQueue.findIndex(
      (bufferLetter) => bufferLetter === currentLetter
    )
    let duplicateFound = duplicateLetterIndex > -1

    if (duplicateFound) {
      for (let j = 0; j <= duplicateLetterIndex; j++) {
        fourteenLetterQueue.shift()
      }
    }

    fourteenLetterQueue.push(currentLetter)

    if (fourteenLetterQueue.length === 14) {
      packetStart = i + 1
      break
    }
  }

  return packetStart
}
