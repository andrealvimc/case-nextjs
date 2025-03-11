import { orders } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Package, Truck } from "lucide-react"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = orders.find((order) => order.id === params.id)

  if (!order) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para lista de pedidos
      </Link>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold">Pedido #{order.id}</h1>
                <p className="text-muted-foreground">
                  {new Date(order.delivery_estimated).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: order.status === "Pendente" ? "#FEF3C7" : "#D1FAE5",
                  color: order.status === "Pendente" ? "#92400E" : "#065F46",
                }}
              >
                {order.status}
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">Itens do Pedido</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="h-16 w-16 relative rounded overflow-hidden flex-shrink-0">
                      <Image src={item.imagem || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                    </div>
                    <div className="font-medium">{formatCurrency(item.price)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Informações de Entrega</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Método de Envio</span>
                <span>{order.shipping_method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Endereço de Entrega</span>
                <span>{order.customer.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Estimada</span>
                <span>{new Date(order.delivery_estimated).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Resumo do Pedido</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(order.total - order.delivery_cost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span>{formatCurrency(order.delivery_cost)}</span>
              </div>
              <div className="border-t my-2 pt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Informações do Cliente</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nome</span>
                <span>{order.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Endereço</span>
                <span>{order.customer.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

