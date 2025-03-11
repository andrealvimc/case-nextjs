"use client"

import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import CreateOrderForm from "@/components/create-order-form"

// Mock do useRouter
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    }
  },
}))

describe("CreateOrderForm Component", () => {
  it("renderiza o formulário corretamente", () => {
    render(<CreateOrderForm />)

    // Verifica se os campos principais estão presentes
    expect(screen.getByLabelText(/Nome do Cliente/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Endereço/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Data Estimada de Entrega/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Nome do Produto/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Quantidade/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Preço Unitário/i)).toBeInTheDocument()

    // Verifica se o botão de envio está presente
    expect(screen.getByRole("button", { name: /Criar Pedido/i })).toBeInTheDocument()
  })

  it("exibe mensagens de erro para campos inválidos", async () => {
    render(<CreateOrderForm />)

    // Tenta enviar o formulário sem preencher os campos obrigatórios
    fireEvent.click(screen.getByRole("button", { name: /Criar Pedido/i }))

    // Verifica se as mensagens de erro aparecem
    await waitFor(() => {
      expect(screen.getByText(/O nome do cliente deve ter pelo menos 3 caracteres/i)).toBeInTheDocument()
      expect(screen.getByText(/O endereço deve ter pelo menos 5 caracteres/i)).toBeInTheDocument()
      expect(screen.getByText(/O nome do item deve ter pelo menos 2 caracteres/i)).toBeInTheDocument()
    })
  })

  it("aceita entradas válidas no formulário", async () => {
    render(<CreateOrderForm />)

    // Preenche os campos com valores válidos
    fireEvent.change(screen.getByLabelText(/Nome do Cliente/i), {
      target: { value: "João da Silva" },
    })

    fireEvent.change(screen.getByLabelText(/Endereço/i), {
      target: { value: "Rua das Flores, 123" },
    })

    // Define uma data futura
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const formattedDate = tomorrow.toISOString().split("T")[0]

    fireEvent.change(screen.getByLabelText(/Data Estimada de Entrega/i), {
      target: { value: formattedDate },
    })

    fireEvent.change(screen.getByLabelText(/Nome do Produto/i), {
      target: { value: "Smartphone XYZ" },
    })

    fireEvent.change(screen.getByLabelText(/Quantidade/i), {
      target: { value: "2" },
    })

    fireEvent.change(screen.getByLabelText(/Preço Unitário/i), {
      target: { value: "1299.99" },
    })

    // Envia o formulário
    fireEvent.click(screen.getByRole("button", { name: /Criar Pedido/i }))

    // Verifica se o botão muda para "Enviando..."
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Enviando/i })).toBeInTheDocument()
    })
  })
})

