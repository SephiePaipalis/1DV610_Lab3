import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { Player } from './Player.js'
import { exploreCity } from './Exploration.js'
import { styles } from './ui/userInterface.js'

const rl = readline.createInterface({ input, output })

/**
 * Reads a single keypress without requiring Enter.
 *
 * Falls back to line-based input when stdin is not an interactive terminal.
 *
 * @returns {string} The key pressed.
 */
async function readKeypress() {
    if (!input.isTTY) {
        const answer = await rl.question('Enter a key: ')
        return answer.charAt(0).toLowerCase()
    }

    return new Promise((resolve) => {
        function handleKeypress(key, details) {
            input.removeListener('keypress', handleKeypress)
            resolve(details && details.name ? details.name : key)
        }

        input.setRawMode(true)
        input.once('keypress', handleKeypress)
    })
}

/**
 * Displays main menu, asks player to choose an option.
 * 
 * @returns {string} - Option entered by player.
 */
async function showMenu() {
    console.log()
    console.log(`${styles.magenta}================================${styles.reset}`)
    console.log(`${styles.cyan}       CAT CITY ADVENTURE${styles.reset}`)
    console.log(`${styles.magenta}================================${styles.reset}`)
    console.log(`${styles.yellow}             /\\_/\\\\${styles.reset}`)
    console.log(`${styles.yellow}            ( o.o )${styles.reset}`)
    console.log(`${styles.yellow}             > ^ <${styles.reset}`)
    console.log()
    console.log(`${styles.cyan}  1.${styles.reset} Start game`)
    console.log(`${styles.cyan}  2.${styles.reset} View instructions`)
    console.log(`${styles.cyan}  3.${styles.reset} Quit`)
    console.log()

    output.write(`${styles.yellow}Choose an option: ${styles.reset}`)
    const choice = await readKeypress()
    console.log()

    return choice
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
            const player = new Player()
            const foundMate = await exploreCity(player, readKeypress)

            if (foundMate) {
                isRunning = false
            }
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
    if (input.isTTY) {
        input.setRawMode(false)
    }

    rl.close()
}
