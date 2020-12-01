import character from './gameImages/Char.png'
import backgroundTileset from './gameImages/overworldTileset/PNG/overworld.png'
import samuraiWalkSpriteset from './gameImages/samurai/Boss_Samurai_Walk.png'
import level1 from './levels/level1.json'

export const loadLevel = (level) => {
  return level1
}

export const loadCharacter = () => {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    
    image.src = character
  })
}

export const loadTileset = () => {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.src = backgroundTileset
  })
}


export const loadSamuraiSpriteset = () => {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.src = samuraiWalkSpriteset
  })
}