import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { Combat } from './Combat.js'
import { Player } from './Player.js'
import { getGameAction } from './GameInput.js'
import { RandomGenerator } from 'dice-rng-toolkit'

const rng = new RandomGenerator()
const rl = readline.createInterface({ input, output })

/**
 * Determines whether the player encounters a monster.
 *
 * @returns {boolean} True if a monster is encountered.
 */
function shouldEncounterMonster() {
    return rng.nextFloat() < 0.4
}


/**
 * Displays main menu, asks player to choose an option.
 * 
 * @returns {string} - Option entered by player.
 */
async function showMenu() {
    console.log('=== CAT CITY ADVENTURE ===')
    console.log('1. Start game')
    console.log('2. View instructions')
    console.log('3. Quit')

    return rl.question('Choose an option: ')
}

/**
 * Runs main menu loop and handles player's choices.
 */
async function runGame() {
    let isRunning = true

    while (isRunning) {
        const choice = await showMenu()

        if (choice === '1') {
            console.log('Starting a new adventure...')
        } else if (choice === '2') {
            console.log('<<<???|  HOW TO PLAY  |???>>>')
            console.log('Keep an eye on your health!')
        } else if (choice === '3') {
            console.log('Thanks for playing!')
            isRunning = false
        } else {
            console.log('Invalid choice. Please select 1, 2, or 3.')
        }
    }
}

try {
    await runGame()
} finally {
    rl.close()
}
