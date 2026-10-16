import { RandomGenerator, Dice } from 'dice-rng-toolkit'
import { Player } from './Player.js'
import { Monster } from './Monster.js'

const rng = new RandomGenerator()
const damageDie = new Dice(6)

/**
 * Manages player and monster health during combat.
 */
export class Combat {
    #player
    #monster

    /**
     * Creates new combat encounter with default values.
     */
    constructor(player = new Player(), monster = new Monster()) {
        this.#player = player
        this.#monster = monster

        console.log(`\nYou encountered a ${this.#monster.getName()}! It attacks!`)
    }


    /**
     * Player attack the monster.
     * 
     * Rolls damage die and reduces monster health.
     * 
     * @returns -
     */
    attackMonster() {
        const damage = damageDie.roll(rng)
        this.#monster.takeDamage(damage)

        return {
            damage,
            monsterHealth: this.#monster.getHealth()
        }
    }

    /**
     * Monster attack the player.
     * 
     * When player is defending, incoming damage is halved and rounded up.
     * 
     * @param {boolean} isDefending - True if player is defending.
     * @returns -
     */
    monsterAttack(isDefending = false) {
        const minDamage = this.#monster.getMinAttackDamage()
        const maxDamage = this.#monster.getMaxAttackDamage()
        const damageRange = new Dice(maxDamage - minDamage + 1)
        const damage = damageRange.roll(rng) + minDamage - 1
        const actualDamage = isDefending ? Math.ceil(damage / 2) : damage

        this.#player.takeDamage(actualDamage)

        return {
            damage: actualDamage,
            playerHealth: this.#player.getHealth()
        }
    }


    /**
     * Uses a healing potion during combat.
     *
     * @returns {{ used: boolean, playerHealth: number, healingPotions: number }}
     */
    useHealingPotion() {
        const used = this.#player.useHealingPotion()

        return {
            used,
            playerHealth: this.#player.getHealth(),
            healingPotions: this.#player.getHealingPotions()
        }
    }

    /**
     * Get current player health.
     * 
     * @returns {number} Player's remaining health.
     */
    getPlayerHealth() {
        return this.#player.getHealth()
    }

    /**
     * Get current monster health.
     * 
     * @returns {number} Monster's remaining health.
     */
    getMonsterHealth() {
        return this.#monster.getHealth()
    }

    /**
     * Checks if either combatant has run out of health.
     * 
     * @returns {boolean} - True if player/monster has zero health.
     */
    isOver() {
        return this.#player.isDefeated() || this.#monster.isDefeated()
    }
}
