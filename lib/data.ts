import type { Order } from './types'

export const orders: Order[] = [
  {
    uuid: '6f0945f1-6a83-4dfd-93bb-3242314196',
    id: '158924',
    status: 'Pendente',
    total: 120.5,
    delivery_cost: 12.0,
    shipping_method: 'Entrega Expressa',
    delivery_estimated: '2025-02-17',
    customer: {
      name: 'João da Silva',
      address: 'Rua das Palmeiras, 123',
    },
    items: [
      {
        imagem: 'https://placehold.co/150x150/EEE/31343C',
        name: 'Celular XYZ',
        quantity: 1,
        price: 120.5,
      },
    ],
  },
  {
    uuid: '6f0945f1-6a83-4dfd-93bb-3242314196',
    id: '158925',
    status: 'Entregue',
    total: 72.3,
    delivery_cost: 12.0,
    shipping_method: 'Entrega Normal',
    delivery_estimated: '2025-02-17',
    customer: {
      name: 'Maria Oliveira',
      address: 'Av. Paulista, 987',
    },
    items: [
      {
        imagem: 'https://placehold.co/150x150/EEE/31343C',
        name: 'Fone de Ouvido ABC',
        quantity: 1,
        price: 72.3,
      },
    ],
  },
]
