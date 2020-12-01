
export default class Entity {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.showHitbox = true
  }
  draw(context, camera) {
    if (this.showHitbox) this.drawHitbox(context, camera)
  }
  drawHitbox = (context, camera) => {
    context.lineWidth = 4
    context.strokeRect(this.x - camera.position.x, this.y - camera.position.y, this.width, this.height)
  }
  update() {}
}