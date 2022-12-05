// https://adventofcode.com/2022/day/5

import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  let input = await readFile(`${__dirname}/${inputFile}`, { encoding: 'utf-8' })

  let { stacks, procedures } = parseInput(input)

  for (let procedure of procedures) {
    let { quantity, from, to } = procedure

    for (let i = 0; i < quantity; i++) {
      let crate = stacks[from - 1].pop()
      stacks[to - 1].push(crate!)
    }
  }

  let topCrates = stacks.map((stack) => stack.pop()).join('')

  return topCrates
}

// ================
// Supporting cast
// ================

function parseInput(input: string) {
  let [cargo, proceduresBlock] = input.split('\n\n')
  let cargoRows = cargo.split('\n')
  let procedureStrings = proceduresBlock.split('\n')

  // parse cargo stacks

  let stackLabelsStr = cargoRows.pop()!

  let stackLabels = new Array<number>()
  for (let i = 0; i <= stackLabelsStr.length - 2; i += 4) {
    let label = Number.parseInt(stackLabelsStr.substring(i, i + 3).trim())
    stackLabels.push(label)
  }

  let numberOfStacks = stackLabels.length

  let stacks = new Array<Stack>()
  for (let i = 0; i < numberOfStacks; i++) {
    stacks.push(new Array<string>())
  }

  for (let rowNum = cargoRows.length - 1; rowNum >= 0; rowNum--) {
    let cargoRow = cargoRows[rowNum]

    let regex = /(\[[A-Z]\] | \[[A-Z]\])/g
    let matches = cargoRow.match(regex)
    console.log(matches)

    for (let s = 0, i = 0; s < numberOfStacks && i <= cargoRow.length - 2; s++, i += 4) {
      let currentStack = stacks[s]
      let cargo = cargoRow
        .substring(i, i + 3)
        .trim()
        .replace('[', '')
        .replace(']', '')

      if (cargo !== '') currentStack.push(cargo)
    }
  }

  // parse procedures

  let procedures = new Array<Procedure>()

  for (let arrangementProcedure of procedureStrings) {
    let regex = /^move (?<quantity>\d{1,2}) from (?<from>\d{1,2}) to (?<to>\d{1,2})$/
    let { quantity, from, to } = arrangementProcedure.match(regex)?.groups!

    procedures.push({
      quantity: Number.parseInt(quantity),
      from: Number.parseInt(from),
      to: Number.parseInt(to),
    })
  }

  return { stacks, procedures }
}

type Stack = Array<string>

type Procedure = {
  quantity: number
  from: number
  to: number
}
