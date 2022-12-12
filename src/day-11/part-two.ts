import { readFile } from 'fs/promises'

export async function partTwo(inputFile: string) {
  const input = await readFile(`${__dirname}/${inputFile}`, 'utf-8')

  const monkeys = input
    .split('\n\n')
    .map((monkeyBlock, monkeyNumber) => parseMonkey(monkeyBlock, monkeyNumber))

  // 🪄 magic line ✨
  // Mod base is the product of all divisors.
  // Needed to apply modular arithmetic to reduce the size of the worryLevel
  // later on (line 38)
  let modBase = 1
  for (const monkey of monkeys) {
    modBase *= monkey.test.divisibleBy
  }

  const numberOfRounds = 10000

  for (let round = 1; round <= numberOfRounds; round++) {
    for (const monkey of monkeys) {
      const itemBagCopy = [...monkey.items]

      for (let i = 0; i < itemBagCopy.length; i++) {
        const item = itemBagCopy[i]
        let worryLevel = item

        // 🐒 Inspects the item
        const value =
          monkey.operation.value === 'old'
            ? worryLevel
            : Number.parseInt(monkey.operation.value)

        // apply monkey's operation to the worryLevel
        worryLevel = monkey.operation.op === '*' ? worryLevel * value : worryLevel + value

        // 🪄 magic line ✨
        // Makes `worryLevel` a manageable number (no overflow)
        worryLevel = worryLevel % modBase

        monkey.itemsInspected++

        // 🐒 Tests the worryLevel and decides which next 🐒 should be the item's target
        if (worryLevel % monkey.test.divisibleBy === 0) {
          monkeys[monkey.test.true.target].items.push(worryLevel)
          monkey.items[i] = -1
        } else {
          monkeys[monkey.test.false.target].items.push(worryLevel)
          monkey.items[i] = -1
        }
      }

      monkey.items = monkey.items.filter((item) => item !== -1)
    }
  }

  // sort the list and get the 2 top 🐒s
  const [topMonkey, secondBigCheese] = monkeys
    .sort((monkeyOne, monkeyTwo) => monkeyOne.itemsInspected - monkeyTwo.itemsInspected)
    .slice(-2, monkeys.length)

  const monkeyBusinessLevel = topMonkey.itemsInspected * secondBigCheese.itemsInspected

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
    target: number
  }
  false: {
    target: number
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
      target: Number.parseInt(trueMonkeyNumber),
    },
    false: {
      target: Number.parseInt(falseMonkeyNumber),
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
