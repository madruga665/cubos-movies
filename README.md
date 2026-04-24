# Cubos Movies

Uma aplicação moderna para gerenciamento e visualização de filmes, construída com Next.js 16 e React 19.

## 🚀 Tecnologias

O projeto foi desenvolvido utilizando as seguintes ferramentas e tecnologias:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Biblioteca de UI:** [React 19](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Banco de Dados & ORM:** [Prisma](https://www.prisma.io/) com [PostgreSQL](https://www.postgresql.org/)
- **Autenticação:** [Better Auth](https://www.better-auth.com/)
- **Validação:** [Zod](https://zod.dev/)
- **Formulários:** [React Hook Form](https://react-hook-form.com/)
- **Testes:** [Jest](https://jestjs.io/) e [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Notificações:** [Sonner](https://sonner.emilkowal.ski/)
- **Temas:** [Next Themes](https://github.com/pacocoursey/next-themes)

## 🏗️ Estrutura do Projeto

O projeto utiliza uma **Feature-Based Architecture**, organizando o código por domínio de negócio para maior escalabilidade e manutenibilidade.

```text
src/
├── adapter/          # Adaptadores globais (ex: fetch-adapter)
├── app/              # Next.js App Router (Rotas, Layouts e Páginas)
├── components/       # Componentes globais
│   ├── layout/       # Componentes estruturais (Topbar, Footer)
│   └── ui/           # Componentes atômicos e genéricos (Button, Input, Spinner)
├── features/         # Módulos baseados em funcionalidades (Core do Negócio)
│   ├── auth/         # Domínio de Autenticação (Login, Cadastro, Actions, Schemas)
│   └── movies/       # Domínio de Filmes (Dashboard, Detalhes, Repositórios, Serviços)
├── generated/        # Arquivos gerados automaticamente (Prisma Client)
├── lib/              # Bibliotecas e configurações (Auth, Prisma, Utils)
└── providers/        # Context Providers (Theme)
```

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Um banco de dados [PostgreSQL](https://www.postgresql.org/)

## 🔧 Configuração Local

Siga os passos abaixo para configurar o projeto localmente:

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/cubos-movies.git
   cd cubos-movies
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Configurar as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Preencha as variáveis no arquivo `.env` com suas configurações locais:
   - `CUBOS_MOVIES_API_BASE_URL`: URL base da API de filmes.
   - `DATABASE_URL`: URL de conexão com o seu banco de dados PostgreSQL.
   - `BETTER_AUTH_SECRET`: Uma chave secreta para a autenticação.
   - `BETTER_AUTH_URL`: URL da aplicação (ex: http://localhost:3000).

4. **Configurar o Prisma:**
   Gere o cliente do Prisma para que as tipagens do banco de dados fiquem disponíveis:
   ```bash
   npx prisma generate
   ```

5. **Executar a aplicação:**
   Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:3000`.

## 🧪 Testes

Para executar os testes unitários e de integração:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch
```

## 🛠️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Cria a build de produção da aplicação.
- `npm run start`: Inicia o servidor de produção.
- `npm run lint`: Executa a verificação do linter (ESLint).
- `npm test`: Executa os testes do projeto.
