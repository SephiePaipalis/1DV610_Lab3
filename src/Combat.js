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
    constructor() {
        this.#player = new Player()
        this.#monster = new Monster()
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
        const damage = damageDie.roll(rng)
        const actualDamage = isDefending ? Math.ceil(damage / 2) : damage

        this.#player.takeDamage(actualDamage)

        return {
            damage: actualDamage,
            playerHealth: this.#player.getHealth()
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
