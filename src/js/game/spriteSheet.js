export default class SpriteSheet {
  constructor(image, width, height) {
    this.image = image
    this.width = width
    this.height = height
    this.tiles = new Map()

  }
  define = (name, x, y, scale) => {
    const buffer = document.createElement('canvas')
    buffer.width = this.width
    buffer.height = this.height
    buffer.getContext('2d')
      .drawImage(
        this.image,
        2 * this.width, // sx
        0 * this.height, // sy
        this.width, // sWidth
        this.height, // sHeight
        0, // dx
        0, // dy
        this.width, // dWidth
        this.height) // dHeight
    this.tiles.set(name, buffer)
  }
  draw = (name, context, x, y) => {
    const buffer = this.tiles.get(name)
    context.drawImage(buffer, x, y)
  }
}