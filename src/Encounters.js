import { RandomGenerator } from 'dice-rng-toolkit'

export const ENCOUNTERS = [
    { type: 'SHOP', chance: 0.1 },
    { type: 'MONSTER', chance: 0.2 }
]

/**
 * Selects at most one random encounter at a time.
 */
export class EncounterManager {
    #rng
    #encounters

    /**
     * Creates an encounter manager.
     *
     * @param {Array<{type: string, chance: number}>} encounters
     *        The encounter types and their probabilities.
     */
    constructor(encounters) {
        this.#rng = new RandomGenerator()
        this.#encounters = encounters.map(encounter => ({
            type: encounter.type,
            chance: encounter.chance
        }))
    }

    /**
     * Selects an encounter, or null if none occurs.
     *
     * @param {number} combatVictories - Number of combat victories.
     * @returns {string|null} The encounter type, or null.
     */
    getRandomEncounter(combatVictories = 0) {
        const encounters = [...this.#encounters]

        if (combatVictories > 2) {
            encounters.push({ type: 'MATE', chance: 0.25 })
        }

        const roll = this.#rng.nextFloat()
        let cumulativeChance = 0

        for (const encounter of encounters) {
            cumulativeChance += encounter.chance

            if (roll < cumulativeChance) {
                return encounter.type
            }
        }

        return null
    }
}


/**
 * Registers and executes encounter handlers.
 */
export class EncounterRegistry {
    #handlers

    constructor() {
        this.#handlers = new Map()
    }

    /**
     * Registers a handler for an encounter type.
     *
     * @param {string} type - The encounter type.
     * @param {Function} handler - The function that handles it.
     */
    register(type, handler) {
        if (this.#handlers.has(type)) {
            throw new Error(`Handler already registered for: ${type}`)
        }

        this.#handlers.set(type, handler)
    }

    /**
     * Executes the handler for an encounter.
     *
     * @param {string|null} type - The selected encounter type.
     * @param {*} args - Arguments passed to the handler.
     * @returns {*} The handler result, or undefined if no encounter.
     */
    async execute(type, ...args) {
        if (type === null) {
            return
        }

        const handler = this.#handlers.get(type)

        if (!handler) {
            throw new Error(`No handler registered for: ${type}`)
        }

        return await handler(...args)
    }
}

