import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runCombat } from '../src/ui/CombatDisplay.js'

function createPlayer() {
    return {
        getHealth: () => 20,
        getMaxHealth: () => 20,
        getLevel: () => 1,
        getExperience: () => 0,
        getHealingPotions: () => 3,
        isDefeated: () => false
    }
}

test('Combat interaction handles an attack and ends after victory', async () => {
    const player = createPlayer()
    let monsterHealth = 5
    let monsterAttacked = false

    const combat = {
        isOver: () => monsterHealth <= 0,
        getMonsterHealth: () => monsterHealth,
        attackMonster: () => {
            monsterHealth = 0
            return { damage: 5, monsterHealth }
        },
        monsterAttack: () => {
            monsterAttacked = true
            return { damage: 2, playerHealth: 18 }
        }
    }

    await runCombat(combat, player, async () => '1')

    assert.equal(monsterHealth, 0)
    assert.equal(monsterAttacked, false)
})

test('Combat interaction handles defending', async () => {
    let playerHealth = 20
    let playerDefeated = false
    let monsterAttackCount = 0

    const player = {
        ...createPlayer(),
        getHealth: () => playerHealth,
        isDefeated: () => playerDefeated
    }

    const combat = {
        isOver: () => playerDefeated,
        getMonsterHealth: () => 12,
        monsterAttack: (isDefending) => {
            assert.equal(isDefending, true)
            monsterAttackCount++
            playerHealth = 0
            playerDefeated = true
            return { damage: 2, playerHealth }
        }
    }

    await runCombat(combat, player, async () => '2')

    assert.equal(monsterAttackCount, 1)
    assert.equal(playerDefeated, true)
})

test('Combat interaction ignores invalid input and asks again', async () => {
    const player = createPlayer()
    let monsterHealth = 5
    let inputCount = 0

    const combat = {
        isOver: () => monsterHealth <= 0,
        getMonsterHealth: () => monsterHealth,
        attackMonster: () => {
            monsterHealth = 0
            return { damage: 5, monsterHealth }
        }
    }

    const readKeypress = async () => {
        inputCount++

        if (inputCount === 1) {
            return 'x'
        }

        return '1'
    }

    await runCombat(combat, player, readKeypress)

    assert.equal(inputCount, 2)
    assert.equal(monsterHealth, 0)
})
