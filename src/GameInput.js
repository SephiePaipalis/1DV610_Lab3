import { GameControls, ControlProfile, Action } from 'game-controller'

const controls = new GameControls()
const profile = new ControlProfile('Dungeon')

const attack = new Action('ATTACK')
const defend = new Action('DEFEND')
const explore = new Action('EXPLORE')

profile.addAction(attack)
profile.addAction(defend)
profile.addAction(explore)

profile.bindAction('ATTACK', '1')
profile.bindAction('DEFEND', '2')
profile.bindAction('EXPLORE', '3')

controls.addProfile(profile)
controls.setActiveProfile('Dungeon')


export function getGameAction(input) {
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

