import UiElement from './uiElement'

export default class ActionBar extends UiElement {
  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.numberOfSlots = 8
  }

  draw = (context) => {
    const {x, y, width, height, health, maxHealth} = this
    const slotWidth = width / this.numberOfSlots
    const slotHeight = height
    context.strokeRect(x, y, width, height)
    const calcWidth = (health / maxHealth) * width
    context.fillRect(x, y, calcWidth, height)
    for(let i = 0; i < this.numberOfSlots; i++) {
      const slotX = x + (i * slotWidth)
      const slotY = y
      context.strokeRect(slotX, slotY, slotWidth, slotHeight)
      context.font = "20px Arial";
      context.fillText(`${i + 1}`, slotX + 5, slotY + 20, slotWidth - 10)
    }
  }

  update = (player) => {
    
  }

  bindSlot(slotId, item, onClick) {
  }
}
