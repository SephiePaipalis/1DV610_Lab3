import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleMateEncounter } from '../src/encounters/MateEncounter.js'
import { Player } from '../src/Player.js'

test('Player can back away from a mate encounter', async () => {
    const player = new Player()

    const result = await handleMateEncounter(player, {
        readKeypress: async () => '2'
    })

    assert.equal(result, false)
})

test('Invalid choice does not end the mate encounter', async () => {
    const player = new Player()
    const choices = ['x', '2']
    let inputCount = 0

    const result = await handleMateEncounter(player, {
        readKeypress: async () => {
            inputCount++
            return choices.shift()
        }
    })

    assert.equal(result, false)
    assert.equal(inputCount, 2)
})

test('Seduction attempt returns a boolean result', async () => {
    const player = new Player()

    const result = await handleMateEncounter(player, {
        readKeypress: async () => '1'
    })

    assert.equal(typeof result, 'boolean')
})
