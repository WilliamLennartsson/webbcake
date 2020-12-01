import AnimationManager from'./animationManager'
import SpriteSheetAnimationManager from'./spriteSheetAnimator'
import KeyboardManager from './keyboardInputManager'

export default class Player {
  constructor(model, x, y) {
    if (model.sprite){
      this.sprite = model.sprite
      this.animationManager = new AnimationManager()
      this.animationManager.load('Wizard', 'idle', (animation) => {
        if (animation.status === 'loaded'){
          this.animationManager.play(animation.name, animation.animation)// hmm. dumb naming right here
        }
      })
    }
    if (model.spriteSheet && model.data) {
      this.animationManager = new SpriteSheetAnimationManager(model)
      this.animationManager.play('moveWest')
    }
    this.x = x
    this.y = y
    this.width = 100
    this.height = 100
    this.playerSpeed = 3
    this.keyboardManager = new KeyboardManager() 
  }

  draw = (context) => {
    let spriteToDraw
    const animSprite = this.animationManager.getFrame()
    // console.log('animSprite :>> ', animSprite)
    if (animSprite == null && this.sprite == null) return
    if (animSprite == null) spriteToDraw = this.sprite
    else spriteToDraw = animSprite
    // const { xOffset, yOffset } = this.camera.getOffset()
    //context.drawImage(spriteToDraw, xOffset + this.x, yOffset + this.y, this.width, this.height)
    context.drawImage(spriteToDraw, this.x, this.y, this.width, this.height)
  }

  update = (deltaTime) => {
    const { left, right, up, down, aKey, sKey, wKey,dKey } = this.keyboardManager.keys
    const dir = {
      x: 0,
      y: 0
    }
    if (down.down || sKey.down) dir.y = 1
    if (up.down || wKey.down) dir.y = -1
    if (left.down || aKey.down) dir.x = -1
    if (right.down || dKey.down) dir.x = 1

    if (dir.x == 0 && dir.y == 1) this.animationManager.play('moveSouth') // down
    if (dir.x == 1 && dir.y == 0) this.animationManager.play('moveEast') // right
    if (dir.x == 0 && dir.y == -1) this.animationManager.play('moveNorth') // up
    if (dir.x == -1 && dir.y == 0) this.animationManager.play('moveWest') // left

    if (dir.x == 1 && dir.y == 1) this.animationManager.play('moveSouthEast') // southEast
    if (dir.x == -1 && dir.y == 1) this.animationManager.play('moveSouthWest') // southWest
    if (dir.x == 1 && dir.y == -1) this.animationManager.play('moveNorthEast') // northEast
    if (dir.x == -1 && dir.y == -1) this.animationManager.play('moveNorthWest') // northWest
    
    // if (down.justPressed || sKey.justPressed) this.animationManager.play('moveSouth') // down
    // if (up.justPressed || wKey.justPressed) this.animationManager.play('moveNorth') // up
    // if (left.justPressed || aKey.justPressed) this.animationManager.play('moveWest') // left
    // if (right.justPressed || dKey.justPressed) this.animationManager.play('moveEast') // right
    
    if (dir.y == 1) this.y += this.playerSpeed // Down
    if (dir.y == -1) this.y -= this.playerSpeed // Up
    if (dir.x == -1) this.x -= this.playerSpeed // Left
    if (dir.x == 1) this.x += this.playerSpeed // Right
    if (this.onmove) this.onmove({pos: {x: this.x, y: this.y}, dir})
    this.animationManager.update()
    this.keyboardManager.update()
  }
}