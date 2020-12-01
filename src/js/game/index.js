import { loadCharacter, loadTileset, loadLevel, loadSamuraiSpriteset } from './loaders'
import SpriteSheet from './spriteSheet'
import Player from './entities/player'
import samuraiWalkData from './gameImages/samurai/Boss_Samurai_Walk.json'
import BackgroundLayer from './layers/backgroundLayer'
import Camera from './camera'
import Renderer from './renderer'
import World from './world'

const canvas = document.getElementById('gameScreen')


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
    const width =  window.innerWidth - 20
    const height =  window.innerHeight - 20
    // Create World. LoadMap
    const level = loadLevel('level1')
    // Camera
    const camera = new Camera(-((width - 50) / 2), -((height - 150) / 2))
    // Create BackgroundLayer
    const backgroundLayer = new BackgroundLayer(tileSet, level, camera)
    // Create Renderer
    const renderer = new Renderer(camera)
    renderer.addLayer(backgroundLayer)
    // Samurai
    // Player using a spriteSheet for animations
    const samuraiSpriteSheet = new SpriteSheet(samuraiTileset, 256, 256)
    const samuraiPlayer = new Player({spriteSheet: samuraiSpriteSheet, data: samuraiWalkData}, 400, 300)
    samuraiPlayer.onmove = ({dir, pos}) => camera.follow(pos) /*camera.pan(dir)*/ 
    // TODO: Screen component
    const world = new World({ canvas, renderer, level, camera, width, height })
    world.addEntity('player', samuraiPlayer)
    world.start()
  })
}
