import { stdout as output } from 'node:process'
import { getGameAction } from './GameInput.js'
import { EncounterManager, EncounterRegistry, ENCOUNTERS } from './Encounters.js'
import { handleShopEncounter } from './encounters/ShopEncounter.js'
import { handleMonsterEncounter } from './encounters/MonsterEncounter.js'
import { handleMateEncounter } from './encounters/MateEncounter.js'
import { Player } from './Player.js'
import { runCombat } from './CombatInteraction.js'

const encounterManager = new EncounterManager(ENCOUNTERS)
const encounterRegistry = new EncounterRegistry()

encounterRegistry.register('SHOP', handleShopEncounter)
encounterRegistry.register('MONSTER', handleMonsterEncounter)
encounterRegistry.register('MATE', handleMateEncounter)

/**
 * Displays the message for a movement action.
 *
 * @param {string} action - The movement action.
 * @returns {boolean} True if the action was a movement action.
 */
function movePlayer(action) {
    if (action === 'MOVE_NORTH') {
        console.log('\nYou venture north.')
    } else if (action === 'MOVE_WEST') {
        console.log('\nYou venture west.')
    } else if (action === 'MOVE_SOUTH') {
        console.log('\nYou venture south.')
    } else if (action === 'MOVE_EAST') {
        console.log('\nYou venture east.')
    } else {
        return false
    }

    return true
}

/**
 * Lets the player explore the city and encounter events.
 *
 * @param {Player} player - The player exploring the city.
 * @param {Function} readKeypress - Function that reads player input.
 */
export async function exploreCity(player, readKeypress) {
    console.log('You enter the mysterious streets of Cat City...')
    console.log('Use W/A/S/D to move. Enter Q to return to the main menu.')

    while (!player.isDefeated()) {
        console.log(`\nHealth: ${player.getHealth()}/${player.getMaxHealth()}`)
        console.log(`Level: ${player.getLevel()} | XP: ${player.getExperience()}`)
        console.log(`Healing potions: ${player.getHealingPotions()}`)
        console.log(`Gold: ${player.getGold()}`)

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

        const encounter = encounterManager.getRandomEncounter(
            player.getCombatVictories()
        )

        const encounterResult = await encounterRegistry.execute(
            encounter,
            player,
            {
                readKeypress,
                runCombat
            }
        )

        if (encounter === 'MATE' && encounterResult === true) {
            return true
        }

        if (player.isDefeated()) {
            return false
        }
    }
}
