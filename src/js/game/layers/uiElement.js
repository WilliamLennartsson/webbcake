
export default class UiElement {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  draw = (context) => {
    context.strokeStyle = "red"
    context.strokeRect(this.x, this.y, this.width, this.height)
  }
}