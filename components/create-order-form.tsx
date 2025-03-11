'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOrders } from '@/contexts/OrderContext'

const orderFormSchema = z.object({
  customerName: z.string().min(3, {
    message: 'O nome do cliente deve ter pelo menos 3 caracteres.',
  }),
  customerAddress: z.string().min(5, {
    message: 'O endereço deve ter pelo menos 5 caracteres.',
  }),
  shippingMethod: z.enum(['Entrega Expressa', 'Entrega Normal'], {
    required_error: 'Por favor selecione um método de entrega.',
  }),
  itemName: z.string().min(2, {
    message: 'O nome do item deve ter pelo menos 2 caracteres.',
  }),
  itemQuantity: z.coerce.number().int().positive({
    message: 'A quantidade deve ser um número positivo.',
  }),
  itemPrice: z.coerce.number().positive({
    message: 'O preço deve ser um valor positivo.',
  }),
  deliveryDate: z.string().refine(
    date => {
      const selectedDate = new Date(date)
      const today = new Date()
      return selectedDate > today
    },
    {
      message: 'A data de entrega deve ser no futuro.',
    }
  ),
})

type OrderFormValues = z.infer<typeof orderFormSchema>

export default function CreateOrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { addOrder } = useOrders()

  const defaultValues: OrderFormValues = {
    customerName: '',
    customerAddress: '',
    shippingMethod: 'Entrega Normal',
    itemName: '',
    itemQuantity: 1,
    itemPrice: 0,
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow's date
  }

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues,
  })

  function onSubmit(data: OrderFormValues) {
    setIsSubmitting(true)

    const newOrder = {
      uuid: crypto.randomUUID(),
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      status: 'Pendente',
      total: data.itemPrice * data.itemQuantity,
      delivery_cost: data.shippingMethod === 'Entrega Expressa' ? 15 : 10,
      shipping_method: data.shippingMethod,
      delivery_estimated: data.deliveryDate,
      customer: {
        name: data.customerName,
        address: data.customerAddress,
      },
      items: [
        {
          imagem: '/placeholder.svg',
          name: data.itemName,
          quantity: data.itemQuantity,
          price: data.itemPrice,
        },
      ],
    }

    addOrder(newOrder)

    setTimeout(() => {
      setIsSubmitting(false)
      router.push('/')
    }, 1500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Informações do Cliente</h2>

            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Endereço completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Estimada de Entrega</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Entrega</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o método de entrega" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Entrega Normal">Entrega Normal</SelectItem>
                      <SelectItem value="Entrega Expressa">Entrega Expressa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Entrega Expressa tem um custo adicional de frete.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Detalhes do Item</h2>

            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="itemQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="itemPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço Unitário (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Criar Pedido'}
        </Button>
      </form>
    </Form>
  )
}
