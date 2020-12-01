import AnimationManager from'./animationManager'
import KeyboardManager from './keyboardInputManager'

export default class Player {
  constructor(sprite, x, y) {
    this.sprite = sprite
    this.x = x
    this.y = y
    this.width = 100
    this.height = 100
    this.playerSpeed = 3
    this.keyboardManager = new KeyboardManager()
    this.animationManager = new AnimationManager()
    this.animationManager.load('Wizard', 'walk', (animation) => {
      console.log('animation :>> ', animation)
      if (animation.status === 'loaded'){
        this.animationManager.play(animation.name, animation.animation)// hmm. dumb naming right here
      }
    })
  }
  draw = (context) => {
    let spriteToDraw
    const animSprite = this.animationManager.getFrame()
    if (animSprite == null) spriteToDraw = this.sprite
    else spriteToDraw = animSprite
    context.drawImage(spriteToDraw, this.x, this.y, this.width, this.height)
  }
  update = (deltaTime) => {
    const { left, right, up, down, aKey, sKey, wKey,dKey } = this.keyboardManager.keys
    if (down.down || sKey.down) this.y += this.playerSpeed
    if (up.down || wKey.down) this.y -= this.playerSpeed
    if (left.down || aKey.down) this.x -= this.playerSpeed
    if (right.down || dKey.down) this.x += this.playerSpeed

    this.animationManager.update()
  }
}