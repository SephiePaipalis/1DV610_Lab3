import { stdout as output } from 'node:process'
import { Shop } from '../Shop.js'
import { styles } from '../ui/userInterface.js'

export async function handleShopEncounter(player, { readKeypress }) {
    const shop = new Shop()

    console.log()
    console.log(`${styles.magenta}================================${styles.reset}`)
    console.log(`${styles.cyan}You discover a small shop tucked away in an alley!${styles.reset}`)
    console.log(`${styles.magenta}================================${styles.reset}`)

    await visitShop(player, shop, readKeypress)
}

/**
 * Displays shop menu and lets the player buy items.
 *
 * @param {Player} player - The player visiting the shop.
 * @param {Shop} shop - The shop the player is visiting.
 */
async function visitShop(player, shop, readKeypress) {
    console.log()
    console.log(`${styles.magenta}${styles.bold}====== THE CAT'S CAULDRON ======${styles.reset}`)
    console.log(`${styles.cyan}Welcome, traveller! Take a look at our wares.${styles.reset}`)

    let shopping = true

    while (shopping) {
        console.log()
        console.log(`${styles.magenta}---------- YOUR PURSE ----------${styles.reset}`)
        console.log(`${styles.yellow}Gold:${styles.reset} ${player.getGold()}`)
        console.log(`${styles.green}Healing potions:${styles.reset} ${player.getHealingPotions()}`)
        console.log(`${styles.magenta}--------------------------------${styles.reset}`)
        console.log()

        const stock = shop.getStock()

        for (let i = 0; i < stock.length; i++) {
            console.log(
                `${styles.yellow}${i + 1}.${styles.reset} ${stock[i].name} - ${styles.green}${stock[i].price} gold${styles.reset}`
            )
        }

        console.log()
        console.log(`${styles.cyan}Q.${styles.reset} Leave shop`)
        output.write(`${styles.yellow}Choose an item to buy: ${styles.reset}`)

        const choice = await readKeypress()
        console.log()

        if (choice.toLowerCase() === 'q') {
            shopping = false
        } else {
            const itemIndex = Number(choice) - 1

            if (itemIndex >= 0 && itemIndex < stock.length) {
                const purchased = shop.buyItem(stock[itemIndex].name, player)

                if (purchased) {
                    console.log(`${styles.green}You bought a ${stock[itemIndex].name}!${styles.reset}`)
                } else {
                    console.log(`${styles.red}You don't have enough gold for that item.${styles.reset}`)
                }
            } else {
                console.log(`${styles.red}Invalid choice. Please select an item or Q to leave.${styles.reset}`)
            }
        }
    }

    console.log(`${styles.cyan}You leave the shop. Safe travels!${styles.reset}`)
}
