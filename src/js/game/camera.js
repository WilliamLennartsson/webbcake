

export default class Camera {
  constructor() {
    this.xOffset = 0
    this.yOffset = 0
  }
  pan = (dir) => {
    this.xOffset += dir.x
    this.yOffset += dir.y
  }
  getOffset = () => { return { x: this.xOffset, y: this.yOffset} }
  follow = (pos) => {
    this.xOffset = pos.x / -1
    this.yOffset = pos.y / -1
  }
}