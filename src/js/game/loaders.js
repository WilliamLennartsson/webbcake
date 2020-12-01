import character from './gameImages/Char.png'
import backgroundTileset from './gameImages/overworldTileset/PNG/overworld.png'




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