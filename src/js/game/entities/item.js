import BaseEntity from './baseEntity'

export default class Item extends BaseEntity{
  constructor(sprite, x, y, width, height) {
    super()
    this.sprite = sprite
    this.x = x
    this.y = y
    this.height = height
    this.width = width
  }
  update = (deltaTime) => {

  }
  draw = (context, camera) => {
    context.drawImage(this.sprite, this.x - camera.position.x, this.y - camera.position.y, this.width, this.height)
    context.strokeRect(this.x - camera.position.x, this.y - camera.position.y, this.width, this.height)
  }

}