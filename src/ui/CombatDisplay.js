import { stdout as output } from 'node:process'
import { getGameAction } from '../GameInput.js'
import { Combat } from '../Combat.js'
import { Player } from '../Player.js'
import { styles } from './userInterface.js'

/**
 * Displays the combat status and available actions.
 *
 * @param {Combat} combat - Current combat encounter.
 * @param {Player} player - The player participating in combat.
 */
export function displayCombatStatus(combat, player) {
    console.log()
    console.log(`${styles.red}${styles.bold}========== COMBAT ==========${styles.reset}`)
    console.log(`${styles.cyan}Your HP:${styles.reset} ${player.getHealth()}/${player.getMaxHealth()}`)
    console.log(`${styles.cyan}Level:${styles.reset} ${player.getLevel()} | XP: ${player.getExperience()}`)
    console.log(`${styles.green}Healing potions:${styles.reset} ${player.getHealingPotions()}`)
    console.log(`${styles.red}Monster HP:${styles.reset} ${combat.getMonsterHealth()}`)
    console.log()
    console.log(`${styles.yellow}1.${styles.reset} Attack`)
    console.log(`${styles.yellow}2.${styles.reset} Defend`)
    console.log(`${styles.yellow}3.${styles.reset} Use healing potion`)
    console.log()
}

/**
 * Displays a combat message.
 *
 * @param {string} message - The message to display.
 */
function displayCombatMessage(message) {
    console.log(message)
}

/**
 * Displays the final combat result.
 *
 * @param {boolean} playerDefeated - Whether the player was defeated.
 */
export function displayCombatResult(playerDefeated) {
    console.log()

    if (playerDefeated) {
        console.log(`${styles.red}${styles.bold}You have been defeated! Your adventure is over.${styles.reset}`)
    } else {
        console.log(`${styles.green}${styles.bold}You defeated the monster!${styles.reset}`)
    }

    console.log(`${styles.red}${styles.bold}============================${styles.reset}`)
}

/**
 * Runs a combat encounter until either the player or monster is defeated.
 *
 * @param {Combat} combat - Current combat encounter.
 * @param {Player} player - The player participating in combat.
 * @param {Function} readKeypress - Function that reads player input.
 */
export async function runCombat(combat, player, readKeypress) {
    while (!combat.isOver()) {
        displayCombatStatus(combat, player)

        output.write(`${styles.yellow}Choose an action: ${styles.reset}`)
        const inputChoice = await readKeypress()
        console.log()

        const action = getGameAction(inputChoice)

        if (action === 'ATTACK') {
            const result = combat.attackMonster()

            displayCombatMessage(`${styles.green}You deal ${result.damage} damage!${styles.reset}`)

            if (!combat.isOver()) {
                const monsterResult = combat.monsterAttack()
                displayCombatMessage(`${styles.red}The monster deals ${monsterResult.damage} damage!${styles.reset}`)
            }
        } else if (action === 'DEFEND') {
            const result = combat.monsterAttack(true)
            displayCombatMessage(`${styles.cyan}You defend! The monster deals ${result.damage} damage.${styles.reset}`)
        } else if (action === 'USE_POTION') {
            const result = combat.useHealingPotion()

            if (result.used) {
                displayCombatMessage(`${styles.green}You used a healing potion and restored health!${styles.reset}`)
                displayCombatMessage(`Health: ${result.playerHealth}/${player.getMaxHealth()}`)
                displayCombatMessage(`Potions remaining: ${result.healingPotions}`)
            } else {
                displayCombatMessage(`${styles.red}You cannot use a healing potion right now!${styles.reset}`)
            }
        } else {
            displayCombatMessage(`${styles.red}Invalid action. Choose 1, 2, or 3.${styles.reset}`)
        }
    }

    displayCombatResult(player.isDefeated())
}
