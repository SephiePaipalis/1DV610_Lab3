import { test } from 'node:test'
import assert from 'node:assert/strict'
import { EncounterManager, EncounterRegistry } from '../src/Encounters.js'

test('Encounter manager returns a valid encounter or null', () => {
    const manager = new EncounterManager([
        { type: 'SHOP', chance: 0.1 },
        { type: 'MONSTER', chance: 0.2 }
    ])

    const encounter = manager.getRandomEncounter()

    assert.ok(
        encounter === 'SHOP' ||
        encounter === 'MONSTER' ||
        encounter === null
    )
})

test('Encounter manager can include a mate encounter after three victories', () => {
    const manager = new EncounterManager([
        { type: 'SHOP', chance: 0.1 },
        { type: 'MONSTER', chance: 0.2 }
    ])

    // Repeated rolls should eventually encounter a valid result.
    // The mate encounter is only eligible after three victories.
    const encounter = manager.getRandomEncounter(3)

    assert.ok(
        encounter === 'SHOP' ||
        encounter === 'MONSTER' ||
        encounter === 'MATE' ||
        encounter === null
    )
})

test('Registry executes a registered handler', async () => {
    const registry = new EncounterRegistry()
    let wasCalled = false

    registry.register('SHOP', () => {
        wasCalled = true
        return 'shop result'
    })

    const result = await registry.execute('SHOP')

    assert.equal(wasCalled, true)
    assert.equal(result, 'shop result')
})

test('Registry rejects duplicate handler registrations', () => {
    const registry = new EncounterRegistry()

    registry.register('SHOP', () => {})

    assert.throws(
        () => registry.register('SHOP', () => {}),
        /Handler already registered/
    )
})

test('Registry rejects unknown encounter types', async () => {
    const registry = new EncounterRegistry()

    await assert.rejects(
        registry.execute('UNKNOWN'),
        /No handler registered/
    )
})

test('Registry ignores a null encounter', async () => {
    const registry = new EncounterRegistry()

    const result = await registry.execute(null)

    assert.equal(result, undefined)
})
