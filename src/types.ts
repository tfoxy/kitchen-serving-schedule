export interface Plate {
  name: string
  time: number
}

export interface Order {
  name: string
  plates: Plate[]
}
