
export default class Renderer {
  constructor(camera) {
    this.layers = []
    this.camera = camera
  }
  draw = (context) => {
    this.layers.forEach(layer => {
      layer.draw(context, this.camera)
    })
  }
  addLayer = (layer) => {
    this.layers.push(layer)
  }
}