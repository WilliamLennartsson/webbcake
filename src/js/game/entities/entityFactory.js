import Item from './item'
import {plant1AnimationFrames, plant7AnimationFrames} from '../gameImages/plantAnimations'

export const plantFactory = (assets, type) => {
  
  return (x, y) => {
    //const frames = plant1AnimationFrames()
    const frames = plant7AnimationFrames()
    const plantW = 70
    const plantH = 70
    const plantConfig = {
      sprite: assets.images.plantImage,
      animated: true,
      frames: frames,
      animGroupName: 'Plant1',
      animName: 'idle',
      animSpeed: 4
    }
    const plant = new Item(plantConfig, x, y, plantW, plantH)
    return plant
  }
}

export const createPlant = (assets, x, y) => {
  //const frames = plant1AnimationFrames()
  const frames = plant7AnimationFrames()
  const plantW = 70
  const plantH = 70
  const plantConfig = {
    sprite: assets.images.plantImage,
    animated: true,
    frames: frames,
    animGroupName: 'Plant1',
    animName: 'idle',
    animSpeed: 4
  }
  const plant = new Item(plantConfig, x, y, plantW, plantH)
  return plant
}

export const createSword = (assets, x, y) => {
  
}