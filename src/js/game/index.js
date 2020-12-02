import { loadLevel, loadGameAssets } from './loaders'
import SpriteSheet from './spriteSheet'
import Player from './entities/player'
import Consumable from './entities/consumable'
import Item from './entities/item'

import BackgroundLayer from './layers/backgroundLayer'
import UiLayer from './layers/uiLayer'
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
     */
window.onload = () => {
  // console.log(canvas)
  loadGameAssets()
  .then((assets) => {
    const width =  window.innerWidth - 20 // Canvas width
    const height =  window.innerHeight - 20 // canvas height
    const level = loadLevel('level1') // Create World. LoadMap
    
    const camera = new Camera(-((width - 50) / 2), -((height - 150) / 2)) // Camera
    const renderer = new Renderer(camera)                                 // Renderer
    
    // Create Layers
    const backgroundLayer = new BackgroundLayer(assets.tilesets.background, level)  // BackgroundLayer
    const uiLayer = new UiLayer()                                                   // UiLayer
    renderer.addLayer(backgroundLayer)
    renderer.addLayer(uiLayer)

    // Player
    const samuraiSpriteSheet = new SpriteSheet(assets.tilesets.player.image, 256, 256)
    // console.log('assets.tilesets.player.data :>> ', assets.tilesets.player.spriteSheet);
    const player = new Player({spriteSheet: samuraiSpriteSheet, data: assets.tilesets.player.data}, 400, 300)
    player.onmove = ({dir, pos}) => camera.follow(pos) /*camera.pan(dir)*/

    player.bindUiCallback((player) => {
      uiLayer.playerUpdated(player)
    })
    // const spriteLayer = new SpriteLayer(playerTileset, level)
    const world = new World({ canvas, renderer, level, camera, width, height })
    world.addEntity('player', player)

    const sword = new Item(assets.images.sword, 200, 200, 100, 100)
    world.addConsumable(sword)
      
    new Array(20).fill(0).map((e, i) => { // Dumb way to loop 20 times
      const sword2 = new Consumable(assets.images.sword, {
        x: 140 * i, 
        y: 50 * i,
        width: 100,
        height: 100,
        destroyOnPickup: true,
        onPickup: (entity) => {
          console.log("SWORD PICKED UP!!!")
          entity.health -= 20
          // console.log('Funkade potions? entity :>> ', entity)
        }
      })
      world.addConsumable(sword2)
    })
    
    // renderer.addLayer(spriteLayer)
    // TODO: Screen component    
    world.start() 

  })
}
