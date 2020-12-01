import { loadCharacter, loadTileset, loadLevel, loadSamuraiSpriteset } from './loaders'
import SpriteSheet from './spriteSheet'
import Player from './player'
import samuraiWalkData from './gameImages/samurai/Boss_Samurai_Walk.json'

const canvas = document.getElementById('gameScreen')
const WIDTH = window.innerHeight - 100
const HEIGHT = window.innerHeight - 100
canvas.width = WIDTH
canvas.height = HEIGHT
const context = canvas.getContext('2d')

const loadGameAssets = () => {
  return Promise.all([
//    loadImage("./images/gameImages/BlueWizard/2BlueWizardIdle/Chara-BlueIdle00000.png")
    loadCharacter(),
    loadTileset(),
    loadSamuraiSpriteset()
  ])
}

class Grid {
  constructor(rows, cols) {
    
  }
}

const setupLevel = (level) => {
  //const level = loadLevel(level)
  //console.log('level :>> ', level);
}



window.onload = () => {
  console.log(canvas)
  loadGameAssets()
  .then(([character, tileSet, samuraiTileset]) => {
    // const gridCount = 10
    const tileCountW = 25
    const tileCountH = 12
    const tileWidth = WIDTH / tileCountW
    const tileHeight = HEIGHT / tileCountH
    const backgroundSprites = new SpriteSheet(tileSet, tileWidth, tileHeight)
    // sprites.define('corner', 0, 0)
    // sprites.draw('corner', context, 0, 0)
    backgroundSprites.define('corner-right', 1, 1, 5)
    backgroundSprites.define('corner-left', 4, 2, 5)
    console.log('Corner left :>> ', backgroundSprites.getSprite('corner-left'))
    // setupLevel('level1')

    // Player layer
    // const player = new Player({sprite: character}, 100, 100, 100, 100)

    // Samurai
    const samuraiSpriteSheet = new SpriteSheet(samuraiTileset, 256, 256)
    const samuraiPlayer = new Player({spriteSheet: samuraiSpriteSheet, data: samuraiWalkData}, 100, 100, 100, 100)

    // context.drawImage(tileSet, 0, 0, tileWidth, tileHeight, 100, 100, 100, 100)
    const update = () => {
      context.clearRect(0, 0, WIDTH, HEIGHT)
      // Background layer
      for (let y = 0; y < tileCountH; y++) {
        for (let x = 0; x < tileCountW; x++) {
          backgroundSprites.draw('corner-left', context, x * tileWidth, y * tileHeight)
        } 
      }
      // Sprite layer
      // player.draw(context)
      // player.update()
      samuraiPlayer.update()
    samuraiPlayer.draw(context)

      requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
  })
}
