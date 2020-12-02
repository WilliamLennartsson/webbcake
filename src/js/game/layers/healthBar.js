import UiElement from './uiElement'

export default class HealthBar extends UiElement {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    super()
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.maxHealth = 0
  }
  update = (player) => {
    this.maxHealth = player.maxHealth
    this.health = player.health
  }

  draw = (context, camera) => {
    const {x, y, width, height, health, maxHealth} = this
    context.strokeRect(x, y, width, height)
    const calcWidth = (health / maxHealth) * width
    context.fillRect(x, y, calcWidth, height)
  }
}