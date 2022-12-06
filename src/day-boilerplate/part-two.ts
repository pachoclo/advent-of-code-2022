import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string) {
  let input = await readFile(inputFile, 'utf-8')
}
