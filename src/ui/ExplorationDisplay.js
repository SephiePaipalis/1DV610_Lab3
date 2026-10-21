import { styles } from './userInterface.js'

/**
 * Displays the exploration introduction.
 */
export function displayExplorationIntro() {
    console.log()
    console.log(`${styles.magenta}${styles.bold}========== CAT CITY ==========${styles.reset}`)
    console.log(`${styles.cyan}You enter the streets of Cat City...${styles.reset}`)
    console.log(`${styles.yellow}Use W/A/S/D to move. Press Q to return to the main menu.${styles.reset}`)
}

/**
 * Displays the player's current status.
 *
 * @param {object} player - The player exploring the city.
 */
export function displayPlayerStatus(player) {
    console.log()
    console.log(`${styles.magenta}---------- YOUR STATUS ----------${styles.reset}`)
    console.log(`${styles.green}Health:${styles.reset} ${player.getHealth()}/${player.getMaxHealth()}`)
    console.log(`${styles.cyan}Level:${styles.reset} ${player.getLevel()} | XP: ${player.getExperience()}`)
    console.log(`${styles.green}Healing potions:${styles.reset} ${player.getHealingPotions()}`)
    console.log(`${styles.yellow}Gold:${styles.reset} ${player.getGold()}`)
    console.log(`${styles.magenta}---------------------------------${styles.reset}`)
    console.log()
}

/**
 * Displays a movement message.
 *
 * @param {string} action - The movement action.
 * @returns {boolean} True if the action was a movement action.
 */
export function displayMovement(action) {
    if (action === 'MOVE_NORTH') {
        console.log(`\n${styles.cyan}You venture north.${styles.reset}`)
    } else if (action === 'MOVE_WEST') {
        console.log(`\n${styles.cyan}You venture west.${styles.reset}`)
    } else if (action === 'MOVE_SOUTH') {
        console.log(`\n${styles.cyan}You venture south.${styles.reset}`)
    } else if (action === 'MOVE_EAST') {
        console.log(`\n${styles.cyan}You venture east.${styles.reset}`)
    } else {
        return false
    }

    return true
}
