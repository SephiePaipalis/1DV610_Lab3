import { stdout as output } from 'node:process'
import { getGameAction } from './GameInput.js'
import { Combat } from './Combat.js'
import { Player } from './Player.js'

/**
 * Runs a combat encounter until either the player or monster is defeated.
 *
 * @param {Combat} combat - Current combat encounter.
 * @param {Player} player - The player participating in combat.
 * @param {Function} readKeypress - Function that reads player input.
 */
export async function runCombat(combat, player, readKeypress) {
    const reset = '\x1b[0m'
    const red = '\x1b[31m'
    const green = '\x1b[32m'
    const cyan = '\x1b[36m'
    const yellow = '\x1b[33m'
    const bold = '\x1b[1m'

    while (!combat.isOver()) {
        console.log()
        console.log(`${red}${bold}========== COMBAT ==========${reset}`)
        console.log(`${cyan}Your HP:${reset} ${player.getHealth()}/${player.getMaxHealth()}`)
        console.log(`${cyan}Level:${reset} ${player.getLevel()} | XP: ${player.getExperience()}`)
        console.log(`${green}Healing potions:${reset} ${player.getHealingPotions()}`)
        console.log(`${red}Monster HP:${reset} ${combat.getMonsterHealth()}`)
        console.log()
        console.log(`${yellow}1.${reset} Attack`)
        console.log(`${yellow}2.${reset} Defend`)
        console.log(`${yellow}3.${reset} Use healing potion`)
        console.log()

        output.write(`${yellow}Choose an action: ${reset}`)
        const inputChoice = await readKeypress()
        console.log()

        const action = getGameAction(inputChoice)

        if (action === 'ATTACK') {
            const result = combat.attackMonster()

            console.log(`${green}You deal ${result.damage} damage!${reset}`)

            if (!combat.isOver()) {
                const monsterResult = combat.monsterAttack()
                console.log(`${red}The monster deals ${monsterResult.damage} damage!${reset}`)
            }
        } else if (action === 'DEFEND') {
            const result = combat.monsterAttack(true)
            console.log(`${cyan}You defend! The monster deals ${result.damage} damage.${reset}`)
        } else if (action === 'USE_POTION') {
            const result = combat.useHealingPotion()

            if (result.used) {
                console.log(`${green}You used a healing potion and restored health!${reset}`)
                console.log(`Health: ${result.playerHealth}/${player.getMaxHealth()}`)
                console.log(`Potions remaining: ${result.healingPotions}`)
            } else {
                console.log(`${red}You cannot use a healing potion right now!${reset}`)
            }
        } else {
            console.log(`${red}Invalid action. Choose 1, 2, or 3.${reset}`)
        }
    }

    console.log()

    if (player.isDefeated()) {
        console.log(`${red}${bold}You have been defeated! Your adventure is over.${reset}`)
    } else {
        console.log(`${green}${bold}You defeated the monster!${reset}`)
    }

    console.log(`${red}${bold}============================${reset}`)
}

