import { RandomGenerator } from 'dice-rng-toolkit'

const rng = new RandomGenerator()

/**
 * Represents a monster and manages its health and combat rewards.
 */
export class Monster {
    static #monsterTypes = [
        {
            name: 'Sewer Rat',
            health: 8,
            minAttackDamage: 1,
            maxAttackDamage: 4,
            experienceReward: 5
        },
        {
            name: 'Shady Cat',
            health: 12,
            minAttackDamage: 1,
            maxAttackDamage: 6,
            experienceReward: 10
        },
        {
            name: 'Burly Cat',
            health: 18,
            minAttackDamage: 3,
            maxAttackDamage: 8,
            experienceReward: 15
        }
    ]

    #name
    #health
    #minAttackDamage
    #maxAttackDamage
    #experienceReward

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
        } else {
            this.#name = options.name ?? 'Shadow Cat'
            this.#health = Math.max(0, options.health ?? 12)
            this.#minAttackDamage = Math.max(0, options.minAttackDamage ?? 1)
            this.#maxAttackDamage = Math.max(
                this.#minAttackDamage,
                options.maxAttackDamage ?? 6
            )
            this.#experienceReward = Math.max(0, options.experienceReward ?? 10)
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

    getName() {
        return this.#name
    }

    getHealth() {
        return this.#health
    }

    getMinAttackDamage() {
        return this.#minAttackDamage
    }

    getMaxAttackDamage() {
        return this.#maxAttackDamage
    }

    getExperienceReward() {
        return this.#experienceReward
    }

    isDefeated() {
        return this.#health === 0
    }
}
