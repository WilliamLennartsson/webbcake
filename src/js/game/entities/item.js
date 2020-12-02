import BaseEntity from './baseEntity'

export default class Item extends BaseEntity{
  constructor(sprite, x, y, width, height, onPickup) {
    super()
    this.sprite = sprite
    this.x = x
    this.y = y
    this.height = height
    this.width = width
    this.onPickup
  }
  update = (deltaTime) => {

  }
  draw = (context, camera) => {
    super.draw(context, camera)
    context.drawImage(this.sprite, this.x - camera.position.x, this.y - camera.position.y, this.width, this.height)
    //this.drawHitbox(context, camera)
  }
}