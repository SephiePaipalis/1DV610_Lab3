import { stdout as output } from 'node:process'
import { getGameAction } from './GameInput.js'
import { EncounterManager, EncounterRegistry, ENCOUNTERS } from './Encounters.js'
import { handleShopEncounter } from './encounters/ShopEncounter.js'
import { handleMonsterEncounter } from './encounters/MonsterEncounter.js'
import { handleMateEncounter } from './encounters/MateEncounter.js'
import { Player } from './Player.js'
import { runCombat } from './ui/CombatDisplay.js'
import { styles, displayMessage } from './ui/userInterface.js'
import {
    displayExplorationIntro,
    displayPlayerStatus,
    displayMovement
} from './ui/ExplorationDisplay.js'

const encounterManager = new EncounterManager(ENCOUNTERS)
const encounterRegistry = new EncounterRegistry()

encounterRegistry.register('SHOP', handleShopEncounter)
encounterRegistry.register('MONSTER', handleMonsterEncounter)
encounterRegistry.register('MATE', handleMateEncounter)

/**
 * Lets the player explore the city and encounter events.
 *
 * @param {Player} player - The player exploring the city.
 * @param {Function} readKeypress - Function that reads player input.
 */
export async function exploreCity(player, readKeypress) {
    
    displayExplorationIntro()

    while (!player.isDefeated()) {

        displayPlayerStatus(player)

        output.write(`${styles.yellow}Choose a direction (W/A/S/D) or Q to quit exploring: ${styles.reset}`)
        const input = await readKeypress()
        console.log()

        if (input.toLowerCase() === 'q') {
            displayMessage(`${styles.cyan}You leave the streets and return to the main menu.${styles.reset}`)
            return
        }

        const action = getGameAction(input)

        if (!displayMovement(action)) {
            displayMessage(`${styles.red}Invalid direction. Please use W, A, S, or D.${styles.reset}`)
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


