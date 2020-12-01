

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
    this.xOffset = pos.x / -1
    this.yOffset = pos.y / -1
    this.position.x = pos.x
    this.position.y = pos.y
  }
}