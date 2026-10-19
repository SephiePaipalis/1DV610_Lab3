import { stdout as output } from 'node:process'
import { getGameAction } from './GameInput.js'
import { Combat } from './Combat.js'
import { Player } from './Player.js'
import { styles } from './ui/userInterface.js'

/**
 * Runs a combat encounter until either the player or monster is defeated.
 *
 * @param {Combat} combat - Current combat encounter.
 * @param {Player} player - The player participating in combat.
 * @param {Function} readKeypress - Function that reads player input.
 */
export async function runCombat(combat, player, readKeypress) {
    while (!combat.isOver()) {
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

        output.write(`${styles.yellow}Choose an action: ${styles.reset}`)
        const inputChoice = await readKeypress()
        console.log()

        const action = getGameAction(inputChoice)

        if (action === 'ATTACK') {
            const result = combat.attackMonster()

            console.log(`${styles.green}You deal ${result.damage} damage!${styles.reset}`)

            if (!combat.isOver()) {
                const monsterResult = combat.monsterAttack()
                console.log(`${styles.red}The monster deals ${monsterResult.damage} damage!${styles.reset}`)
            }
        } else if (action === 'DEFEND') {
            const result = combat.monsterAttack(true)
            console.log(`${styles.cyan}You defend! The monster deals ${result.damage} damage.${styles.reset}`)
        } else if (action === 'USE_POTION') {
            const result = combat.useHealingPotion()

            if (result.used) {
                console.log(`${styles.green}You used a healing potion and restored health!${styles.reset}`)
                console.log(`Health: ${result.playerHealth}/${player.getMaxHealth()}`)
                console.log(`Potions remaining: ${result.healingPotions}`)
            } else {
                console.log(`${styles.red}You cannot use a healing potion right now!${styles.reset}`)
            }
        } else {
            console.log(`${styles.red}Invalid action. Choose 1, 2, or 3.${styles.reset}`)
        }
    }

    console.log()

    if (player.isDefeated()) {
        console.log(`${styles.red}${styles.bold}You have been defeated! Your adventure is over.${styles.reset}`)
    } else {
        console.log(`${styles.green}${styles.bold}You defeated the monster!${styles.reset}`)
    }

    console.log(`${styles.red}${styles.bold}============================${styles.reset}`)
}


