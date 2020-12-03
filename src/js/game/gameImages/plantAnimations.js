
export const plant1AnimationFrames = () => {
  return [
    require('./PlantAnimations/Plant1/Plant1_00000.png'),
    require('./PlantAnimations/Plant1/Plant1_00001.png'),
    require('./PlantAnimations/Plant1/Plant1_00002.png'),
    require('./PlantAnimations/Plant1/Plant1_00003.png'),
    require('./PlantAnimations/Plant1/Plant1_00004.png'),
    require('./PlantAnimations/Plant1/Plant1_00005.png'),
    require('./PlantAnimations/Plant1/Plant1_00006.png'),
    require('./PlantAnimations/Plant1/Plant1_00007.png'),
    require('./PlantAnimations/Plant1/Plant1_00008.png'),
    require('./PlantAnimations/Plant1/Plant1_00009.png'),
    
  ]
  return createRequireArr()
}

  
const fullPath = (base, name, img) => {
  return `./${base}/${name}/${img}.png`
}

const createPlantNames = () => {
  const plantNumber = 1
  const base = 'PlantAnimations'
  const animationName = `Plant${plantNumber}`
  const numOfPlants = 80
  const plantPaths = []
  for (let i = 0; i < numOfPlants; i++) {
    const plantName = `Plant${plantNumber}_000${i > 9 ? i : '0' + i}`
    console.log('plantName :>> ', fullPath(base, animationName, plantName))
    plantPaths.push(fullPath(base, animationName, plantName))
  }
  return plantPaths
}

const createRequireArr = (anim) => {
  const reqs = []
  const plantPaths = createPlantNames()
  plantPaths.forEach(plantName => {
    reqs.push(require(plantName))
  })
  return reqs
}
