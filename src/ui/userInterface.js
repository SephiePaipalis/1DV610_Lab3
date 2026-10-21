/**
 * ANSI styles used throughout the terminal game.
 */
export const styles = {
    reset: '\x1b[0m',
    pink: '\x1b[95m',
    magenta: '\x1b[35m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    bold: '\x1b[1m'
}

/**
 * Displays a message to the player.
 *
 * @param {string} message - The message to display.
 */
export function displayMessage(message) {
    console.log(message)
}