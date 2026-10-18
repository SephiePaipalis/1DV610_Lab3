import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Shop } from '../src/Shop.js'
import { Player } from '../src/Player.js'

test('Shop provides a list of items for sale', () => {
    const shop = new Shop()
    const stock = shop.getStock()

    assert.equal(stock.length, 1)
    assert.equal(stock[0].name, 'Healing Potion')
    assert.equal(stock[0].price, 5)
})

test('Player can buy a hp potion', () => {
    const shop = new Shop()
    const player = new Player()

    const purchased = shop.buyItem('Healing Potion', player)

    assert.equal(purchased, true)
    assert.equal(player.getGold(), 5)
    assert.equal(player.getHealingPotions(), 4)
})

test('Player cannot buy an item without enough gold', () => {
    const shop = new Shop()
    const player = new Player()

    player.spendGold(8)

    const purchased = shop.buyItem('Healing Potion', player)

    assert.equal(purchased, false)
    assert.equal(player.getGold(), 2)
    assert.equal(player.getHealingPotions(), 3)
})

test('Player cannot buy an item that is not in stock', () => {
    const shop = new Shop()
    const player = new Player()

    const purchased = shop.buyItem('Magic Sword', player)

    assert.equal(purchased, false)
    assert.equal(player.getGold(), 10)
    assert.equal(player.getHealingPotions(), 3)
})
