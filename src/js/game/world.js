import SpriteLayer from './layers/spriteLayer'
import BackgroundLayer from './layers/backgroundLayer'
const defaultConfig = {
  renderer: null,
  camera: null,
  level: null,
  entities: {},
  canvas: null,
  context: null,
  width: 400, 
  height: 200
}

export default class World {
  constructor(conf){
    const config = Object.assign(defaultConfig, conf)
    console.log('config :>> ', config);
    this.entities = config.entities
    this.level = config.level
    this.camera = config.camera
    this.renderer = config.renderer
    this.canvas = config.canvas
    if (this.canvas != null) {
      this.context = this.canvas.getContext('2d')
      this.canvas.height = config.width
      this.canvas.width = config.width
    }
    this.width = config.width
    this.height = config.height

    

    // Create Renderer
    // this.renderer.addLayer(backgroundLayer)
    // this.renderer.addLayer(spriteLayer)
  }
  addEntity = (name, entity) => {
    this.entities[name] = entity
    if (this.renderer) this.renderer.addLayer(entity)
    console.log("Entitie?", this.entities);
  }
  start = () => {
    requestAnimationFrame(this.gameLoop)
  }
  loadLevel = (level) => {

  }
  update = (deltaTime) => {
    Object.keys(this.entities).forEach(name => {
      const entity = this.entities[name]
      if (entity.update) entity.update(deltaTime)
    })
  }
  gameLoop = (time) => {
    if (this.renderer) {
      this.renderer.clear(this.context, this.width, this.width)
      this.renderer.draw(this.context)
    }
    this.update(time) // TODO: Convert to deltaTime before passing in
    // samuraiPlayer.update()
    // samuraiPlayer.draw(this.context, this.camera)
    requestAnimationFrame(this.gameLoop)
  }
}