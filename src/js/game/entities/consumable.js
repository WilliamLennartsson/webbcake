
import Item from './item'

export default class Consumable extends Item{
  constructor(sprite, {x = 0, y = 0, width = 0, height = 0, destroyOnPickup = false, onPickup = () => {} } ) {
    super(sprite, x, y, width, height)
    this.sprite = sprite
    this.onPickup = onPickup
    this.destroyOnPickup = destroyOnPickup
    this.isConsumed = false
  }
  update = (deltaTime) => {

  }
  draw = (context, camera) => {
    super.draw(context, camera)
  }
  consume = (entity) => {
    if (this.isConsumed) return
    if (this.onPickup) this.onPickup(entity)
    if (this.destroyOnPickup) this.isConsumed = true
  }
}