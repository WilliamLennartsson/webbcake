
import {wizardAnimationFrames} from './gameImages/wizardAnimation'

export default class AnimationManager {
  constructor() {
    this.animationGroups = {}
    this.currentAnimation = {group: "", frames: [], activeFrameIndex: -1, currentFrame: null}
    this.animSpeed = 7
    this.counter = 0
  }

  load() {

  }

  defineAnimationGroup = (groupName, model) => {
    this.animationGroups[groupName] = model
    // console.log('anim :>> ', model);
    // console.log('this.animations :>> ', this.animationGroups);
  }

  play(animationGroup, animationName, onComplete) {
    if (onComplete) this.onComplete = onComplete
    else this.onComplete = null
    // TODO: Fix this shit up. Looks like yo mama
    if (this.currentAnimation.name != null) {
      if (this.currentAnimation.name == animationName) return 
    }
    
    // console.log('this.animationGroups :>> ', this.animationGroups, animationName);
    const { data, spriteSheet } = this.animationGroups[animationGroup]
    // console.log('data, spriteSheet :>> ', data, spriteSheet);
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
    this.currentAnimation.group = animationGroup
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
      // New loop or onComplete
      if (currAnim.activeFrameIndex >= currAnim.frames.length) {
        if (this.onComplete) this.onComplete()
        currAnim.activeFrameIndex = 0 
      }
      currAnim.currentFrame = currAnim.frames[currAnim.activeFrameIndex]
    }
  }

  getFrame() {
    if (this.currentAnimation.frames.length == 0) return null
    if (this.currentAnimation.activeFrameIndex == -1) return this.sprite
    const currentFrameData = this.currentAnimation.frames[this.currentAnimation.activeFrameIndex]
    const frame = this.animationGroups[this.currentAnimation.group].spriteSheet.getSprite(currentFrameData.name)
    return frame
  }
}
