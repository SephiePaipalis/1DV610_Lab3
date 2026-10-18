import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Monster } from '../src/Monster.js'

test('Monster starts with the correct health', () => {
    const monster = new Monster(12)

    assert.equal(monster.getHealth(), 12)
    assert.equal(monster.isDefeated(), false)
})

test('Monster loses health when it takes damage', () => {
    const monster = new Monster(12)

    monster.takeDamage(5)

    assert.equal(monster.getHealth(), 7)
})

test('Monster health cannot go below zero', () => {
    const monster = new Monster(12)

    monster.takeDamage(20)

    assert.equal(monster.getHealth(), 0)
    assert.equal(monster.isDefeated(), true)
})

test('Monster is defeated when its health reaches zero', () => {
    const monster = new Monster(5)

    monster.takeDamage(5)

    assert.equal(monster.isDefeated(), true)
})

test('Monster exposes its attack damage range', () => {
    const monster = new Monster(12)

    assert.equal(monster.getMinAttackDamage(), 1)
    assert.equal(monster.getMaxAttackDamage(), 6)
})

test('Monster exposes its name and rewards', () => {
    const monster = new Monster(12)

    assert.equal(monster.getName(), 'Shadow Cat')
    assert.equal(monster.getExperienceReward(), 10)
    assert.equal(monster.getGoldReward(), 5)
})
