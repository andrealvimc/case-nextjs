"use client"

import type React from "react"

import { render, screen, fireEvent } from "@testing-library/react"
import OrderList from "@/components/order-list"
import { OrderProvider } from "@/contexts/OrderContext"

// Mock do useRouter
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    }
  },
}))

const renderWithContext = (component: React.ReactNode) => {
  return render(<OrderProvider>{component}</OrderProvider>)
}

describe("OrderList Component", () => {
  it("renderiza a lista de pedidos corretamente", () => {
    renderWithContext(<OrderList />)

    // Verifica se os IDs dos pedidos estão presentes
    expect(screen.getByText("#158924")).toBeInTheDocument()
    expect(screen.getByText("#158925")).toBeInTheDocument()

    // Verifica se os nomes dos clientes estão presentes
    expect(screen.getByText("João da Silva")).toBeInTheDocument()
    expect(screen.getByText("Maria Oliveira")).toBeInTheDocument()
  })

  it("filtra pedidos por nome do cliente", () => {
    renderWithContext(<OrderList />)

    // Encontra o campo de busca
    const searchInput = screen.getByTestId("search-input")

    // Filtra por "Maria"
    fireEvent.change(searchInput, { target: { value: "Maria" } })

    // Verifica se apenas o pedido da Maria está visível
    expect(screen.queryByText("#158924")).not.toBeInTheDocument()
    expect(screen.getByText("#158925")).toBeInTheDocument()

    // Filtra por um nome que não existe
    fireEvent.change(searchInput, { target: { value: "Carlos" } })

    // Verifica se a mensagem de "nenhum pedido encontrado" aparece
    expect(screen.getByText("Nenhum pedido encontrado com os filtros aplicados.")).toBeInTheDocument()
  })

  it("filtra pedidos por status", () => {
    renderWithContext(<OrderList />)

    // Encontra o filtro de status
    const statusFilter = screen.getByTestId("status-filter")

    // Abre o dropdown
    fireEvent.click(statusFilter)

    // Seleciona o status "Entregue"
    fireEvent.click(screen.getByText("Entregue"))

    // Verifica se apenas o pedido com status "Entregue" está visível
    expect(screen.queryByText("#158924")).not.toBeInTheDocument()
    expect(screen.getByText("#158925")).toBeInTheDocument()
  })
})

