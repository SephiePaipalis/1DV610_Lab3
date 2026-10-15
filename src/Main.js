
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output })

console.log('\n=== CAT CITY ADVENTURE ===')
console.log('1. Start game')
console.log('2. View instructions')
console.log('3. Quit')

const choice = await rl.question('\nChoose an option: ')

console.log(`You selected: ${choice}`)

rl.close()
