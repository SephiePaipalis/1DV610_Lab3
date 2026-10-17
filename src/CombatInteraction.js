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
    while (!combat.isOver()) {
        console.log(`Your HP: ${player.getHealth()}/${player.getMaxHealth()}`)
        console.log(`Level: ${player.getLevel()} | XP: ${player.getExperience()}`)
        console.log(`Healing potions: ${player.getHealingPotions()}`)
        console.log(`Monster HP: ${combat.getMonsterHealth()}`)
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
        } else if (action === 'DEFEND') {
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
