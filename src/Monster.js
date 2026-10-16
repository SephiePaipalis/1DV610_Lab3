import { RandomGenerator } from 'dice-rng-toolkit'

const rng = new RandomGenerator()

/**
 * Represents a monster and manages its stats and combat rewards.
 */
export class Monster {
    static #monsterTypes = [
        {
            name: 'Sewer Rat',
            health: 8,
            minAttackDamage: 1,
            maxAttackDamage: 4,
            experienceReward: 5,
            goldReward: 3
        },
        {
            name: 'Shady Cat',
            health: 12,
            minAttackDamage: 1,
            maxAttackDamage: 6,
            experienceReward: 10,
            goldReward: 5
        },
        {
            name: 'Burly Cat',
            health: 18,
            minAttackDamage: 3,
            maxAttackDamage: 8,
            experienceReward: 15,
            goldReward: 10
        }
    ]

    #name
    #health
    #minAttackDamage
    #maxAttackDamage
    #experienceReward
    #goldReward

    /**
     * Creates a monster with configurable properties.
     *
     * @param {number|object} options - Starting health or monster settings.
     */
    constructor(options = 12) {
        if (typeof options === 'number') {
            this.#name = 'Shadow Cat'
            this.#health = Math.max(0, options)
            this.#minAttackDamage = 1
            this.#maxAttackDamage = 6
            this.#experienceReward = 10
            this.#goldReward = 5
        } else {
            this.#name = options.name ?? 'Shadow Cat'
            this.#health = Math.max(0, options.health ?? 12)
            this.#minAttackDamage = Math.max(0, options.minAttackDamage ?? 1)
            this.#maxAttackDamage = Math.max(
                this.#minAttackDamage,
                options.maxAttackDamage ?? 6
            )
            this.#experienceReward = Math.max(0, options.experienceReward ?? 10)
            this.#goldReward = Math.max(0, options.goldReward ?? 5)
        }
    }

    /**
     * Creates a randomly selected monster.
     *
     * @returns {Monster} A newly created monster.
     */
    static createRandom() {
        const index = Math.floor(rng.nextFloat() * this.#monsterTypes.length)
        const options = this.#monsterTypes[index]

        return new Monster(options)
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
     * Get monster name.
     * 
     * @returns {string} - The name of the monster.
     */
    getName() {
        return this.#name
    }

    /**
     * Get current monster health.
     * 
     * @returns {number} - Monster's remaining health.
     */
    getHealth() {
        return this.#health
    }

    /**
     * Gets the minimum damage the monster can deal.
     * 
     * @returns {number} - Minimum attack damage.
     */
    getMinAttackDamage() {
        return this.#minAttackDamage
    }

    /**
     * Gets the maximum damage the monster can deal.
     * 
     * @returns {number} - Maximum attack damage.
     */
    getMaxAttackDamage() {
        return this.#maxAttackDamage
    }

    /**
     * Gets the exp reward when defeating a monster.
     * 
     * @returns {number} - The exp points earned.
     */
    getExperienceReward() {
        return this.#experienceReward
    }

    /**
     * Gets the gold reward when defeathing a monster.
     * 
     * @returns {number} - The gold earned.
     */
    getGoldReward() {
        return this.#goldReward
    }

    /**
     * Checks if the monster has been defeated.
     * 
     * @returns {boolean} - True if monster health is zero.
     */
    isDefeated() {
        return this.#health === 0
    }
}
