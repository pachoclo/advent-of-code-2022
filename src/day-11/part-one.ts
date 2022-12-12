import { readFile } from 'fs/promises'

export async function partOne(inputFile: string) {
  const input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  const monkeys = input
    .split('\n\n')
    .map((monkeyBlock, monkeyNumber) => parseMonkey(monkeyBlock, monkeyNumber))

  const numberOfRounds = 20

  for (const _ of Array(numberOfRounds).fill(null)) {
    for (const monkey of monkeys) {
      const itemBagCopy = [...monkey.items]

      for (let i = 0; i < itemBagCopy.length; i++) {
        const item = itemBagCopy[i]
        let worryLevel: number = item

        // inspection
        let value: number =
          monkey.operation.value === 'old'
            ? worryLevel
            : Number.parseInt(monkey.operation.value)
        worryLevel = monkey.operation.op === '*' ? worryLevel * value : worryLevel + value

        monkey.itemsInspected++

        worryLevel = Math.floor(worryLevel / 3)

        // test
        if (worryLevel % monkey.test.divisibleBy === 0) {
          // throw current item to another monkey
          monkeys[monkey.test.true.throwToMonkey].items.push(worryLevel)
          monkey.items[i] = -1
        } else {
          monkeys[monkey.test.false.throwToMonkey].items.push(worryLevel)
          monkey.items[i] = -1
        }
      }

      monkey.items = monkey.items.filter((item) => item !== -1)
    }
  }

  monkeys.sort(
    (monkeyOne, monkeyTwo) => monkeyOne.itemsInspected - monkeyTwo.itemsInspected
  )

  const monkeyBusinessLevel =
    monkeys.at(-2)!.itemsInspected * monkeys.at(-1)!.itemsInspected

  return monkeyBusinessLevel
}

// -------------------------------------------------------//

type Operation = {
  op: '+' | '*'
  value: string | 'old'
}

type Test = {
  divisibleBy: number
  true: {
    throwToMonkey: number
  }
  false: {
    throwToMonkey: number
  }
}

type Monkey = {
  number: number
  items: number[]
  operation: Operation
  test: Test
  itemsInspected: number
}

function parseMonkey(monkeyBlock: string, monkeyNumber: number): Monkey {
  let lines = monkeyBlock.split('\n')
  let items = lines[1].match(/\d{1,2}/g)!.map((match) => Number.parseInt(match))

  let [_, op, value] = lines[2].match(/new = old (\*|\+) (old|\d{1,2})/)!
  let operation: Operation = {
    op: op as Operation['op'],
    value: value as Operation['value'],
  }

  let [__, divisibleBy] = lines[3].match(/Test: divisible by (\d{1,2})/)!
  let [___, trueMonkeyNumber] = lines[4].match(/If true: throw to monkey (\d{1,2})/)!
  let [____, falseMonkeyNumber] = lines[5].match(/If false: throw to monkey (\d{1,2})/)!
  let test: Test = {
    divisibleBy: Number.parseInt(divisibleBy),
    true: {
      throwToMonkey: Number.parseInt(trueMonkeyNumber),
    },
    false: {
      throwToMonkey: Number.parseInt(falseMonkeyNumber),
    },
  }

  return {
    number: monkeyNumber,
    items,
    operation,
    test,
    itemsInspected: 0,
  }
}
