import { loadCharacter, loadTileset } from './loaders'
import SpriteSheet from './spriteSheet'
const canvas = document.getElementById('gameScreen')
const WIDTH = window.innerHeight
const HEIGHT = window.innerHeight
canvas.width = WIDTH
canvas.height = HEIGHT
const context = canvas.getContext('2d')

window.onload = () => {
  console.log(canvas)
  Promise.all([
//    loadImage("./images/gameImages/BlueWizard/2BlueWizardIdle/Chara-BlueIdle00000.png")
    loadCharacter(),
    loadTileset()
  ])
  .then(([character, tileSet]) => {
    console.log('character :>> ', character)
    console.log('tileSet :>> ', tileSet)
    // context.drawImage(character, 
    //   50, 20, 
    //   100, 100)
    context.drawImage(character, 10, 20, 100, 100)
    // const gridCount = 10
    const tileWidth = tileSet.width / 8
    const tileHeight = tileSet.height / 8
    const sprites = new SpriteSheet(tileSet, tileWidth, tileHeight)
    sprites.define('ground', 0, 0)
    sprites.draw('ground', context, 20, 20)
    // context.drawImage(tileSet, 0, 0, tileWidth, tileHeight, 100, 100, 100, 100)
    
  })
}
