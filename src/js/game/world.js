
export default class World {
  constructor(level){
    this.entities = {}
    this.level = level
  }
  addEntity = (name, entity) => {
    this.entities[name] = entity
    console.log("Entitie?", this.entities);
  }
  loadLevel = (level) => {
    
  }
  update = (deltaTime) => {
    Object.keys(this.entities).forEach(name => {
      const entity = this.entities[name]
      if (entity.update) entity.update(deltaTime)
    })
  }
}