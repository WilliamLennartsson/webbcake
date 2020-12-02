import { loadLevel, loadGameAssets } from './loaders'
import SpriteSheet from './spriteSheet'
import Player from './entities/player'
import Consumable from './entities/consumable'
import Item from './entities/item'

import BackgroundLayer from './layers/backgroundLayer'
import SpriteLayer from './layers/spriteLayer'

import Camera from './camera'
import Renderer from './renderer'
import World from './world'

const canvas = document.getElementById('gameScreen')

/** TODO:
     * Hitbox
     * engine
     * Collisions
     * Fix layers!
     * Safe array
     * Better component system
     * 
     */
window.onload = () => {
  console.log(canvas)
  loadGameAssets()
  .then((assets) => {
    const width =  window.innerWidth - 20
    const height =  window.innerHeight - 20
    // Create World. LoadMap
    const level = loadLevel('level1')
    // Camera
    const camera = new Camera(-((width - 50) / 2), -((height - 150) / 2))

    // Create BackgroundLayer
    const backgroundLayer = new BackgroundLayer(assets.tilesets.background, level)

    const renderer = new Renderer(camera)
    renderer.addLayer(backgroundLayer)

    const samuraiSpriteSheet = new SpriteSheet(assets.tilesets.player.image, 256, 256)
    console.log('assets.tilesets.player.data :>> ', assets.tilesets.player.spriteSheet);
    const player = new Player({spriteSheet: samuraiSpriteSheet, data: assets.tilesets.player.data}, 400, 300)
      
    player.onmove = ({dir, pos}) => camera.follow(pos) /*camera.pan(dir)*/
    // const spriteLayer = new SpriteLayer(playerTileset, level)
    const sword = new Item(assets.images.sword, 200, 200, 100, 100)
    const sword2 = new Consumable(assets.images.sword, 650, 300, 100, 100, (entity) => {
      console.log("SWORD PICKED UP!!!")
      entity.health = 1000000
      console.log('Funkade potions? entity :>> ', entity);
    })
    
    // renderer.addLayer(spriteLayer)
    // TODO: Screen component
    const world = new World({ canvas, renderer, level, camera, width, height })
    world.addEntity('player', player)
    world.addConsumable(sword)
    world.addConsumable(sword2)
    world.start() 

  })
}
