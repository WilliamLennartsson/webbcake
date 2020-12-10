import character from './gameImages/Char.png'
import backgroundTileset from './gameImages/overworldTileset/PNG/tileset.png'
import samuraiWalkSpriteset from './gameImages/samurai/Boss_Samurai_Walk.png'
import samuraiWalkData from './gameImages/samurai/Boss_Samurai_Walk.json'
import samuraiDeathSpriteset from './gameImages/samurai/Boss_Samurai_Death.png'
import samuraiDeathData from './gameImages/samurai/Boss_Samurai_Death.json'
import samuraiMeleeSpriteset from './gameImages/samurai/Boss_Samurai_MeleeAttack.png'
import samuraiMeleeData from './gameImages/samurai/Boss_Samurai_MeleeAttack.json'
import samuraiRangedSpriteset from './gameImages/samurai/Boss_Samurai_RangedAttack.png'
import samuraiRangedData from './gameImages/samurai/Boss_Samurai_RangedAttack.json'
import shadowFiendMeleeSpriteset from './gameImages/ShadowFiend/ShadowFiendMelee.png'
import shadowFiendMeleeData from './gameImages/ShadowFiend/ShadowFiendMelee.json'
import level1 from './levels/level1.json'
import sword from './gameImages/sword.png'

import plantImage1 from './gameImages/PlantAnimations/Plant1/Plant1_00000.png'


export const loadLevel = (level) => {
  return level1
}

export const loadGameAssets = () => {
  return new Promise(resolve => {
    Promise.all([
      loadCharacter(), // soon deprecated
      loadTileset(),
      loadSamuraiSpriteset(),
      loadImage(sword),
      loadImage(samuraiDeathSpriteset),
      loadImage(plantImage1),
      loadImage(samuraiMeleeSpriteset),
      loadImage(samuraiRangedSpriteset),
      loadImage(shadowFiendMeleeSpriteset)
    ]).then(([
      wizard,
      backgroundTileset,
      samuraiWalkSpriteset,
      sword,
      samuraiDeathSpriteset,
      plantImage,
      samuraiMeleeSpriteset,
      samuraiRangedSpriteset,
      shadowFiendMeleeSpriteset
    ]) => {
      resolve({
        tilesets: {
          background: backgroundTileset, // fix so it looks like the others
          player: {
            walk: {spriteSheet: samuraiWalkSpriteset, data: samuraiWalkData},
            death: {spriteSheet: samuraiDeathSpriteset, data: samuraiDeathData },
            melee: {spriteSheet: samuraiMeleeSpriteset, data: samuraiMeleeData},
            ranged: {spriteSheet: samuraiRangedSpriteset, data: samuraiRangedData}
          },
          enemy: {
            all: {spriteSheet: shadowFiendMeleeSpriteset, data: shadowFiendMeleeData}
          },
          wizard: {sprite: wizard},
        },
        images: {
            sword,
            plantImage
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