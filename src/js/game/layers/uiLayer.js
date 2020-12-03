import BaseLayer from './baseLayer'
import HealthBar from './healthBar'
import ActionBar from './actionBar'

export default class UiLayer extends BaseLayer {
  constructor(width, height) {
    super()
    this.uiElements = []
    const healthBar = new HealthBar(0, 0, 400, 70)

    const xPadding = 50
    const yPadding = 20
    const actionBarHeight = 100
    const actionBar = new ActionBar(xPadding, height - (yPadding + actionBarHeight), width - (xPadding * 2), actionBarHeight)
    
    this.healthBar = healthBar
    this.actionBar = actionBar
    this.uiElements.push(actionBar)
    this.uiElements.push(healthBar)
  }

  draw = (context, camera) => {
    //this.healthBar.draw(context, camera)
    this.uiElements.forEach(element => {
      element.draw(context, camera)
    })
  }

  playerUpdated = (player) => {
    this.healthBar.update(player.maxHealth, player.health)
    this.actionBar.update(player)
  }
}