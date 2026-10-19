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
    const reset = '\x1b[0m'
    const cyan = '\x1b[36m'

    if (action === 'MOVE_NORTH') {
        console.log(`\n${cyan}You venture north.${reset}`)
    } else if (action === 'MOVE_WEST') {
        console.log(`\n${cyan}You venture west.${reset}`)
    } else if (action === 'MOVE_SOUTH') {
        console.log(`\n${cyan}You venture south.${reset}`)
    } else if (action === 'MOVE_EAST') {
        console.log(`\n${cyan}You venture east.${reset}`)
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
    const reset = '\x1b[0m'
    const cyan = '\x1b[36m'
    const green = '\x1b[32m'
    const yellow = '\x1b[33m'
    const magenta = '\x1b[35m'
    const red = '\x1b[31m'
    const bold = '\x1b[1m'

    console.log()
    console.log(`${magenta}${bold}========== CAT CITY ==========${reset}`)
    console.log(`${cyan}You enter the mysterious streets of Cat City...${reset}`)
    console.log(`${yellow}Use W/A/S/D to move. Press Q to return to the main menu.${reset}`)

    while (!player.isDefeated()) {
        console.log()
        console.log(`${magenta}---------- YOUR STATUS ----------${reset}`)
        console.log(`${green}Health:${reset} ${player.getHealth()}/${player.getMaxHealth()}`)
        console.log(`${cyan}Level:${reset} ${player.getLevel()} | XP: ${player.getExperience()}`)
        console.log(`${green}Healing potions:${reset} ${player.getHealingPotions()}`)
        console.log(`${yellow}Gold:${reset} ${player.getGold()}`)
        console.log(`${magenta}---------------------------------${reset}`)
        console.log()

        output.write(`${yellow}Choose a direction (W/A/S/D) or Q to quit exploring: ${reset}`)
        const input = await readKeypress()
        console.log()

        if (input.toLowerCase() === 'q') {
            console.log(`${cyan}You leave the streets and return to the main menu.${reset}`)
            return
        }

        const action = getGameAction(input)

        if (!movePlayer(action)) {
            console.log(`${red}Invalid direction. Please use W, A, S, or D.${reset}`)
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

