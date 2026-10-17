import { Combat } from '../Combat.js'
import { Monster } from '../Monster.js'

/**
 * Handles a monster encounter, including combat and rewards.
 *
 * @param {Player} player - The player encountering the monster.
 * @param {Function} runCombat - Function that runs the combat interaction.
 */
export async function handleMonsterEncounter(player, { runCombat, readKeypress }) {
    const monster = Monster.createRandom()
    const combat = new Combat(player, monster)

    await runCombat(combat, player, readKeypress)

    if (player.isDefeated()) {
        return
    }

    player.recordCombatVictory()

    const previousLevel = player.getLevel()
    const goldReward = monster.getGoldReward()
    const experienceReward = monster.getExperienceReward()

    player.gainExperience(experienceReward)
    console.log(`You earned ${experienceReward} XP!`)
    console.log(`Total XP: ${player.getExperience()}`)

    player.earnGold(goldReward)
    console.log(`You earned ${goldReward} gold!`)

    if (player.getLevel() > previousLevel) {
        console.log('You leveled up!')
        console.log(`You are now level ${player.getLevel()}!`)
        console.log(
            `Your maximum health has increased to ${player.getMaxHealth()}!`
        )
    }
}
