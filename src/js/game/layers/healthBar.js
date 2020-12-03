import UiElement from './uiElement'

export default class HealthBar extends UiElement {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    super()
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.max = 0
    this.current = 0
  }
  update = (max, current) => {
    this.max = max
    this.current = current
  }

  draw = (context) => {
    const {x, y, width, height, current, max} = this
    context.strokeRect(x, y, width, height)
    const calcWidth = (current / max) * width
    context.fillRect(x, y, calcWidth, height)
  }
}