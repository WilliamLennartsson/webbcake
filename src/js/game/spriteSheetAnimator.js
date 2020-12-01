
import {wizardAnimationFrames} from './gameImages/wizardAnimation'

export default class AnimationManager {
  constructor(model) {
    const { spriteSheet, data } = model
    this.model = model
    // console.log("Data: ", data)

    this.animations = {}
    this.currentAnimation = {frames: [], activeFrameIndex: -1, currentFrame: null}
    this.animSpeed = 8
    this.counter = 0
  }

  load() {

  }

  play(animationName) {
    // TODO: Fix this shit up. Looks like yo mama
    if (this.currentAnimation.name != null) {
      if (this.currentAnimation.name == animationName) return 
    }

    const { data, spriteSheet } = this.model
    const animationFrames = data.animations[animationName]
    this.currentAnimation.frames = animationFrames.map(frame => {
      const frameData = data.frames[frame]
      frameData.name = frame
      const spriteX = frameData.frame.x / frameData.frame.w
      const spriteY = frameData.frame.y / frameData.frame.h
      spriteSheet.define(frame, spriteX, spriteY)
      return frameData
    })
    this.currentAnimation.activeFrameIndex = 0
    this.currentAnimation.name = animationName
    this.currentAnimation.currentFrame = this.currentAnimation.frames[this.currentAnimation.activeFrameIndex]
  }

  update() {
    const currAnim = this.currentAnimation
    if (currAnim.frames.length == 0) return // No frames 
    if (currAnim.activeFrameIndex == -1) return // Paused animation
    this.counter++
    if (this.counter >= this.animSpeed) {
      this.counter = 0
      currAnim.activeFrameIndex++ // Increment frame
      if (currAnim.activeFrameIndex >= currAnim.frames.length) currAnim.activeFrameIndex = 0 // New loop
      currAnim.currentFrame = currAnim.frames[currAnim.activeFrameIndex]
    }
  }

  getFrame() {
    if (this.currentAnimation.frames.length == 0) return null
    if (this.currentAnimation.activeFrameIndex == -1) return this.sprite
    const currentFrameData = this.currentAnimation.frames[this.currentAnimation.activeFrameIndex]
    const frame = this.model.spriteSheet.getSprite(currentFrameData.name)
    return frame
  }
}
