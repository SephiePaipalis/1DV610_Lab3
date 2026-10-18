import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleShopEncounter } from '../src/encounters/ShopEncounter.js'
import { Player } from '../src/Player.js'

test('Player can buy a potion during a shop encounter', async () => {
    const player = new Player()
    const choices = ['1', 'q']

    await handleShopEncounter(player, {
        readKeypress: async () => choices.shift()
    })

    assert.equal(player.getGold(), 5)
    assert.equal(player.getHealingPotions(), 4)
})

test('Player can leave the shop without buying anything', async () => {
    const player = new Player()

    await handleShopEncounter(player, {
        readKeypress: async () => 'q'
    })

    assert.equal(player.getGold(), 10)
    assert.equal(player.getHealingPotions(), 3)
})

test('Invalid shop choice does not change player resources', async () => {
    const player = new Player()
    const choices = ['x', 'q']

    await handleShopEncounter(player, {
        readKeypress: async () => choices.shift()
    })

    assert.equal(player.getGold(), 10)
    assert.equal(player.getHealingPotions(), 3)
})

test('Player can continue shopping after an unsuccessful purchase', async () => {
    const player = new Player()
    player.spendGold(8)

    const choices = ['1', 'q']
    let inputCount = 0

    await handleShopEncounter(player, {
        readKeypress: async () => {
            inputCount++
            return choices.shift()
        }
    })

    assert.equal(inputCount, 2)
    assert.equal(player.getGold(), 2)
    assert.equal(player.getHealingPotions(), 3)
})
