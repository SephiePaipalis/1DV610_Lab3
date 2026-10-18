import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Player } from '../src/Player.js'

test('Player starts with the default stats', () => {
    const player = new Player()

    assert.equal(player.getHealth(), 20)
    assert.equal(player.getMaxHealth(), 20)
    assert.equal(player.getExperience(), 0)
    assert.equal(player.getLevel(), 1)
    assert.equal(player.getHealingPotions(), 3)
    assert.equal(player.getGold(), 10)
})

test('Player takes damage and loses health', () => {
    const player = new Player()

    player.takeDamage(5)

    assert.equal(player.getHealth(), 15)
})

test('Player health cannot fall below zero', () => {
    const player = new Player()

    player.takeDamage(100)

    assert.equal(player.getHealth(), 0)
    assert.equal(player.isDefeated(), true)
})

test('Player can use a healing potion', () => {
    const player = new Player()

    player.takeDamage(10)

    const used = player.useHealingPotion()

    assert.equal(used, true)
    assert.equal(player.getHealth(), 18)
    assert.equal(player.getHealingPotions(), 2)
})

test('Player cannot use a healing potion at full health', () => {
    const player = new Player()

    const used = player.useHealingPotion()

    assert.equal(used, false)
    assert.equal(player.getHealth(), 20)
    assert.equal(player.getHealingPotions(), 3)
})


test('Player can earn and spend gold', () => {
    const player = new Player()

    player.earnGold(10)

    assert.equal(player.getGold(), 20)
    assert.equal(player.spendGold(5), true)
    assert.equal(player.getGold(), 15)
})

test('Player cannot spend more gold than they have', () => {
    const player = new Player()

    assert.equal(player.spendGold(11), false)
    assert.equal(player.getGold(), 10)
})

test('Player gains experience', () => {
    const player = new Player()

    player.gainExperience(20)

    assert.equal(player.getExperience(), 20)
    assert.equal(player.getLevel(), 1)
})

test('Player levels up after reaching the experience requirement', () => {
    const player = new Player()

    player.gainExperience(30)

    assert.equal(player.getLevel(), 2)
    assert.equal(player.getMaxHealth(), 25)
})

test('Player records combat victories', () => {
    const player = new Player()

    player.recordCombatVictory()
    player.recordCombatVictory()

    assert.equal(player.getCombatVictories(), 2)
})
