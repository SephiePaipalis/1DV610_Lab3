import { stdout as output } from 'node:process'
import { Shop } from '../Shop.js'

export async function handleShopEncounter(player, { readKeypress }) {
    const shop = new Shop()

    console.log('\nYou discover a small shop tucked away in an alley!')
    await visitShop(player, shop, readKeypress)
}

/**
 * Displays shop menu and lets the player buy items.
 *
 * @param {Player} player - The player visiting the shop.
 * @param {Shop} shop - The shop the player is visiting.
 */
async function visitShop(player, shop, readKeypress) {
    console.log("\n||=$$$=|| THE CAT'S CAULDRON ||=$$$=||")
    console.log("Welcome to the Shop!")

    let shopping = true

    while (shopping) {
        console.log(`\nYour gold: ${player.getGold()}`)
        console.log("Your healing potions: " + player.getHealingPotions())

        const stock = shop.getStock()

        for (let i = 0; i < stock.length; i++) {
            console.log(`${i + 1}. ${stock[i].name} - ${stock[i].price} gold`)
        }

        console.log("Q. Leave shop")
        output.write("Choose an item to buy: ")

        const choice = await readKeypress()
        console.log()

        if (choice.toLowerCase() === 'q') {
            shopping = false
        } else {
            const itemIndex = Number(choice) - 1

            if (itemIndex >= 0 && itemIndex < stock.length) {
                const purchased = shop.buyItem(stock[itemIndex].name, player)

                if (purchased) {
                    console.log(`You bought a ${stock[itemIndex].name}!`)
                } else {
                    console.log("You don't have enough gold for that item.")
                }
            } else {
                console.log("Invalid choice. Please select an item or Q to leave.")
            }
        }
    }

    console.log("You leave the shop.")
}