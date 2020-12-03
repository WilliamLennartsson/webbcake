import BaseEntity from './baseEntity'

const attackConfig = {
  sprite: null,
  static: false,
  animation: {
    data: null,
    spriteSheet: null,
    animName: ""
  },
  duration: 10,
  x: 1,
  y: 1,
  width: 1,
  height: 1,
  rotation: 0
}

export default class Attack extends BaseEntity {
  constructor(conf) {
    const config = Object.assign(attackConfig, conf)
    Object.keys(config).map(key => {
      this[key] = config[key]
    })

    this.animationManager = new SpriteSheetAnimationManager(model)
    this.animationManager.play('standEast')
    this.currentFrame = 0
  }
  draw = () => {
    
  }
}