import { stdout as output } from 'node:process'
import { getGameAction } from './GameInput.js'
import { EncounterManager, EncounterRegistry, ENCOUNTERS } from './Encounters.js'
import { handleShopEncounter } from './encounters/ShopEncounter.js'
import { handleMonsterEncounter } from './encounters/MonsterEncounter.js'
import { handleMateEncounter } from './encounters/MateEncounter.js'
import { Player } from './Player.js'
import { runCombat } from './CombatInteraction.js'
import { styles } from './ui/userInterface.js'

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
        console.log(`\n${styles.cyan}You venture north.${styles.reset}`)
    } else if (action === 'MOVE_WEST') {
        console.log(`\n${styles.cyan}You venture west.${styles.reset}`)
    } else if (action === 'MOVE_SOUTH') {
        console.log(`\n${styles.cyan}You venture south.${styles.reset}`)
    } else if (action === 'MOVE_EAST') {
        console.log(`\n${styles.cyan}You venture east.${styles.reset}`)
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
    console.log()
    console.log(`${styles.magenta}${styles.bold}========== CAT CITY ==========${styles.reset}`)
    console.log(`${styles.cyan}You enter the streets of Cat City...${styles.reset}`)
    console.log(`${styles.yellow}Use W/A/S/D to move. Press Q to return to the main menu.${styles.reset}`)

    while (!player.isDefeated()) {
        console.log()
        console.log(`${styles.magenta}---------- YOUR STATUS ----------${styles.reset}`)
        console.log(`${styles.green}Health:${styles.reset} ${player.getHealth()}/${player.getMaxHealth()}`)
        console.log(`${styles.cyan}Level:${styles.reset} ${player.getLevel()} | XP: ${player.getExperience()}`)
        console.log(`${styles.green}Healing potions:${styles.reset} ${player.getHealingPotions()}`)
        console.log(`${styles.yellow}Gold:${styles.reset} ${player.getGold()}`)
        console.log(`${styles.magenta}---------------------------------${styles.reset}`)
        console.log()

        output.write(`${styles.yellow}Choose a direction (W/A/S/D) or Q to quit exploring: ${styles.reset}`)
        const input = await readKeypress()
        console.log()

        if (input.toLowerCase() === 'q') {
            console.log(`${styles.cyan}You leave the streets and return to the main menu.${styles.reset}`)
            return
        }

        const action = getGameAction(input)

        if (!movePlayer(action)) {
            console.log(`${styles.red}Invalid direction. Please use W, A, S, or D.${styles.reset}`)
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


