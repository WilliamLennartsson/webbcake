import BaseEntity from './baseEntity'
import AnimationManager from '../animationManager'
import SpriteSheet from '../spriteSheet'
import SpriteSheetAnimationManager from '../spriteSheetAnimator'
import KeyboardManager from '../keyboardInputManager'
import Inventory from '../inventory'
import Attack from './attack'
// import Camera from '../camera'

export default class Enemy extends BaseEntity {
  constructor(anims, x, y) {
    super()
    // Rendering / Animations
    if (anims.sprite) { // Sprite rendering + folder images animation rendering
      this.sprite = model.sprite
      this.animationManager = new AnimationManager()
      this.animationManager.load('Wizard', 'idle', (animation) => {
        if (animation.status === 'loaded') {
          this.animationManager.play(animation.name, animation.animation)// hmm. dumb naming right here
        }
      })
    } else if (anims.walk && anims.death) { // SpriteSheet rendering
      const walkSpriteSheet = new SpriteSheet(anims.walk.spriteSheet, 256, 256)
      const deathSpriteSheet = new SpriteSheet(anims.death.spriteSheet, 256, 256)
      const meleeSpriteSheet = new SpriteSheet(anims.melee.spriteSheet, 256, 256)
      const rangedSpriteSheet = new SpriteSheet(anims.ranged.spriteSheet, 256, 256)

      const animationManager = new SpriteSheetAnimationManager()
      animationManager.defineAnimationGroup('walk', { spriteSheet: walkSpriteSheet, data: anims.walk.data })
      animationManager.defineAnimationGroup("death", { spriteSheet: deathSpriteSheet, data: anims.death.data })
      animationManager.defineAnimationGroup('melee', { spriteSheet: meleeSpriteSheet, data: anims.melee.data })
      animationManager.defineAnimationGroup('ranged', { spriteSheet: rangedSpriteSheet, data: anims.ranged.data })
      animationManager.play('walk', 'standEast')
      // animationManager.play('melee', 'mAttackNorth')

      // animationManager.play('death', 'Death')
      this.animationManager = animationManager
    }
    // Game
    this.maxHealth = 100
    this.health = 100
    this.isDead = false
    this.justDied = false
    // Body
    this.x = x
    this.y = y
    this.width = 200
    this.height = 200
    this.playerSpeed = 4
    this.velocity = 0 // Not used yet
    this.dir = {
      x: 0,
      y: 0
    }
 

    this.keyboardManager = new KeyboardManager()
    // Inventory 
    this.inventory = new Inventory()
  }

  bindUiCallback = (callback) => {
    this.uICallback = callback
  }

  consume = (consumable) => {
    consumable.consume(this)
  }

  draw = (context, camera) => {
    super.draw(context, camera)
    let spriteToDraw
    const animSprite = this.animationManager.getFrame()
    // console.log('animSprite :>> ', animSprite)
    if (animSprite == null && this.sprite == null) return
    if (animSprite == null) spriteToDraw = this.sprite
    else spriteToDraw = animSprite
    // const { xOffset, yOffset } = this.camera.getOffset()
    context.drawImage(spriteToDraw, this.x - camera.position.x, this.y - camera.position.y, this.width, this.height) 
    //this.drawHitbox(context, camera)
  }

  pickUpItem = (item) => {
    this.inventory.addItem(item)
  }

  update = (deltaTime) => {
    if (this.isDead) {
      if (this.justDied) {
        this.animationManager.play('death', 'Death', () => {
          if (this.onDeath) this.onDeath(this)
        })
        this.justDied = false
      }
      this.animationManager.update()
      return
    }
    if (this.x != 500) this.x += this.playerSpeed
    
    // const space = this.keyboardManager.keys.space
    // if (space.justPressed) { console.log("Space pressed") }
    const lastDir = this.dir
    const dir = this.getDir()
    this.dir = dir
    // Moves player 
    if (!this.isIdle()) this.movePlayer(dir) // Only move if there is movement
    // Select animation based on dir
    this.changeAnim(dir, lastDir)
    // Onmove callback for camera hook
    if (this.onmove) this.onmove({ pos: { x: this.x, y: this.y }, dir })
    // ActionBar and keysbindings
    this.getAction()
    // Update components
    this.animationManager.update()
    if (this.uICallback) this.uICallback(this) // TODO: This doesnt need to run every frame. Fetch me a goddamn bool
  }

  getAction = () => {
    const actionKeys = this.keyboardManager.keys
    for (let i = 0; i < 10; i++) {
      const keyName = `${i}Key`
      if (actionKeys[keyName].justPressed) {
        this.performAction(keyName)
      }
    }
  }
  // TODO: System for binding new actions to keys
  performAction = (keyName) => {
    if (keyName == '1Key') {
      // MeleeAttack
      // const attack = new Attack()
      if (this.dir.x == 0 && this.dir.y == 1) this.animationManager.play('melee', 'mAttackSouth') // down
      else if (this.dir.x == 1 && this.dir.y == 0) this.animationManager.play('melee', 'mAttackEast') // right
      else if (this.dir.x == 0 && this.dir.y == -1) this.animationManager.play('melee', 'mAttackNorth') // up
      else if (this.dir.x == -1 && this.dir.y == 0) this.animationManager.play('melee', 'mAttackWest') // left
      else if (this.dir.x == 1 && this.dir.y == 1) this.animationManager.play('melee', 'mAttackSouthEast') // southEast
      else if (this.dir.x == -1 && this.dir.y == 1) this.animationManager.play('melee', 'mAttackSouthWest') // southWest
      else if (this.dir.x == 1 && this.dir.y == -1) this.animationManager.play('melee', 'mAttackNorthEast') // northEast
      else if (this.dir.x == -1 && this.dir.y == -1) this.animationManager.play('melee', 'mAttackNorthWest') // northWest
    }
    if (keyName == '2Key') {
      // RangedAttack
      // const attack = new Attack()
      if (this.dir.x == 0 && this.dir.y == 1) this.animationManager.play('ranged', 'rAttackSouth') // down
      else if (this.dir.x == 1 && this.dir.y == 0) this.animationManager.play('ranged', 'rAttackEast') // right
      else if (this.dir.x == 0 && this.dir.y == -1) this.animationManager.play('ranged', 'rAttackNorth') // up
      else if (this.dir.x == -1 && this.dir.y == 0) this.animationManager.play('ranged', 'rAttackWest') // left
      else if (this.dir.x == 1 && this.dir.y == 1) this.animationManager.play('ranged', 'rAttackSouthEast') // southEast
      else if (this.dir.x == -1 && this.dir.y == 1) this.animationManager.play('ranged', 'rAttackSouthWest') // southWest
      else if (this.dir.x == 1 && this.dir.y == -1) this.animationManager.play('ranged', 'rAttackNorthEast') // northEast
      else if (this.dir.x == -1 && this.dir.y == -1) this.animationManager.play('ranged', 'rAttackNorthWest') // northWest
    }
    if (keyName == '0Key') {
      this.isDead = true
      this.justDied = true
    }
  }

  getDir = () => {
    
    const dir = {
      x: 0,
      y: 0
    }
    
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
    if (dir.x == 0 && dir.y == 1) this.animationManager.play('walk', 'moveSouth') // down
    else if (dir.x == 1 && dir.y == 0) this.animationManager.play('walk', 'moveEast') // right
    else if (dir.x == 0 && dir.y == -1) this.animationManager.play('walk', 'moveNorth') // up
    else if (dir.x == -1 && dir.y == 0) this.animationManager.play('walk', 'moveWest') // left
    else if (dir.x == 1 && dir.y == 1) this.animationManager.play('walk', 'moveSouthEast') // southEast
    else if (dir.x == -1 && dir.y == 1) this.animationManager.play('walk', 'moveSouthWest') // southWest    
    else if (dir.x == 1 && dir.y == -1) this.animationManager.play('walk', 'moveNorthEast') // northEast
    else if (dir.x == -1 && dir.y == -1) this.animationManager.play('walk', 'moveNorthWest') // northWest

    // Start Idle animation
    if (dir.x == 0 && dir.y == 0) {
      if (lastDir.x != 0 || lastDir.y != 0) { // Starting idle
        if (lastDir.x == 0 && lastDir.y == 1) this.animationManager.play('walk', 'standSouth') // down
        else if (lastDir.x == 1 && lastDir.y == 0) this.animationManager.play('walk', 'standEast') // right
        else if (lastDir.x == 0 && lastDir.y == -1) this.animationManager.play('walk', 'standNorth') // up
        else if (lastDir.x == -1 && lastDir.y == 0) this.animationManager.play('walk', 'standWest') // left // NO ANIMATION
        else if (lastDir.x == 1 && lastDir.y == 1) this.animationManager.play('walk', 'standSouthEast') // southEast
        else if (lastDir.x == -1 && lastDir.y == 1) this.animationManager.play('walk', 'standSouthWest') // southWest
        else if (lastDir.x == -1 && lastDir.y == -1) this.animationManager.play('walk', 'standNorthWest') // northWest
        else if (lastDir.x == 1 && lastDir.y == -1) this.animationManager.play('walk', 'standNorthEast') // northEast
      }
    }
  }
}