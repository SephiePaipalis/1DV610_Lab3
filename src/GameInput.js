import { GameControls, ControlProfile, Action } from 'game-controller'

const controls = new GameControls()
const profile = new ControlProfile('Dungeon')

/**
 * Actions triggered by inputs.
 */
const attack = new Action('ATTACK')
const defend = new Action('DEFEND')
const explore = new Action('EXPLORE')
const moveNorth = new Action('MOVE_NORTH') 
const moveWest = new Action('MOVE_WEST') 
const moveSouth = new Action('MOVE_SOUTH') 
const moveEast = new Action('MOVE_EAST') 

/**
 * Register available actions with control profile.
 */
profile.addAction(attack)
profile.addAction(defend)
profile.addAction(explore)
profile.addAction(moveNorth)
profile.addAction(moveWest)
profile.addAction(moveSouth)
profile.addAction(moveEast)

/**
 * Binds action to input.
 */
profile.bindAction('ATTACK', '1')
profile.bindAction('DEFEND', '2')
profile.bindAction('EXPLORE', '3')
profile.bindAction('MOVE_NORTH', 'w')
profile.bindAction('MOVE_WEST', 'a')
profile.bindAction('MOVE_SOUTH', 's')
profile.bindAction('MOVE_EAST', 'd')

/**
 * Register and activate profile.
 */
controls.addProfile(profile)
controls.setActiveProfile('Dungeon')

/**
 * Input is pressed, checked for paired active action, 
 * and released before result is returned.
 * 
 * @param {string} input - Input entered by player.
 * @returns  {string | null} - Active action name, or null if no action paired.
 */
export function getGameAction(input) {
    input = input.toLowerCase()
    controls.press(input)

    const action = profile.getActionByInput(input)

    if (action === null) {
        controls.release(input)
        return null
    }

    const isActive = controls.isActionActive(action.getName())

    controls.release(input)

    if (isActive) {
        return action.getName()
    }

    return null
}

