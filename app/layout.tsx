import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { OrderProvider } from '@/contexts/OrderContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gerenciamento de Pedidos',
  description: 'Sistema de gerenciamento de pedidos de entrega',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <OrderProvider>{children}</OrderProvider>
      </body>
    </html>
  )
}

import './globals.css'
