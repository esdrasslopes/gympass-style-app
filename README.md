# 🏋️ API Sólida - Estilo Gympass

![Node.js](https://img.shields.io/badge/Node.js-24+-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Fastify](https://img.shields.io/badge/Fastify-5-black.svg)
![Prisma](https://img.shields.io/badge/Prisma-6-darkblue.svg)
![Vitest](https://img.shields.io/badge/Vitest-3-purple.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)
![Docker](https://img.shields.io/badge/Docker-gray.svg?logo=docker)

## 📖 Sobre

API para um aplicativo no estilo **Gympass**, construída em Node.js com TypeScript. O grande foco deste projeto é a aplicação dos princípios **SOLID** e de padrões de arquitetura limpa, como o **Repository Pattern**, para criar um software robusto, escalável e de fácil manutenção.

A aplicação gerencia o cadastro e autenticação de usuários, o registro de academias e o sistema de check-ins.

<br>

## ✨ Funcionalidades

### Requisitos Funcionais (RFs)
- ✅ Deve ser possível se cadastrar.
- ✅ Deve ser possível se autenticar.
- ✅ Deve ser possível obter o perfil de um usuário logado.
- ✅ Deve ser possível obter o número de check-ins realizados pelo usuário logado.
- ✅ Deve ser possível o usuário obter seu histórico de check-ins.
- ✅ Deve ser possível o usuário buscar academias próximas (até 10km).
- ✅ Deve ser possível o usuário buscar academias pelo nome.
- ✅ Deve ser possível o usuário realizar check-in em uma academia.
- ✅ Deve ser possível validar o check-in de um usuário.
- ✅ Deve ser possível cadastrar uma academia.

### Regras de Negócio (RNs)
- ✅ O usuário não deve poder se cadastrar com um email duplicado.
- ✅ O usuário não pode fazer 2 check-ins no mesmo dia.
- ✅ O usuário não pode fazer check-in se não estiver perto (100m) da academia.
- ✅ O check-in só pode ser validado até 20 minutos após ser criado.
- 🚧 O check-in só pode ser validado por administradores.
- 🚧 A academia só pode ser cadastrada por administradores.

### Requisitos Não Funcionais (RNFs)
- ✅ A senha do usuário precisa estar criptografada.
- ✅ Os dados da aplicação precisam estar persistidos em um banco PostgreSQL.
- ✅ Todas as listas de dados precisam ser paginadas, com 20 itens por página.
- 🚧 O usuário deve ser identificado por um JWT (JSON Web Token).

<br>

## 🛠️ Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
- **[Fastify](https://www.fastify.io/)**: Framework web focado em performance e baixo overhead.
- **[Prisma](https://www.prisma.io/)**: ORM para Node.js e TypeScript.
- **[Zod](https://zod.dev/)**: Biblioteca para validação de esquemas e tipos.
- **[Vitest](https://vitest.dev/)**: Framework de testes moderno e completo.
- **[Docker](https://www.docker.com/)**: Plataforma para criação e gerenciamento de contêineres.
- **[PostgreSQL](https://www.postgresql.org/)**: Banco de dados relacional.
- **[TSup](https://tsup.egoist.dev/)**: Ferramenta para build de projetos TypeScript.

<br>

## 🚀 Começando

Para executar este projeto localmente, siga os passos abaixo.

### Pré-requisitos
- **Node.js** (versão 24 ou superior, conforme dependências)
- **Docker** e **Docker Compose**
- Um gerenciador de pacotes como **npm**.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
    cd SEU_REPOSITORIO
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados com Docker:**
    Suba o contêiner do PostgreSQL. O serviço se chamará `api-solid-pg`.
    ```bash
    docker-compose up -d
    ```

4.  **Variáveis de Ambiente:**
    [cite_start]Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`[cite: 4].
    ```bash
    cp .env.example .env
    ```
    > [cite_start]O arquivo `.env` já vem com a `DATABASE_URL` pré-configurada para o contêiner Docker[cite: 2, 3]. Você pode alterar o `JWT_SECRET` se desejar.

5.  **Execute as Migrations do Prisma:**
    Este comando irá criar as tabelas no seu banco de dados com base no esquema do Prisma.
    ```bash
    npx prisma migrate dev
    ```

### Executando a Aplicação

- **Modo de Desenvolvimento** (com hot-reload):
  ```bash
  npm run start:dev
