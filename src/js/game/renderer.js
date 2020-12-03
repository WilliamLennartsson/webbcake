
export default class Renderer {
  constructor(camera) {
    this.layers = []
    this.camera = camera
  }
  clear = (context, WIDTH, HEIGHT) => {
    context.clearRect(0, 0, WIDTH, HEIGHT)
  }
  draw = (context) => {
    this.layers.forEach(layer => {
      if (layer.draw) layer.draw(context, this.camera)
    })
  }
  addLayer = (layer) => {
    this.layers.push(layer)
  }
}