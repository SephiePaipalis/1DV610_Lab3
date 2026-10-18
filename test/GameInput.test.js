import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getGameAction } from '../src/GameInput.js'

test('Number keys map to combat actions', () => {
    assert.equal(getGameAction('1'), 'ATTACK')
    assert.equal(getGameAction('2'), 'DEFEND')
    assert.equal(getGameAction('3'), 'USE_POTION')
})

test('WASD keys map to movement actions', () => {
    assert.equal(getGameAction('w'), 'MOVE_NORTH')
    assert.equal(getGameAction('a'), 'MOVE_WEST')
    assert.equal(getGameAction('s'), 'MOVE_SOUTH')
    assert.equal(getGameAction('d'), 'MOVE_EAST')
})

test('Input is case-insensitive', () => {
    assert.equal(getGameAction('W'), 'MOVE_NORTH')
    assert.equal(getGameAction('A'), 'MOVE_WEST')
    assert.equal(getGameAction('S'), 'MOVE_SOUTH')
    assert.equal(getGameAction('D'), 'MOVE_EAST')
})

test('Unknown input returns null', () => {
    assert.equal(getGameAction('x'), null)
    assert.equal(getGameAction('q'), null)
})

test('Input does not remain active after the action is returned', () => {
    assert.equal(getGameAction('1'), 'ATTACK')

    assert.equal(getGameAction('x'), null)
})
