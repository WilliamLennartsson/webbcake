import Item from './item'
import {plant1AnimationFrames} from '../gameImages/plantAnimations'

export const createPlant = (assets, x, y) => {
  const plantW = 70
  const plantH = 70
  const plantConfig = {
    sprite: assets.images.plantImage,
    animated: true,
    frames: plant1AnimationFrames(),
    animGroupName: 'Plant1',
    animName: 'idle'
  }
  const plant = new Item(plantConfig, x, y, plantW, plantH)
  return plant
}

export const createSword = (assets, x, y) => {
  
}