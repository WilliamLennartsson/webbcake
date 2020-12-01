import BaseEntity from'./baseEntity'
import AnimationManager from'../animationManager'
import SpriteSheetAnimationManager from'../spriteSheetAnimator'
import KeyboardManager from '../keyboardInputManager'
import Camera from '../camera'

export default class Player extends BaseEntity {
  constructor(model, x, y) {
    // Rendering
    super()
    console.log('this :>> ', this);
    if (model.sprite){ // Sprite rendering + folder images animation rendering
      this.sprite = model.sprite
      this.animationManager = new AnimationManager()
      this.animationManager.load('Wizard', 'idle', (animation) => {
        if (animation.status === 'loaded'){
          this.animationManager.play(animation.name, animation.animation)// hmm. dumb naming right here
        }
      })
    } else if (model.spriteSheet && model.data) { // SpriteSheet rendering
      this.animationManager = new SpriteSheetAnimationManager(model)
      this.animationManager.play('standEast')
    }
    // Body
    this.x = x
    this.y = y
    this.width = 200
    this.height = 200
    this.playerSpeed = 2
    this.velocity = 0 // Not used yet
    this.dir = {
        x: 0,
        y: 0
      }
    // Input
    this.keyboardManager = new KeyboardManager() 
  }

  draw = (context, camera) => {
    let spriteToDraw
    const animSprite = this.animationManager.getFrame()
    // console.log('animSprite :>> ', animSprite)
    if (animSprite == null && this.sprite == null) return
    if (animSprite == null) spriteToDraw = this.sprite
    else spriteToDraw = animSprite
    // const { xOffset, yOffset } = this.camera.getOffset()
    context.drawImage(spriteToDraw, this.x - camera.position.x, this.y - camera.position.y, this.width, this.height)
    // context.drawImage(spriteToDraw, this.x, this.y, this.width, this.height)
    this.drawHitbox(context, camera)
  }
  drawHitbox = (context, camera) => {
    context.strokeRect(this.x - camera.position.x, this.y - camera.position.y, this.width, this.height)
  }

  update = (deltaTime) => {
    const lastDir = this.dir
    const dir = this.getDir()
    this.dir = dir

    // Moves player 
    if (!this.isIdle()) this.movePlayer(dir) // Only move if there is movement

    // Select animation based on dir
    this.changeAnim(dir, lastDir)

    // Onmove callback for camera hook
    if (this.onmove) this.onmove({pos: {x: this.x, y: this.y}, dir})
    // Update components
    this.animationManager.update()
    this.keyboardManager.update()
  }

  getDir = () => {
    const { left, right, up, down, aKey, sKey, wKey,dKey } = this.keyboardManager.keys
    const dir = {
      x: 0,
      y: 0
    }
    if (down.down || sKey.down) dir.y = 1
    if (up.down || wKey.down) dir.y = -1
    if (left.down || aKey.down) dir.x = -1
    if (right.down || dKey.down) dir.x = 1
    return dir
  }

  isIdle = () => this.dir.x == 0 && this.dir.y == 0

  movePlayer = (dir) => {
    if (dir.y == 1) this.y += this.playerSpeed // Down
    if (dir.y == -1) this.y -= this.playerSpeed // Up
    if (dir.x == -1) this.x -= this.playerSpeed // Left
    if (dir.x == 1) this.x += this.playerSpeed // Right
  }

  changeAnim = (dir, lastDir) => {
    if (dir.x == lastDir.x && dir.y == lastDir.y) return // Same direction as last frame

    // Start moving animation
    if (dir.x == 0 && dir.y == 1) this.animationManager.play('moveSouth') // down
    else if (dir.x == 1 && dir.y == 0) this.animationManager.play('moveEast') // right
    else if (dir.x == 0 && dir.y == -1) this.animationManager.play('moveNorth') // up
    else if (dir.x == -1 && dir.y == 0) this.animationManager.play('moveWest') // left
    else if (dir.x == 1 && dir.y == 1) this.animationManager.play('moveSouthEast') // southEast
    else if (dir.x == -1 && dir.y == 1) this.animationManager.play('moveSouthWest') // southWest
    else if (dir.x == 1 && dir.y == -1) this.animationManager.play('moveNorthEast') // northEast
    else if (dir.x == -1 && dir.y == -1) this.animationManager.play('moveNorthWest') // northWest

    // Start Idle animation
    if (dir.x == 0 && dir.y == 0) {
      if (lastDir.x != 0 || lastDir.y != 0) { // Starting idle
        if (lastDir.x == 0 && lastDir.y == 1) this.animationManager.play('standSouth') // down
        else if (lastDir.x == 1 && lastDir.y == 0) this.animationManager.play('standEast') // right
        else if (lastDir.x == 0 && lastDir.y == -1) this.animationManager.play('standNorth') // up
        else if (lastDir.x == -1 && lastDir.y == 0) this.animationManager.play('standNorth') // left // NO ANIMATION
        else if (lastDir.x == 1 && lastDir.y == 1) this.animationManager.play('standSouthEast') // southEast
        else if (lastDir.x == -1 && lastDir.y == 1) this.animationManager.play('standSouthWest') // southWest
        else if (lastDir.x == -1 && lastDir.y == -1) this.animationManager.play('standNorthWest') // northWest
        else if (lastDir.x == 1 && lastDir.y == -1) this.animationManager.play('standNorthEast') // northEast
      }
    }
  }
}