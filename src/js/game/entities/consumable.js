
import Item from './item'

export default class Consumable extends Item{
  constructor(sprite, x, y, width, height, onPickup) {
    super(sprite, x, y, width, height)
    this.sprite = sprite
    this.onPickup = onPickup
  }
  update = (deltaTime) => {

  }
  draw = (context, camera) => {
    super.draw(context, camera)
  }
  consume = (entity) => {
    if (this.onPickup) this.onPickup(entity)
    else return () => {}
  }
}