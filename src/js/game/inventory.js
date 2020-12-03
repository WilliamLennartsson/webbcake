
const BAG_CAPACITY = 10

export default class Inventory {
  constructor() {
    this.items = []
  }
  
  addItem = (item) => {
    if (this.items.length >= BAG_CAPACITY) return false
    this.items.push(item)
    return true
  }
  tossItem = (index) => {
    if (index >= 0 && index < this.items.length){
      this.items.slice(index, 1)
      return true
    }
    return false
  }
  printItems = () => {this.items.map(item => console.log(item))}
}