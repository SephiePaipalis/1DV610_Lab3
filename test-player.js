
import { Player } from './src/Player.js'

const player = new Player()

console.log('Health:', player.getHealth())
console.log('Maximum health:', player.getMaxHealth())
console.log('Level:', player.getLevel())
console.log('Experience:', player.getExperience())
console.log('Potions:', player.getHealingPotions())

player.takeDamage(10)
console.log('Health after damage:', player.getHealth())

console.log('Potion used:', player.useHealingPotion())
console.log('Health after potion:', player.getHealth())
console.log('Potions remaining:', player.getHealingPotions())

player.gainExperience(30)
console.log('Level after gaining 30 XP:', player.getLevel())
console.log('New maximum health:', player.getMaxHealth())
