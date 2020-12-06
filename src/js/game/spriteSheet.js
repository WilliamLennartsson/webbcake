export default class SpriteSheet {
  constructor(image, width, height, scale = 1) {
    this.image = image
    this.width = width
    this.height = height
    this.scale = scale
    this.tiles = new Map()

  }
  define = (name, x, y, scale = 0) => {
    // console.log('x, y, this.image :>> ', x, y, this.image);
    const buffer = document.createElement('canvas')
    buffer.width = this.width
    buffer.height = this.height
    buffer.getContext('2d')
      .drawImage(
        this.image,
        x * this.width, // sx
        y * this.height, // sy
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
    context.drawImage(buffer, x, y, this.width * this.scale, this.height * this.scale)
  }
  getSprite = (name) => {
    return this.tiles.get(name)
  }
}