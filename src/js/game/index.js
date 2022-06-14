import { loadLevel, loadGameAssets } from './loaders'
import SpriteSheet from './spriteSheet'
import Player from './entities/player'
import Consumable from './entities/consumable'
import Item from './entities/item'
import BackgroundLayer from './layers/backgroundLayer'
import UiLayer from './layers/uiLayer'
import SpriteLayer from './layers/spriteLayer'
import Inventory from './inventory'

import { createPlant } from './entities/entityFactory'

import Camera from './camera'
import Renderer from './renderer'
import World from './world'
import Enemy from './entities/enemy'

import Client, { createSocket } from './client/client'

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
  // const client = new Client()
  // console.log(canvas)
  loadGameAssets()
    .then((assets) => {
      const width = window.innerWidth - 20 // Canvas width
      const height = window.innerHeight - 20 // canvas height
      const level = loadLevel('level1') // Create World. LoadMap

      const camera = new Camera(-((width - 50) / 2), -((height - 150) / 2)) // Camera
      const renderer = new Renderer(camera)                                 // Renderer

      // Create Layers
      const backgroundLayer = new BackgroundLayer(assets.tilesets.background, level)  // BackgroundLayer
      const uiLayer = new UiLayer(width, height)                                      // UiLayer
      renderer.addLayer(backgroundLayer)
      renderer.addLayer(uiLayer)

      // World
      const world = new World({ canvas, renderer, level, camera, width, height })

      // Player
      // console.log('assets.tilesets.player.data :>> ', assets.tilesets.player.spriteSheet)
      // {spriteSheet: samuraiSpriteSheet, data: assets.tilesets.player.data}
      const player = new Player(assets.tilesets.player, 400, 300)
      const enemy = new Enemy(assets.tilesets.player, 200, 100)
      player.onmove = ({ dir, pos }) => {
        camera.zoom(-1)
        camera.follow(pos) /*camera.pan(dir)*/
      }
      player.onDeath = (p) => {
        // TODO: This is a crash
        // world.removeEntity('player')
      }
      player.bindUiCallback((player) => { uiLayer.playerUpdated(player) })

      // const spriteLayer = new SpriteLayer(playerTileset, level)
      world.addEntity('player', player)
      world.addEntity('enemy', enemy)

      const sword = new Item({ sprite: assets.images.sword }, 200, 200, 100, 100)
      world.addConsumable(sword)
      new Array(20).fill(0).map((e, i) => { // Dumb way to loop 20 times
        const sword2 = new Consumable(assets.images.sword, {
          x: 140 * i,
          y: 50 * i,
          width: 100,
          height: 100,
          destroyOnPickup: true,
          onPickup: (entity) => {
            // console.log("SWORD PICKED UP!!!")
            entity.health -= 20
            entity.pickUpItem(sword2)
            entity.inventory.printItems()
            // console.log('Funkade potions? entity :>> ', entity)
          }
        })
        world.addConsumable(sword2)
      })
      
      const playerUpdate = {
        id: 1,
        x: player.x,
        y: player.y,
        dir: player.dir
      }
      // const socket = createSocket(playerUpdate)
      // Create client
      const client = new Client()
      // onCreate hook / onConnect
      // onDisconnect
      // onUpdate
      // onPlayerJoined
      // onPlayerLeft

      // setInterval(() => {
      //   const playerUpdate = {
      //     id: 1,
      //     x: player.x,
      //     y: player.y,
      //     dir: player.dir
      //   }
      //   socket.send(JSON.stringify({ status: 2, player: playerUpdate }))
      // }, 1000)
      // const plant = new Item({sprite: assets.tilesets.wizard.sprite}, 300, 250, 100, 100)
      // world.addEntity('plant', plant)
      const plant = createPlant(assets, 200, 400)
      world.addEntity('plant', plant)

      // const plant = new Item(assets)

      // renderer.addLayer(spriteLayer)
      // TODO: Screen component    
      world.start()
    })
}
