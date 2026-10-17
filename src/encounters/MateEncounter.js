import { RandomGenerator } from 'dice-rng-toolkit'

const rng = new RandomGenerator()

/**
 * Handles the mate encounter.
 *
 * @param {Player} player - The player meeting the mate.
 * @param {Function} readKeypress - Function that reads player input.
 * @returns {boolean} True if the player found a mate.
 */
export async function handleMateEncounter(player, { readKeypress }) {
    console.log('\nYou encounter a charming cat!')
    console.log('1. Try to seduce.')
    console.log('2. Back away.')

    while (true) {
        const choice = await readKeypress()
        console.log()

        if (choice === '1') {
            if (rng.nextFloat() < 0.25) {
                console.log(
                    'Congratulations! You found a mate! Thank you for playing!'
                )
                return true
            }

            console.log('The mate says no. Better luck next time!')
            return false
        }

        if (choice === '2') {
            console.log('You quietly back away and continue exploring.')
            return false
        }

        console.log('Invalid choice. Please select 1 or 2.')
    }
}
