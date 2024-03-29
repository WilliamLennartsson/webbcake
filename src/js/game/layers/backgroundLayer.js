import BaseLayer from './baseLayer'
import SpriteSheet from '../spriteSheet'

export default class BackgroundLayer extends BaseLayer{
  constructor(tileSet, level) {
    // const gridCount = 10
    super()
    this.level = level
    this.tileCountH = 8
    this.tileCountW = 16

    const tileWidth = tileSet.width / this.tileCountW
    const tileHeight = tileSet.height / this.tileCountH

    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.bgTileScaleFactor = 3
    const backgroundSprites = new SpriteSheet(tileSet, tileWidth, tileHeight, this.bgTileScaleFactor)
    defineBackgroundSprites(backgroundSprites, level.world.tileMap)

    this.backgroundSprites = backgroundSprites
    // console.log('BackgroundSprites 2 :>> ', backgroundSprites)
    // console.log('level.world.tileMap :>> ', level.world.tileMap)
  }
  draw = (context, camera) => {
    const { level, backgroundSprites, tileWidth, tileHeight } = this
    const { tiles, tileMap } = level.world
    this.offset += 0.1
    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[0].length; x++) {
          const tileIndex = tiles[y][x]
          const tile = getTileById(tileIndex, tileMap)
          const posX = ((x * tileWidth) * this.bgTileScaleFactor) - camera.position.x
          const posY = ((y * tileHeight) * this.bgTileScaleFactor) - camera.position.y
          backgroundSprites.draw(tile.name, context, posX, posY)
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
