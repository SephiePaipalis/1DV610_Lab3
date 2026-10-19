import { RandomGenerator } from 'dice-rng-toolkit'
import { styles } from '../ui/userInterface.js'

const rng = new RandomGenerator()

/**
 * Handles the mate encounter.
 *
 * @param {Player} player - The player meeting the mate.
 * @param {Function} readKeypress - Function that reads player input.
 * @returns {boolean} True if the player found a mate.
 */
export async function handleMateEncounter(player, { readKeypress }) {
    console.log()
    console.log(`${styles.pink}${styles.bold}====================================${styles.reset}`)
    console.log(`${styles.pink}       ♥ A SPECIAL ENCOUNTER ♥${styles.reset}`)
    console.log(`${styles.pink}${styles.bold}====================================${styles.reset}`)
    console.log()
    console.log(`${styles.pink}             /\\_/\\\\${styles.reset}`)
    console.log(`${styles.pink}            ( o.o )  ♥${styles.reset}`)
    console.log(`${styles.pink}             > ^ <${styles.reset}`)
    console.log()
    console.log(`${styles.cyan}You encounter a charming cat!${styles.reset}`)
    console.log(`${styles.magenta}Perhaps this is the one you've been searching for...${styles.reset}`)
    console.log()
    console.log(`${styles.yellow}1.${styles.reset} ${styles.pink}Try to seduce ♥${styles.reset}`)
    console.log(`${styles.yellow}2.${styles.reset} ${styles.cyan}Back away shyly${styles.reset}`)
    console.log()

    while (true) {
        const choice = await readKeypress()
        console.log()

        if (choice === '1') {
            if (rng.nextFloat() < 0.25) {
                console.log(`${styles.pink}${styles.bold}♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥${styles.reset}`)
                console.log()
                console.log(`${styles.green}${styles.bold}CONGRATULATIONS! YOU FOUND A MATE!${styles.reset}`)
                console.log()
                console.log(`${styles.pink}             /\\_/\\\\${styles.reset}`)
                console.log(`${styles.pink}            ( ♥.♥ )${styles.reset}`)
                console.log(`${styles.pink}             > ^ <${styles.reset}`)
                console.log()
                console.log(`${styles.green}Love is in the air! Thank you for playing!${styles.reset}`)
                console.log(`${styles.pink}${styles.bold}♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥${styles.reset}`)
                return true
            }

            console.log(`${styles.red}The mate says no. Better luck next time!${styles.reset}`)
            console.log(`${styles.cyan}Keep exploring. Love might find you again!${styles.reset}`)
            return false
        }

        if (choice === '2') {
            console.log(`${styles.cyan}You quietly back away and continue exploring.${styles.reset}`)
            return false
        }

        console.log(`${styles.red}Invalid choice. Please select 1 or 2.${styles.reset}`)
    }
}


