/**
 * Represents a shop that sells items.
 */
export class Shop {
    #stock

    /**
     * Creates a new shop with initial stock.
     */
    constructor() {
        this.#stock = [
            { name: 'Healing Potion', price: 5 }
        ]
    }

    /**
     * Gets the items currently in stock.
     * 
     * @returns -
     */
    getStock() {
        return this.#stock.map(item => ({ ...item }))
    }

    buyItem(itemName, player) {
        const item = this.#stock.find(
            item => item.name === itemName
        )

        if (!item) {
            return false
        }

        if (!player.spendGold(item.price)) {
            return false
        }

        if (item.name === 'Healing Potion') {
            player.addHealingPotions(1)
            return true
        }

        return false
    }
}