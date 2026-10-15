
/**
 * Represents the player and manages their health.
 */
export class Player {
    #health

    /**
     * Creates a player with specified starting health.
     *
     * @param {number} health - Player starting health.
     */
    constructor(health = 20) {
        this.#health = Math.max(0, health)
    }

    /**
     * Reduces player health without allowing it below zero.
     *
     * @param {number} amount - Amount of damage received.
     */
    takeDamage(amount) {
        this.#health = Math.max(0, this.#health - amount)
    }

    /**
     * Gets current player health.
     *
     * @returns {number} The player's remaining health.
     */
    getHealth() {
        return this.#health
    }

    /**
     * Checks whether the player has run out of health.
     *
     * @returns {boolean} True if player health is zero.
     */
    isDefeated() {
        return this.#health === 0
    }
}
