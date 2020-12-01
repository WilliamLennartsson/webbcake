import Player from '../entities/player'
import BaseLayer from './baseLayer'
import SpriteSheet from '../spriteSheet'
import samuraiWalkData from '../gameImages/samurai/Boss_Samurai_Walk.json'

export default class SpriteLayer extends BaseLayer {
  constructor(playerTileset, level) {
    super()
    // Samurai
    // Player using a spriteSheet for animations
    this.entities = []
  }

  draw = (context, camera) => {
    this.entities.forEach(entity => entity.draw(context, camera))
  }
}