import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleMonsterEncounter } from '../src/encounters/MonsterEncounter.js'
import { Monster } from '../src/Monster.js'
import { Player } from '../src/Player.js'

test('Player receives rewards after surviving combat', async () => {
    const player = new Player()
    const monster = new Monster(8)
    const originalCreateRandom = Monster.createRandom

    Monster.createRandom = () => monster

    try {
        await handleMonsterEncounter(player, {
            runCombat: async () => {},
            readKeypress: async () => '1'
        })

        assert.equal(player.getGold(), 10 + monster.getGoldReward())
        assert.equal(
            player.getExperience(),
            monster.getExperienceReward()
        )
    } finally {
        Monster.createRandom = originalCreateRandom
    }
})


test('Player does not receive rewards after being defeated', async () => {
    const player = new Player()
    const monster = new Monster(8)
    const originalCreateRandom = Monster.createRandom

    Monster.createRandom = () => monster

    try {
        await handleMonsterEncounter(player, {
            runCombat: async (combat, combatPlayer) => {
                combatPlayer.takeDamage(100)
            },
            readKeypress: async () => '1'
        })

        assert.equal(player.getGold(), 10)
        assert.equal(player.getExperience(), 0)
    } finally {
        Monster.createRandom = originalCreateRandom
    }
})

test('Monster encounter passes the player and combat to runCombat', async () => {
    const player = new Player()
    const monster = new Monster(8)
    const originalCreateRandom = Monster.createRandom
    let receivedCombat
    let receivedPlayer
    let receivedKeypress

    Monster.createRandom = () => monster

    try {
        await handleMonsterEncounter(player, {
            runCombat: async (combat, combatPlayer, readKeypress) => {
                receivedCombat = combat
                receivedPlayer = combatPlayer
                receivedKeypress = readKeypress
            },
            readKeypress: async () => '1'
        })

        assert.ok(receivedCombat)
        assert.equal(receivedPlayer, player)
        assert.equal(typeof receivedKeypress, 'function')
    } finally {
        Monster.createRandom = originalCreateRandom
    }
})
