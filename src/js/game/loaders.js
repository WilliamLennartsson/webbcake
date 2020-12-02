import character from './gameImages/Char.png'
import backgroundTileset from './gameImages/overworldTileset/PNG/overworld.png'
import samuraiWalkSpriteset from './gameImages/samurai/Boss_Samurai_Walk.png'
import level1 from './levels/level1.json'
import sword from './gameImages/sword.png'

import samuraiWalkData from './gameImages/samurai/Boss_Samurai_Walk.json'

export const loadLevel = (level) => {
  return level1
}

export const loadGameAssets = () => {
  return new Promise(resolve => {
    Promise.all([
      loadCharacter(), // soon deprecated
      loadTileset(),
      loadSamuraiSpriteset(),
      loadImage(sword)
    ]).then(([
      wizard,
      backgroundTileset,
      samuraiSpriteset,
      sword
    ]) => {
      resolve({
        tilesets: {
          background: backgroundTileset, // fix so it looks like the others
          player: {image: samuraiSpriteset, data: samuraiWalkData},
          wizard: {sprite: wizard},
        },
        images: {
            sword
          }
      })
    })
  })  
}

const loadImage = (url) => new Promise(resolve => {
  const image = new Image()
  image.addEventListener('load', () => resolve(image))
  image.src = url
})

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