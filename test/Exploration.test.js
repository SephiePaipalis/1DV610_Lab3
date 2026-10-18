import { test } from 'node:test'
import assert from 'node:assert/strict'
import { exploreCity } from '../src/Exploration.js'
import { Player } from '../src/Player.js'

test('Player can quit exploration', async () => {
    const player = new Player()
    let inputCount = 0

    const readKeypress = async () => {
        inputCount++
        return 'q'
    }

    const result = await exploreCity(player, readKeypress)

    assert.equal(result, undefined)
    assert.equal(inputCount, 1)
    assert.equal(player.getHealth(), 20)
})

test('Invalid input does not end exploration', async () => {
    const player = new Player()
    let inputCount = 0

    const readKeypress = async () => {
        inputCount++

        if (inputCount === 1) {
            return 'x'
        }

        return 'q'
    }

    const result = await exploreCity(player, readKeypress)

    assert.equal(result, undefined)
    assert.equal(inputCount, 2)
    assert.equal(player.getHealth(), 20)
})

test('Defeated player does not start exploring', async () => {
    const player = new Player()
    player.takeDamage(20)

    let inputRequested = false

    const readKeypress = async () => {
        inputRequested = true
        return 'q'
    }

    const result = await exploreCity(player, readKeypress)

    assert.equal(result, undefined)
    assert.equal(inputRequested, false)
})
