import BaseLayer from './baseLayer'
import HealthBar from './healthBar'

export default class UiLayer extends BaseLayer {
  constructor() {
    super()
    this.uiElements = []
    const healthBar = new HealthBar(0, 0, 400, 70)
    // this.healthBar = healthBar
    // healthBar.minHealth = 0
    // healthBar.maxHealth = 0
    // healthBar.playerHealth = 0
    this.healthBar = healthBar
    this.uiElements.push(healthBar)
  }

  draw = (context, camera) => {
    //this.healthBar.draw(context, camera)
    this.uiElements.forEach(element => {
      element.draw(context, camera)
    })
  }

  playerUpdated = (player) => {
    
    this.healthBar.update(player)
  }
}