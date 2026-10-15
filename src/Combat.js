
import { RandomGenerator, Dice } from 'dice-rng-toolkit'

const rng = new RandomGenerator()
const damageDie = new Dice(6)

export class Combat {
  #playerHealth
  #monsterHealth

  constructor() {
    this.#playerHealth = 20
    this.#monsterHealth = 12
  }

  attackMonster() {
    const damage = damageDie.roll(rng)
    this.#monsterHealth = Math.max(0, this.#monsterHealth - damage)

    return {
      damage,
      monsterHealth: this.#monsterHealth
    }
  }

  getPlayerHealth() {
    return this.#playerHealth
  }

  getMonsterHealth() {
    return this.#monsterHealth
  }

  isOver() {
    return this.#playerHealth <= 0 || this.#monsterHealth <= 0
  }
}
