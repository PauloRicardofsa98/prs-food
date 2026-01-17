<h1 align="center">
  PRS Food
</h1>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a> •
  <a href="#-english-version">English</a>
</p>

<!-- Adicione screenshots aqui quando disponíveis -->
<!-- <p align="center">
  <img alt="PRS Food Demo" src=".github/demo.gif" width="100%">
</p> -->

---

## Sobre o Projeto

**PRS Food** é uma aplicação full-stack de delivery de comida inspirada no iFood. O projeto foi desenvolvido para demonstrar habilidades em desenvolvimento web moderno, utilizando as melhores práticas e tecnologias do mercado.

A aplicação permite que usuários naveguem por restaurantes, explorem cardápios, adicionem produtos ao carrinho, realizem pedidos e acompanhem seu histórico de compras.

---

## Funcionalidades

- **Autenticação com Google** - Login seguro via OAuth 2.0 com NextAuth.js
- **Catálogo de Restaurantes** - Navegue por diversos restaurantes com informações de entrega
- **Sistema de Favoritos** - Salve seus restaurantes favoritos
- **Busca Inteligente** - Encontre produtos e restaurantes facilmente
- **Carrinho de Compras** - Adicione, remova e ajuste quantidades de produtos
- **Cálculo Automático** - Subtotal, descontos e taxa de entrega calculados em tempo real
- **Gestão de Pedidos** - Realize pedidos e acompanhe o histórico completo
- **Categorias de Produtos** - Hambúrgueres, Pizzas, Japonesa, Brasileira, Sobremesas e Sucos
- **Descontos e Promoções** - Produtos com desconto exibidos com badge especial
- **Design Responsivo** - Interface adaptada para diferentes dispositivos

---

## Tecnologias

### Frontend
- **[Next.js 14](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização utilitária
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis (Dialog, Sheet, Avatar, Toast)
- **[Lucide React](https://lucide.dev/)** - Ícones modernos

### Backend
- **[Prisma](https://www.prisma.io/)** - ORM para Node.js/TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[NextAuth.js](https://next-auth.js.org/)** - Autenticação com Google OAuth
- **[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)** - Mutações server-side

### DevOps & Ferramentas
- **[Docker](https://www.docker.com/)** - Containerização do banco de dados
- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** - Formatação de código
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

---

## Estrutura do Projeto

```
prs-food/
├── app/
│   ├── _actions/          # Server Actions (orders, favorites)
│   ├── _components/       # Componentes reutilizáveis
│   │   └── ui/           # Componentes Radix UI
│   ├── _contexts/        # React Context (Cart)
│   ├── _helpers/         # Funções auxiliares (preço, formatação)
│   ├── _hooks/           # Custom hooks
│   ├── _lib/             # Configurações (Prisma, Auth)
│   ├── _providers/       # Providers (Auth)
│   ├── api/auth/         # Rotas NextAuth
│   ├── categories/       # Página de categorias
│   ├── my-favorite-restaurants/  # Favoritos do usuário
│   ├── my-orders/        # Histórico de pedidos
│   ├── products/         # Páginas de produtos
│   ├── restaurants/      # Páginas de restaurantes
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Home page
├── prisma/
│   ├── schema.prisma     # Schema do banco de dados
│   └── seed.ts           # Script de seed
├── public/               # Assets estáticos
├── docker-compose.yml    # Configuração Docker
└── package.json
```

---

## English Version

### About

**PRS Food** is a full-stack food delivery application inspired by iFood. This project showcases modern web development skills using industry best practices and cutting-edge technologies.

### Features

- Google OAuth authentication
- Restaurant catalog with delivery info
- Favorites system
- Smart search
- Shopping cart with real-time calculations
- Order management and history
- Product categories and discounts
- Responsive design

### Tech Stack

**Frontend:** Next.js 14, TypeScript, Tailwind CSS, Radix UI, Lucide Icons

**Backend:** Prisma ORM, PostgreSQL, NextAuth.js, Server Actions

**DevOps:** Docker, ESLint, Prettier, Husky
