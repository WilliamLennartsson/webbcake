

export default class Camera {
  constructor(xOffset = 0, yOffset = 0) {
    this.position = {
      x: 0,
      y: 0
    }
    this.xOffset = xOffset
    this.yOffset = yOffset
    this.currentZoom = 1
    this.zoomSpeed = 0.001
    this.maxZoom = 2
    this.minZoom = 0.2
  }
  pan = (dir) => {
    this.xOffset += dir.x
    this.yOffset += dir.y
  }
  getOffset = () => { return { x: this.xOffset, y: this.yOffset } }

  zoom = (amt) => {
    if (amt > 0 && amt <= this.maxZoom) this.currentZoom += this.zoomSpeed
    if (amt < 0 && amt >= this.minZoom) this.currentZoom -= this.zoomSpeed
  }

  follow = (pos) => {
    this.position.x = pos.x + this.xOffset
    this.position.y = pos.y + this.yOffset
  }
}