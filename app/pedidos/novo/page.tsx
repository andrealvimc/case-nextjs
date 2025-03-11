import CreateOrderForm from "@/components/create-order-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewOrderPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para lista de pedidos
      </Link>

      <h1 className="text-3xl font-bold mb-6">Criar Novo Pedido</h1>

      <div className="bg-card rounded-lg shadow-sm p-6">
        <CreateOrderForm />
      </div>
    </main>
  )
}

