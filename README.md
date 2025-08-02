# 🏋️ API Sólida - Estilo Gympass

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Fastify](https://img.shields.io/badge/Fastify-5-black.svg)
![Prisma](https://img.shields.io/badge/Prisma-6-darkblue.svg)
![Vitest](https://img.shields.io/badge/Vitest-3-purple.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)
![Docker](https://img.shields.io/badge/Docker-gray.svg?logo=docker)

## 📝 Sobre

[cite_start]Esta é uma API para um aplicativo no estilo **Gympass**, construída em Node.js com TypeScript. O grande foco do projeto é a aplicação dos princípios **SOLID** e de padrões de arquitetura limpa, como o **Repository Pattern**, para criar um software robusto, escalável e de fácil manutenção.

A aplicação gerencia o cadastro e autenticação de usuários, o registro de academias e o sistema de check-ins.

<br>

## ⚙️ Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript.
- [cite_start]**[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
- [cite_start]**[Fastify](https://www.fastify.io/)**: Framework web focado em performance e baixo overhead.
- [cite_start]**[Prisma](https://www.prisma.io/)**: ORM para Node.js e TypeScript.
- [cite_start]**[Zod](https://zod.dev/)**: Biblioteca para validação de esquemas e tipos.
- [cite_start]**[Vitest](https://vitest.dev/)**: Framework de testes moderno e completo.
- **[Docker](https://www.docker.com/)**: Plataforma para criação e gerenciamento de contêineres.
- **[PostgreSQL](https://www.postgresql.org/)**: Banco de dados relacional.
- [cite_start]**[TSup](https://tsup.egoist.dev/)**: Ferramenta para build de projetos TypeScript.

<br>

## 🚀 Começando

Para executar este projeto localmente, siga os passos abaixo.

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
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
    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`[cite: 5].
    ```bash
    cp .env.example .env
    ```
    > O arquivo `.env` já vem com a `DATABASE_URL` pré-configurada para o contêiner Docker[cite: 5]. Você pode alterar o `JWT_SECRET` se desejar[cite: 5].

5.  **Execute as Migrations do Prisma:**
    Este comando irá criar as tabelas no seu banco de dados com base no esquema do Prisma.
    ```bash
    npx prisma migrate dev
    ```

<br>

## ▶️ Executando a Aplicação

- **Modo de Desenvolvimento** (com hot-reload):
  ```bash
  npm run start:dev
