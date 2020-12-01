import BaseEntity from './baseEntity'

export default class Item extends BaseEntity{
  constructor(model, x, y) {
    super()
    this.x = x
    this.y = y
  }

  update = (deltaTime) => {

  }

}