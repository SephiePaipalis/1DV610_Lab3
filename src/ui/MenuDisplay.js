
import { styles } from './userInterface.js'

/**
 * Displays the main menu.
 */
export function displayMainMenu() {
    console.log()
    console.log(`${styles.magenta}================================${styles.reset}`)
    console.log(`${styles.cyan}       CAT CITY ADVENTURE${styles.reset}`)
    console.log(`${styles.magenta}================================${styles.reset}`)
    console.log(`${styles.yellow}             /\\_/\\\\${styles.reset}`)
    console.log(`${styles.yellow}            ( o.o )${styles.reset}`)
    console.log(`${styles.yellow}             > ^ <${styles.reset}`)
    console.log()
    console.log(`${styles.cyan}  1.${styles.reset} Start game`)
    console.log(`${styles.cyan}  2.${styles.reset} View instructions`)
    console.log(`${styles.cyan}  3.${styles.reset} Quit`)
    console.log()
}

/**
 * Displays the game instructions.
 */
export function displayInstructions() {
    console.log()
    console.log(`${styles.magenta}${styles.bold}================================${styles.reset}`)
    console.log(`${styles.cyan}          HOW TO PLAY${styles.reset}`)
    console.log(`${styles.magenta}${styles.bold}================================${styles.reset}`)
    console.log()
    console.log(`${styles.yellow}Your adventure${styles.reset}`)
    console.log('Explore Cat City and discover what its streets hold.')
    console.log()
    console.log(`${styles.yellow}Movement${styles.reset}`)
    console.log(`${styles.cyan}W${styles.reset} - Move north`)
    console.log(`${styles.cyan}A${styles.reset} - Move west`)
    console.log(`${styles.cyan}S${styles.reset} - Move south`)
    console.log(`${styles.cyan}D${styles.reset} - Move east`)
    console.log(`${styles.cyan}Q${styles.reset} - Leave exploration and return to the main menu`)
    console.log()
    console.log(`${styles.yellow}Survival${styles.reset}`)
    console.log('Watch your health during combat.')
    console.log('Use healing potions when you need them.')
    console.log('Visit shops to buy items with your gold.')
    console.log()
    console.log(`${styles.pink}Your goal${styles.reset}`)
    console.log('Explore the city and find a charming cat to become your mate!')
    console.log()
    console.log(`${styles.magenta}================================${styles.reset}`)
}

/**
 * Displays a message to the player.
 *
 * @param {string} message - The message to display.
 */
export function displayMessage(message) {
    console.log(message)
}
