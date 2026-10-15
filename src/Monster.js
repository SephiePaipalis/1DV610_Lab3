/**
 * Represents a monster and manages its health.
 */
export class Monster {
    #health

    /**
     * Creates a monster with specified starting health.
     *
     * @param {number} health - Monster starting health.
     */
    constructor(health = 12) {
        this.#health = Math.max(0, health)
    }

    /**
     * Reduces monster health without allowing it below zero.
     *
     * @param {number} amount - Amount of damage received.
     */
    takeDamage(amount) {
        this.#health = Math.max(0, this.#health - amount)
    }

    /**
     * Gets current monster health.
     *
     * @returns {number} The monster's remaining health.
     */
    getHealth() {
        return this.#health
    }

    /**
     * Checks whether the monster has run out of health.
     *
     * @returns {boolean} True if monster health is zero.
     */
    isDefeated() {
        return this.#health === 0
    }
}
