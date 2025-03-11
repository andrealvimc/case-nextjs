export interface Customer {
  name: string
  address: string
}

export interface OrderItem {
  imagem: string
  name: string
  quantity: number
  price: number
}

export interface Order {
  uuid: string
  id: string
  status: string
  total: number
  delivery_cost: number
  shipping_method: string
  delivery_estimated: string
  customer: Customer
  items: OrderItem[]
}

