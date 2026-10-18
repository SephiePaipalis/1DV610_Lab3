import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Combat } from '../src/Combat.js'
import { Player } from '../src/Player.js'
import { Monster } from '../src/Monster.js'

test('Combat starts with correct player and monster health', () => {
    const player = new Player()
    const monster = new Monster(12)
    const combat = new Combat(player, monster)

    assert.equal(combat.getPlayerHealth(), 20)
    assert.equal(combat.getMonsterHealth(), 12)
    assert.equal(combat.isOver(), false)
})

test('Player attack reduces monster health', () => {
    const player = new Player()
    const monster = new Monster(100)
    const combat = new Combat(player, monster)

    const result = combat.attackMonster()

    assert.ok(result.damage >= 1 && result.damage <= 6)
    assert.equal(result.monsterHealth, 100 - result.damage)
    assert.equal(combat.getMonsterHealth(), result.monsterHealth)
})

test('Monster attack reduces player health', () => {
    const player = new Player()
    const monster = new Monster(12)
    const combat = new Combat(player, monster)

    const result = combat.monsterAttack()

    assert.ok(result.damage >= 1 && result.damage <= 6)
    assert.equal(result.playerHealth, 20 - result.damage)
    assert.equal(combat.getPlayerHealth(), result.playerHealth)
})

test('Defending reduces incoming damage', () => {
    const player = new Player()
    const monster = new Monster(12)
    const combat = new Combat(player, monster)

    const result = combat.monsterAttack(true)

    assert.ok(result.damage >= 1 && result.damage <= 3)
    assert.equal(result.playerHealth, 20 - result.damage)
})

test('Combat can use a healing potion', () => {
    const player = new Player()
    const monster = new Monster(12)
    const combat = new Combat(player, monster)

    player.takeDamage(10)

    const result = combat.useHealingPotion()

    assert.equal(result.used, true)
    assert.equal(result.playerHealth, 18)
    assert.equal(result.healingPotions, 2)
})

test('Combat is over when the monster is defeated', () => {
    const player = new Player()
    const monster = new Monster(1)
    const combat = new Combat(player, monster)

    monster.takeDamage(1)

    assert.equal(combat.isOver(), true)
})

test('Combat is over when the player is defeated', () => {
    const player = new Player()
    const monster = new Monster(12)
    const combat = new Combat(player, monster)

    player.takeDamage(20)

    assert.equal(combat.isOver(), true)
})
