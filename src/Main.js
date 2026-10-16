import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { Combat } from './Combat.js'
import { Player } from './Player.js'
import { Monster } from './Monster.js'
import { getGameAction } from './GameInput.js'
import { RandomGenerator } from 'dice-rng-toolkit'

const rng = new RandomGenerator()
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
 * Determines whether the player encounters a monster.
 *
 * @returns {boolean} True if a monster is encountered.
 */
function shouldEncounterMonster() {
    return rng.nextFloat() < 0.4
}


/**
 * Displays the message for a movement action.
 *
 * @param {string} action - The movement action.
 * @returns {boolean} True if the action was a movement action.
 */
function movePlayer(action) {
    if (action === 'MOVE_NORTH') {
        console.log('You venture north.')
    } else if (action === 'MOVE_WEST') {
        console.log('You venture west.')
    } else if (action === 'MOVE_SOUTH') {
        console.log('You venture south.')
    } else if (action === 'MOVE_EAST') {
        console.log('You venture east.')
    } else {
        return false
    }

    return true
}

/**
 * Lets the player explore the city and encounter monsters.
 *
 * @param {Player} player - The player exploring the city.
 */
async function exploreCity(player) {
    console.log('You enter the mysterious streets of Cat City...')
    console.log('Use W/A/S/D to move. Enter Q to return to the main menu.')

    while (!player.isDefeated()) {
        console.log(`\nHealth: ${player.getHealth()}/${player.getMaxHealth()}`)
        console.log(`Level: ${player.getLevel()} | XP: ${player.getExperience()}`)
        console.log(`Healing potions: ${player.getHealingPotions()}`)

        output.write('Choose a direction (W/A/S/D) or Q to quit exploring: ')
        const input = await readKeypress()
        console.log()

        if (input.toLowerCase() === 'q') {
            console.log('You leave the streets and return to the main menu.')
            return
        }

        const action = getGameAction(input)

        if (!movePlayer(action)) {
            console.log('Invalid direction. Please use W, A, S, or D.')
            continue
        }

        if (shouldEncounterMonster()) {
            const monster = new Monster()
            const combat = new Combat(player, monster)

            await runCombat(combat, player)

            if (player.isDefeated()) {
                return
            }
        }
    }
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

    output.write('Choose an option: ')
    const choice = await readKeypress()
    console.log()
    return choice
}


/**
 * Runs a combat encounter until either player/monster is defeated.
 *
 * @param {Combat} combat - Current combat encounter.
 * @param {Player} player - The player participating in combat.
 */
async function runCombat(combat, player) {
    while (!combat.isOver()) {

        console.log(`Health: ${player.getHealth()}/${player.getMaxHealth()}`)
        console.log(`Level: ${player.getLevel()} | XP: ${player.getExperience()}`)
        console.log(`Healing potions: ${player.getHealingPotions()}`)
        console.log(`Monster health: ${combat.getMonsterHealth()}`)
        console.log('1. Attack')
        console.log('2. Defend')
        console.log('3. Use healing potion')

        output.write('Choose an action:')
        const inputChoice = await readKeypress()
        console.log()
        const action = getGameAction(inputChoice)

        if (action === 'ATTACK') {
            const result = combat.attackMonster()

            console.log(`You deal ${result.damage} damage!`)

            if (!combat.isOver()) {
                const monsterResult = combat.monsterAttack()
                console.log(`The monster deals ${monsterResult.damage} damage!`)
            }

        } else if (action ==='DEFEND') {
            const result = combat.monsterAttack(true)
            console.log(`You defend! The monster deals ${result.damage} damage.`)

        } else if (action === 'USE_POTION') {
            const result = combat.useHealingPotion()

            if (result.used) {
                console.log('You used a healing potion and restored health!')
                console.log(`Health: ${result.playerHealth}/${player.getMaxHealth()}`)
                console.log(`Potions remaining: ${result.healingPotions}`)
            } else {
                console.log('You cannot use a healing potion right now!')
            }
        } else {
            console.log('Invalid action. Choose 1, 2, or 3.')
        }

    }

    if (player.isDefeated()) {
        console.log('You have been defeated! Your adventure is over.')
    } else {
        console.log('You defeated the monster!')
    }
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
            await exploreCity(player)
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
