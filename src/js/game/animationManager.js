
import {wizardAnimationFrames} from './gameImages/wizardAnimation'

export default class AnimationManager {
  constructor() {
    this.animations = {}
    this.currentAnimation = {frames: [], activeFrameIndex: -1, currentFrame: null}
    this.animSpeed = 2
    this.counter = 0
  }
  
  load(name, animation, onLoad) {
    return new Promise(resolve => {
      const frames = wizardAnimationFrames[animation].frames
      const loadingFrames = []
      console.log(frames)
      for (let i = 0; i < frames.length; i++){
        loadingFrames.push(loadImage(frames[i]))
      }
      Promise.all(loadingFrames)
      .then(loadedFrames => {
        this.animations[name] = {
          [animation]: { frames: loadedFrames, activeFrameIndex: -1, currentFrame: null }
        }
        if (onLoad) onLoad({status: 'loaded', name, animation})
      })
    })
  }
  play(name, animation) {
    const animCollection = this.animations[name]
    this.currentAnimation = animCollection[animation]
    this.currentAnimation.activeFrameIndex = 0
    this.currentAnimation.currentFrame = this.currentAnimation.frames[0]
    console.log(this.currentAnimation)
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
    // if (this.currentAnimation.frames.length == 0) return this.sprite
    // if (this.currentAnimation.activeFrameIndex == -1) return this.sprite
    if (this.currentAnimation.currentFrame == null) return null
    return this.currentAnimation.currentFrame
  }
}


const loadImage = (url) => {
  return new Promise(resolve => {
    const image = new Image()
      image.addEventListener('load', () => {
        resolve(image)      
      })
      image.src = url
    })
  }