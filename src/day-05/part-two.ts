// https://adventofcode.com/2022/day/5#part2

import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string) {
  const input = await readFile(`${__dirname}/${inputFile}`, { encoding: 'utf-8' })

  const { stacks, procedures } = parseInput(input)

  for (let procedure of procedures) {
    const { quantity, from, to } = procedure

    const tempStack = new Array<string>()

    for (let i = 0; i < quantity; i++) {
      let crate = stacks[from - 1].pop()
      tempStack.push(crate!)
    }

    for (let i = 0; i < quantity; i++) {
      stacks[to - 1].push(tempStack.pop()!)
    }
  }

  const topCrates = stacks.map((stack) => stack.pop()).join('')

  return topCrates
}

// ================
// Supporting cast
// ================

type Stack = Array<string>

type Procedure = {
  quantity: number
  from: number
  to: number
}

function parseInput(input: string) {
  let [cargoBlock, proceduresBlock] = input.split('\n\n')
  return {
    stacks: [...getCargoStacks(cargoBlock)],
    procedures: getProcedures(proceduresBlock),
  }
}

function getCargoStacks(cargoBlock: string) {
  let cargoRows = cargoBlock.split('\n')
  let stackLabelsStr = cargoRows.pop()!
  let numberOfStacks = stackLabelsStr.match(/\d{1,4}/g)!.length

  let stacks = new Array<Stack>()
  for (let i = 0; i < numberOfStacks; i++) {
    stacks.push(new Array<string>())
  }

  for (let rowNum = cargoRows.length - 1; rowNum >= 0; rowNum--) {
    let cargoRow = cargoRows[rowNum].match(/\s{4}|\[[A-Z]\] | \[[A-Z]\]|\[[A-Z]\]/g)!

    for (let c = 0; c < cargoRow.length; c++) {
      let currentStack = stacks[c]
      let cargo = cargoRow[c].trim().replace('[', '').replace(']', '')

      if (cargo !== '') currentStack.push(cargo)
    }
  }

  return stacks
}

function getProcedures(proceduresBlock: string) {
  let procedureStrings = proceduresBlock.split('\n')
  let procedures = new Array<Procedure>()

  for (let arrangementProcedure of procedureStrings) {
    let regex = /^move (?<quantity>\d{1,2}) from (?<from>\d{1,2}) to (?<to>\d{1,2})$/
    let { quantity, from, to } = arrangementProcedure.match(regex)!.groups!

    procedures.push({
      quantity: Number.parseInt(quantity),
      from: Number.parseInt(from),
      to: Number.parseInt(to),
    })
  }

  return procedures
}
