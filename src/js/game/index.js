import { loadCharacter, loadTileset, loadLevel, loadSamuraiSpriteset } from './loaders'
import SpriteSheet from './spriteSheet'
import Player from './player'
import samuraiWalkData from './gameImages/samurai/Boss_Samurai_Walk.json'
import BackgroundLayer from './layers/backgroundLayer'
import Camera from './camera'
import Renderer from './renderer'

const canvas = document.getElementById('gameScreen')
const WIDTH =  window.innerWidth - 20
const HEIGHT =  window.innerHeight - 20
canvas.width = WIDTH
canvas.height = HEIGHT
const context = canvas.getContext('2d')

const loadGameAssets = () => {
  return Promise.all([
    loadCharacter(), // soon deprecated
    loadTileset(),
    loadSamuraiSpriteset()
  ])
}

window.onload = () => {
  console.log(canvas)
  loadGameAssets()
  .then(([character, tileSet, samuraiTileset]) => {
    // Create World. LoadMap
    const level = loadLevel('level1')
    // Camera
    
    const camera = new Camera(-((WIDTH - 50) / 2), -((HEIGHT - 150) / 2))
    // Create BackgroundLayer
    const backgroundLayer = new BackgroundLayer(tileSet, level, camera)

    const renderer = new Renderer(camera)
    renderer.addLayer(backgroundLayer)

    // Player using a sprite
    // const player = new Player({sprite: character}, 100, 100, 100, 100)
    // Samurai
    // Player using a spriteSheet for animations
    const samuraiSpriteSheet = new SpriteSheet(samuraiTileset, 256, 256)
    const samuraiPlayer = new Player({spriteSheet: samuraiSpriteSheet, data: samuraiWalkData}, 400, 300)
    samuraiPlayer.onmove = ({dir, pos}) => {
      //camera.pan(dir)
      camera.follow(pos)
    }
    
    // context.drawImage(tileSet, 0, 0, tileWidth, tileHeight, 100, 100, 100, 100)
    const update = () => {
      context.clearRect(0, 0, WIDTH, HEIGHT)
      // Background layer
      // backgroundLayer.draw(context)
      renderer.draw(context)
      // camera.pan({x: 0.1, y: 0.1})
      samuraiPlayer.update()
      samuraiPlayer.draw(context, camera)

      requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
  })
}
