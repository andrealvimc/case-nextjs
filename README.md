# Sistema de Gerenciamento de Pedidos de Entrega

## 📋 Sobre o Projeto

Este é um sistema moderno de gerenciamento de pedidos de entrega desenvolvido com tecnologias atuais do ecossistema React. O sistema oferece uma interface intuitiva e responsiva para gerenciar pedidos de entrega, com foco em usabilidade e performance.

## ✨ Funcionalidades Principais

- 📱 Interface totalmente responsiva
- 🔍 Filtros avançados de busca por:
  - Nome do cliente
  - Status do pedido
  - Data de criação
- 📊 Visualização detalhada de pedidos
- ➕ Criação de novos pedidos com validação em tempo real
- 🔄 Atualização em tempo real do status dos pedidos
- 📦 Histórico de alterações

## 🛠️ Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/) - Framework React com App Router
- [React Hook Form](https://react-hook-form.com/) - Gerenciamento eficiente de formulários
- [Zod](https://github.com/colinhacks/zod) - Validação de esquemas TypeScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [shadcn/ui](https://ui.shadcn.com/) - Biblioteca de componentes UI modernos
- [Jest](https://jestjs.io/) - Framework de testes
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Biblioteca para testes de componentes React

## 📦 Pré-requisitos

- Node.js 18.x ou superior
- npm 9.x ou yarn 1.22.x
- Git

## 🚀 Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/case-hubii-nextjs.git
cd case-hubii-nextjs
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env.local
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

5. Acesse o projeto em `http://localhost:3000`

## 🧪 Testes

Para executar os testes:

```bash
npm run test
# ou
yarn test
```

Para executar os testes com cobertura:

```bash
npm run test:coverage
# ou
yarn test:coverage
```

## 📁 Estrutura do Projeto

```
/
├── app/              # Páginas e rotas do Next.js
├── components/       # Componentes reutilizáveis
├── contexts/        # Contextos do React
├── hooks/           # Custom hooks
├── lib/             # Utilitários e configurações
├── public/          # Arquivos estáticos
├── styles/          # Arquivos de estilo
├── __tests__/       # Testes unitários e de integração
├── .next/           # Build do Next.js
├── .eslintrc.json   # Configuração do ESLint
├── .prettierrc      # Configuração do Prettier
├── components.json  # Configuração dos componentes shadcn/ui
├── jest.config.js   # Configuração do Jest
├── jest.setup.js    # Setup dos testes
├── next.config.mjs  # Configuração do Next.js
├── postcss.config.mjs # Configuração do PostCSS
├── tailwind.config.ts # Configuração do Tailwind CSS
└── tsconfig.json    # Configuração do TypeScript
```

## 👥 Autores

- Seu Nome - [@andrealvimc](https://github.com/andrealvimc)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
