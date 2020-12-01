import BaseLayer from './baseLayer'
import SpriteSheet from '../spriteSheet'

export default class BackgroundLayer extends BaseLayer{
  constructor(tileSet, level, camera) {
    // const gridCount = 10
    super()
    this.level = level
    this.camera = camera
    this.tileCountH = 8
    this.tileCountW = 8
    const tileWidth = tileSet.width / this.tileCountW
    const tileHeight = tileSet.height / this.tileCountH
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    const backgroundSprites = new SpriteSheet(tileSet, tileWidth, tileHeight)
    defineBackgroundSprites(backgroundSprites, level.world.tileMap)
    this.backgroundSprites = backgroundSprites
    console.log('BackgroundSprites 2 :>> ', backgroundSprites)
  }
  draw = (context) => {
    const { level, backgroundSprites, tileWidth, tileHeight } = this
    const { tiles, tileMap } = level.world
    this.offset += 0.1
    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[0].length; x++) {
          const tileIndex = tiles[y][x]
          const tile = getTileById(tileIndex, tileMap)
          const offset = this.camera.getOffset()
          backgroundSprites.draw(tile.name, context, offset.x + (context, x * tileWidth), offset.y + (y * tileHeight))
        } 
      }
  }
}

const getTileById = (searchTerm, tiles) => Object.values(tiles).find(tile => tile.index === searchTerm)

const defineBackgroundSprites = (spriteSheet, tileData) => {
  const tileNames = Object.keys(tileData)
  tileNames.map(tileName => {
    const tile = tileData[tileName]
    spriteSheet.define(tile.name, tile.x, tile.y)
  })
}
