/**
 * Represents the player and manages health, experience, levels and potions.
 */
export class Player {
    #health
    #maxHealth
    #experience
    #level
    #healingPotions
    #gold
    #combatVictories

    /**
     * Creates a player with specified starting health.
     *
     * @param {number} health - Player starting health.
     */
    constructor(health = 20) {
        this.#maxHealth = Math.max(0, health)
        this.#health = this.#maxHealth
        this.#experience = 0
        this.#level = 1
        this.#healingPotions = 3
        this.#gold = 10
        this.#combatVictories = 0
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
     * Gets the player's maximum health.
     *
     * @returns {number} The player's maximum health.
     */
    getMaxHealth() {
        return this.#maxHealth
    }

    /**
     * Checks whether the player has run out of health.
     *
     * @returns {boolean} True if player health is zero.
     */
    isDefeated() {
        return this.#health === 0
    }

    /**
     * Adds experience and increases the player's level.
     *
     * Every 30 experience points grants one level.
     *
     * @param {number} amount - Experience points earned.
     */
    gainExperience(amount) {
        if (amount <= 0) {
            return
        }

        this.#experience += amount

        while (this.#experience >= this.#level * 30) {
            this.#level++
            this.#maxHealth += 5
        }
    }

    /**
     * Gets the player's total experience.
     *
     * @returns {number} The player's total experience points.
     */
    getExperience() {
        return this.#experience
    }

    /**
     * Gets the player's current level.
     *
     * @returns {number} The player's level.
     */
    getLevel() {
        return this.#level
    }

    /**
     * Gets the number of remaining healing potions.
     *
     * @returns {number} The number of healing potions.
     */
    getHealingPotions() {
        return this.#healingPotions
    }

    /**
     * Adds healing potions to player inventory.
     * 
     * @param {*} amount - Number of potions to add.
     */
    addHealingPotions(amount) {
        if (amount <= 0) {
            return
        }

        this.#healingPotions += amount
    }

    /**
     * Uses a healing potion if the player can benefit from it.
     *
     * @returns {boolean} True if a potion was used, otherwise false.
     */
    useHealingPotion() {
        if (this.#healingPotions === 0 || this.#health === this.#maxHealth) {
            return false
        }

        this.#health = Math.min(this.#maxHealth, this.#health + 8)
        this.#healingPotions--

        return true
    }

    /**
    * Gets the player's current gold.
    *
    * @returns {number} The player's gold.
    */
    getGold() {
        return this.#gold
    }

    /**
     * Adds gold to the player's total.
     *
     * @param {number} amount - Amount of gold earned.
     */
    earnGold(amount) {
        if (amount <= 0) {
            return
        }

        this.#gold += amount
    }

    /**
     * Spends gold if the player can afford the cost.
     *
     * @param {number} amount - Amount of gold to spend.
     * @returns {boolean} - True if the gold was spent.
     */
    spendGold(amount) {
        if (amount <= 0 || this.#gold < amount) {
            return false
        }

        this.#gold -= amount
        return true
    }

    /**
     * Records a combat victory.
     */
    recordCombatVictory() {
        this.#combatVictories++
    }

    /**
     * Gets the number of combat victories.
     * 
     * @returns {number} - The number of combat victories.
     */
    getCombatVictories() {
        return this.#combatVictories
    }
}
