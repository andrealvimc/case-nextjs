"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Order } from "@/lib/types"
import { orders as initialOrders } from "@/lib/data"

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Order) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  const addOrder = (newOrder: Order) => {
    setOrders((prevOrders) => [...prevOrders, newOrder])
  }

  return <OrderContext.Provider value={{ orders, addOrder }}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}

