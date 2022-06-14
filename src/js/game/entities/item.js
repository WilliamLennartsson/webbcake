import BaseEntity from './baseEntity'
import AnimationManager from '../animationManager'

export default class Item extends BaseEntity{
  constructor(model = {sprite: null, 
  animated: false, 
  frames: null, 
  animGroupName: "", 
  animName: "",
  animSpeed: 1}, 
  x, y, width, height, onPickup) {
    super()
    this.sprite = model.sprite
    if (model.animated) {
      this.animationManager = new AnimationManager()
      this.animationManager.animSpeed = model.animSpeed
      // console.log('frames in ITEM :>> ', frames);
        this.animationManager.load(model.animGroupName, model.animName, model.frames, (animation) => {
          if (animation.status === 'loaded'){
            this.animationManager.play(animation.name, animation.animation)// hmm. dumb naming right here
          }
        })
    }
    this.x = x
    this.y = y
    this.height = height
    this.width = width
    this.onPickup = onPickup
  }
  update = (deltaTime) => {
    if (this.animationManager) this.animationManager.update()
  }
  draw = (context, camera) => {
    super.draw(context, camera)
    const animFrame = this.animationManager ? this.animationManager.getFrame() : null
    const spriteToDraw = animFrame != null ? animFrame : this.sprite
    context.drawImage(spriteToDraw, this.x - camera.position.x, this.y - camera.position.y, this.width, this.height)
    //this.drawHitbox(context, camera)
  }
}