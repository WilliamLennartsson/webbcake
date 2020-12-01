import { loadCharacter, loadTileset } from './loaders'
import SpriteSheet from './spriteSheet'
import Player from './player'
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
    loadTileset()
  ])
}

window.onload = () => {
  console.log(canvas)
  loadGameAssets()
  .then(([character, tileSet]) => {
    const player = new Player(character, 100, 100, 100, 100)
    // const gridCount = 10
    const tileCountW = 20
    const tileCountH = 10
    const tileWidth = WIDTH / tileCountW
    const tileHeight = HEIGHT / tileCountH
    const sprites = new SpriteSheet(tileSet, tileWidth, tileHeight)
    // sprites.define('corner', 0, 0)
    // sprites.draw('corner', context, 0, 0)
    sprites.define('corner-right', 0, 0, 5)
    // Background layer
    // Player layer
  
    // context.drawImage(tileSet, 0, 0, tileWidth, tileHeight, 100, 100, 100, 100)
    const update = () => {
      context.clearRect(0, 0, WIDTH, HEIGHT)
      // Background layer
      for (let y = 0; y < tileCountH; y++) {
        for (let x = 0; x < tileCountW; x++) {
          sprites.draw('corner-right', context, x * tileWidth, y * tileHeight)
        } 
      }
      // Sprite layer
      player.draw(context)
      player.update()

      requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
  })
}
