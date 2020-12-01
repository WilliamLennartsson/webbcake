

export default class Camera {
  constructor(xOffset = 0, yOffset = 0) {
    this.position = {
      x: 0,
      y: 0
    }
    this.xOffset = xOffset
    this.yOffset = yOffset
  }
  pan = (dir) => {
    this.xOffset += dir.x
    this.yOffset += dir.y
  }
  getOffset = () => { return { x: this.xOffset, y: this.yOffset} }
  follow = (pos) => {
    this.position.x = pos.x + this.xOffset
    this.position.y = pos.y + this.yOffset
  }
}