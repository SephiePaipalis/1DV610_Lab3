import { RandomGenerator, Dice } from 'dice-rng-toolkit'

const rng = new RandomGenerator()
const damageDie = new Dice(6)

/**
 * Manages player and monster health during combat.
 */
export class Combat {
    #playerHealth
    #monsterHealth

    /**
     * Creates new combat encounter with default values.
     */
    constructor() {
        this.#playerHealth = 20
        this.#monsterHealth = 12
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
        this.#monsterHealth = Math.max(0, this.#monsterHealth - damage)

        return {
            damage,
            monsterHealth: this.#monsterHealth
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
        const damage = damageDie.roll(rng)
        const actualDamage = isDefending ? Math.ceil(damage / 2) : damage

        this.#playerHealth = Math.max(0, this.#playerHealth - actualDamage)

        return {
            damage: actualDamage,
            playerHealth: this.#playerHealth
        }
    }

    /**
     * Get current player health.
     * 
     * @returns {number} Player's remaining health.
     */
    getPlayerHealth() {
        return this.#playerHealth
    }

    /**
     * Get current monster health.
     * 
     * @returns {number} Monster's remaining health.
     */
    getMonsterHealth() {
        return this.#monsterHealth
    }

    /**
     * Checks if either combatant has run out of health.
     * 
     * @returns {boolean} - True if player/monster has zero health.
     */
    isOver() {
        return this.#playerHealth <= 0 || this.#monsterHealth <= 0
    }
}
